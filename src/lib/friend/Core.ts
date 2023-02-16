import type { FirebaseApp } from '@firebase/app';
import * as database from '@firebase/database';

export class Core {
    app: FirebaseApp
    database: database.Database;
    dbRef: database.DatabaseReference;

    constructor(app: FirebaseApp) {
        this.app = app;
        this.database = database.getDatabase(app)
        this.dbRef = database.ref(this.database)
    }

    async resetDB() {
        await database.remove(this.dbRef)
    }

    // ユーザー登録
    async registerUserInfo(userInfo: UserInfo): Promise<boolean> {
        if (await this.isExistUser(userInfo.id)) {
            return false;
        } else {
            await database.set(database.ref(this.database, `users/${userInfo.id}`), userInfo);
            return true;
        }
    };

    // ユーザー情報更新
    async updateUserInfo(userInfo: UserInfo): Promise<boolean> {
        await database.set(database.ref(this.database, `users/${userInfo.id}`), userInfo);
        return true;
    };

    // ユーザーが存在するか
    async isExistUser(id: string): Promise<boolean> {
        const snapshot = await database.get(database.child(this.dbRef, `users/${id}`));
        return snapshot.exists();
    };

    // ユーザー情報の一覧を取得する
    async getUserInfoList(): Promise<UserInfo[]> {
        const snapshot = await database.get(database.child(this.dbRef, 'users'));
        if (snapshot.exists()) {
            return Object.values(snapshot.val()).map((userInfo: any) => {
                return { ...userInfo, jobs: userInfo.jobs ?? [], status: userInfo.status ?? [] }
            }) as UserInfo[];
        } else {
            return [];
        }
    };

    // ユーザー情報の取得する
    async getUserInfo(id: string): Promise<UserInfo | undefined> {
        const snapshot = await database.get(database.child(this.dbRef, `users/${id}`));
        if (snapshot.exists()) {
            return snapshot.val() as UserInfo;
        } else {
            return undefined;
        }
    };

    // 友達申請を送る
    async sendFriendRequest(id: string, userInfo: UserInfo, message: string): Promise<boolean> {
        const friendRequestRef = database.ref(this.database, `friendRequest/${id}/${userInfo.id}`);
        const q = database.query(friendRequestRef, database.orderByChild('from'), database.equalTo(id));

        if ((await database.get(q)).exists()) {
            return false;
        } else {
            await database.set(friendRequestRef, {
                to: id,
                from: userInfo.id,
                message,
                isApproved: false,
                sendAt: new Date().getTime()
            });

            return true;
        }
    };

    // 友達申請を承諾する
    async approveFriendRequest(friendRequest: FriendRequest): Promise<boolean> {
        await database.update(this.dbRef, {
            [`friendRequest/${friendRequest.to.id}/${friendRequest.from.id}/isApproved`]: true,
            [`friendRequest/${friendRequest.from.id}/${friendRequest.to.id}`]: {
                to: friendRequest.from.id,
                from: friendRequest.to.id,
                message: "",
                isApproved: true,
                sendAt: new Date().getTime(),
            }
        })

        return true;
    }

    // 送信している友達申請一覧を取得する
    async getSendingFriendRequestList(id: string): Promise<FriendRequest[]> {
        const friendRequestRef = database.ref(this.database, 'friendRequest');

        const friendRequestSnapshot = await database.get(friendRequestRef);

        if (friendRequestSnapshot.exists()) {
            const userList = await this.getUserInfoList();
            const friendRequest = friendRequestSnapshot.val() as { [key: string]: FriendRequestRaw[] };
            return ([] as FriendRequest[]).concat(
                ...Object.values(friendRequest)
                    .map(friendRequestList => {
                        return Object.values(friendRequestList)
                            .filter(raw => {
                                return raw.from === id;
                            })
                            .map(raw => {
                                const fromUserInfo = userList.find(user => user.id === raw.from);
                                const toUserInfo = userList.find(user => user.id === raw.to);

                                if (fromUserInfo === undefined || toUserInfo === undefined) {
                                    return null;
                                }

                                return {
                                    from: fromUserInfo,
                                    to: toUserInfo,
                                    message: raw.message,
                                    isApproved: raw.isApproved,
                                };
                            })
                            .filter(friendRequest => friendRequest) as FriendRequest[];
                    }),
            );
        } else {
            return [];
        }
    };

    // 自分宛の友達申請一覧を取得する
    async getOneselfFriendRequestList(id: string): Promise<FriendRequest[]> {
        const friendRequestRef = database.ref(this.database, `friendRequest/${id}`);

        const friendRequestSnapshot = await database.get(friendRequestRef);

        if (friendRequestSnapshot.exists()) {
            const userList = await this.getUserInfoList();
            const friendRequestList = Object.values(friendRequestSnapshot.val()) as FriendRequestRaw[];

            return friendRequestList.map(raw => {
                const fromUserInfo = userList.find(user => user.id === raw.from);
                const toUserInfo = userList.find(user => user.id === raw.to);

                if (fromUserInfo === undefined || toUserInfo === undefined) {
                    return null;
                }

                return {
                    from: fromUserInfo,
                    to: toUserInfo,
                    message: raw.message,
                    isApproved: raw.isApproved,
                    sendAt: raw.sendAt
                };
            }).filter(friendRequest => friendRequest) as FriendRequest[];
        } else {
            return [];
        }
    };

    // フレンド一覧を取得する(ログイン状況を加味)
    async getFriendList(userInfo: UserInfo): Promise<UserInfo[]> {
        const sendingFriendRequestList = await this.getSendingFriendRequestList(userInfo.id);


        return sendingFriendRequestList
            .filter(sendingFriendRequest => {
                return sendingFriendRequest.isApproved === true;
            })
            .map(sendingFriendRequest => sendingFriendRequest.to);
    };

    // 友達申請を受け取った時
    addListenerReciveFriendRequest(
        userInfo: UserInfo,
        onReciveFriendRequest: (friendRequest: FriendRequest) => any,
    ): void {
        const friendRequestRef = database.ref(this.database, `friendRequest/${userInfo.id}`);

        let isInit = false;

        setTimeout(() => {
            isInit = true;
        }, 100)

        database.onChildAdded(friendRequestRef, async (snapshot) => {
            if (!isInit) return;
            const userList = await this.getUserInfoList();
            const raw = snapshot.val() as FriendRequestRaw;

            const fromUserInfo = userList.find(user => user.id === raw.from);
            const toUserInfo = userList.find(user => user.id === raw.to);

            if (fromUserInfo === undefined || toUserInfo === undefined) {
                return;
            }

            const friendRequest = {
                from: fromUserInfo,
                to: toUserInfo,
                message: raw.message,
                isApproved: raw.isApproved,
                sendAt: raw.sendAt,
            };

            onReciveFriendRequest(friendRequest);
        });
    };

    // 友達申請が通った時
    addListenerApprovedFriendRequest(
        userInfo: UserInfo,
        onApprovrdFriendRequest: (friendRequest: FriendRequest) => void,
    ) {
        const friendRequestRef = database.ref(this.database, 'friendRequest');

        let isInit = false;

        setTimeout(() => {
            isInit = true;
        }, 100)

        database.onChildChanged(friendRequestRef, async (snapshot, previousChildName) => {
            if (!isInit) return;
            if (previousChildName === null) {
                return;
            }

            const userList = await this.getUserInfoList();

            const raw = snapshot.child(previousChildName).val() as FriendRequestRaw;
            if (raw.from === userInfo.id && raw.isApproved) {

                const fromUserInfo = userList.find(user => user.id === raw.from);
                const toUserInfo = userList.find(user => user.id === raw.to);

                if (fromUserInfo === undefined || toUserInfo === undefined) {
                    return;
                }

                const friendRequest = {
                    from: fromUserInfo,
                    to: toUserInfo,
                    message: raw.message,
                    isApproved: raw.isApproved,
                    sendAt: raw.sendAt,
                };

                onApprovrdFriendRequest(friendRequest);
            }
        });
    };

    // フレンドのログイン状況の監視
    watchFriendStatus(id: string, onChangeState: (userInfo: UserInfo) => void) {
        const userRef = database.ref(this.database, `user/${id}`);

        let isInit = false;

        setTimeout(() => {
            isInit = true;
        }, 100)

        database.onChildChanged(userRef, (snapshot, previousChildName) => {
            if (!isInit) return;

            if (previousChildName === 'isLogin') {
                const userInfo = snapshot.val() as UserInfo;
                onChangeState(userInfo);
            }
        });
    };

    // チャットが来た時
    addListenerReciveChatMessage(
        userInfo: UserInfo,
        onReciveChatMessage: (chatMessage: ChatMessage) => void,
    ) {
        const chatRef = database.ref(this.database, `chat/${userInfo.id}`);
        let isInit = false;

        setTimeout(() => {
            isInit = true;
        }, 100)

        database.onChildAdded(chatRef, async (snapshot) => {
            if (!isInit) return;

            const userList = await this.getUserInfoList();
            const raw = snapshot.val() as ChatMessageRaw;

            const fromUserInfo = userList.find(user => user.id === raw.from);
            const toUserInfo = userList.find(user => user.id === raw.to);

            if (fromUserInfo === undefined || toUserInfo === undefined) {
                return;
            }

            const chatMessage = {
                id: snapshot.key,
                from: fromUserInfo,
                to: toUserInfo,
                message: raw.message,
                sendAt: raw.sendAt
            } as ChatMessage;

            onReciveChatMessage(chatMessage);
        });
    };

    // メッセージの送信
    async sendChatMessage(to: string, userInfo: UserInfo, message: string): Promise<ChatMessage> {
        const chatRef = database.ref(this.database, `chat/${to}`);

        const pushRef = database.push(chatRef);

        const raw = {
            from: userInfo.id,
            to: to,
            message,
            sendAt: new Date().getTime()
        } as ChatMessageRaw

        await database.set(pushRef, raw);

        const userList = await this.getUserInfoList();

        const fromUserInfo = userList.find(user => user.id === raw.from);
        const toUserInfo = userList.find(user => user.id === raw.to);

        if (fromUserInfo === undefined || toUserInfo === undefined) {
            throw new Error()
        }

        const chatMessage = {
            id: pushRef.key,
            from: fromUserInfo,
            to: toUserInfo,
            message: raw.message,
            sendAt: raw.sendAt
        } as ChatMessage;

        return chatMessage;
    };

    // チャットの内容を取得する
    async getChatMessageList(from: UserInfo, to: string): Promise<ChatMessage[]> {
        const chatRef = database.ref(this.database, `chat`);
        const snapshot = await database.get(chatRef);

        if (snapshot.exists()) {
            const userList = await this.getUserInfoList();
            const chatMessageMap = snapshot.val() as { [id: string]: ChatMessageRaw[] };

            return ([
                ...(chatMessageMap[from.id] ?
                    Object.entries(chatMessageMap[from.id]) : []
                ),
                ...(chatMessageMap[to] ? Object.entries(chatMessageMap[to]) : [])
            ]
                .filter(([_, chatMessageRaw]) => [from.id, to].includes(chatMessageRaw.from) || [from.id, to].includes(chatMessageRaw.to))
                .sort((a, b) => a[1].sendAt - b[1].sendAt)
                .map(([key, raw]) => {
                    const fromUserInfo = userList.find(user => user.id === raw.from);
                    const toUserInfo = userList.find(user => user.id === raw.to);

                    if (fromUserInfo === undefined || toUserInfo === undefined) {
                        return null;
                    }

                    const chatMessage = {
                        id: key,
                        from: fromUserInfo,
                        to: toUserInfo,
                        message: raw.message,
                        sendAt: raw.sendAt
                    } as ChatMessage;

                    return chatMessage;
                })
                .filter(chatMessage => chatMessage) as ChatMessage[])
                .reduce((p, c) => p.some(item => item.id === c.id) ? p : [...p, c], [] as ChatMessage[]);
        } else {
            return [];
        }
    };

    // ログインする
    async login(userInfo: UserInfo): Promise<void> {
        await this.updateUserInfo({
            ...userInfo,
            isLogin: true,
        })
    }

    // ログアウトする
    async logout(userInfo: UserInfo): Promise<void> {
        await this.updateUserInfo({
            ...userInfo,
            isLogin: false,
        })
    }

    // フレンド申請を受け取った際の通知を表示する
    showReciveFriendRequestNotification(friendRequest: FriendRequest) {
        N.showNotification(`${friendRequest.from.name}さんから友達申請が来ています！`, friendRequest.message);
    }

    // フレンド申請が通った際の通知を表示する
    showApprovedFriendRequestNotification(friendRequest: FriendRequest) {
        N.showNotification(`${friendRequest.to.name}さんが友達申請を許可しました！`, "");
    }

    // チェットメッセージを受け取った際の通知を表示する
    showReciveChatMessageNotification(chatMessage: ChatMessage) {
        N.showNotification(`${chatMessage.from.name}さんからメッセージが届きました`, `${chatMessage.message}`);
    }

    // 友人がログインした際の通知を表示する
    showLoginFriendNotification(userInfo: UserInfo) {
        N.showNotification(`${userInfo.name}さんがログインしました！`, ``);
    }
}

export class N {
    static isSupport() {
        return Notification !== undefined;
    }

    static isGranted() {
        return Notification.permission === "granted";
    }

    static showNotification(
        title: string,
        body: string,
        data: any = undefined,
        onClick: (data: any, n: Notification) => void = () => { return }
    ) {
        const ctrl = navigator.serviceWorker.controller;
        console.log(ctrl);
        ctrl?.postMessage({
            type: "notification",
            payload: {
                title,
                body
            }
        })
        // const n = new Notification(title, {
        //     icon: "/logo.png",
        //     body,
        // });

        // n.onclick = () => {
        //     onClick(data, n);
        // }
    }

    static async requestPermission() {
        return await Notification.requestPermission();
    }
}

export type UserInfo = {
    id: string;
    name: string;
    jobs: Job[];
    status: string[];
    isLogin: boolean;
    message: string;
};

export type Job = {
    name: string;
    level: number;
};

export type FriendRequestRaw = {
    from: string;
    to: string;
    message: string;
    isApproved: boolean;
    sendAt: number;
};

export type FriendRequest = {
    from: UserInfo;
    to: UserInfo;
    message: string;
    isApproved: boolean;
    sendAt: number;
};

export type ChatMessageRaw = {
    from: string;
    to: string;
    message: string;
    sendAt: number;
};

export type ChatMessage = {
    id: string;
    from: UserInfo;
    to: UserInfo;
    message: string;
    sendAt: number;
};