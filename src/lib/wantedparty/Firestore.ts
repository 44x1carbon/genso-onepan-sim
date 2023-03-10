import setupFirebaseApp from "$lib/Firebase";
import { addDoc, collection, getFirestore, query, getDocs, Timestamp, doc, getDoc, updateDoc, arrayUnion, orderBy, limit, where, QueryFieldFilterConstraint, deleteDoc } from "firebase/firestore";
import { USERINFO_SAVE_KEY } from "./SaveKeys";
import type { UserInfo } from "./UserInfo";
import { getCanApply, type WantedParty } from "./WantedParty";
import type { WantedPartyDetails } from "./WantedPartyDetails"

import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import 'dayjs/locale/ja';
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault('Asia/Tokyo');
dayjs.locale('ja');

export default () => {
    const db = getFirestore(setupFirebaseApp());
    const wantedPartyRef = collection(db, 'wantedparty');

    return {
        async joinWantedPrty(wantedParty: WantedParty, userInfo: UserInfo, joinJob: string): Promise<boolean> {
            const currentData = await this.getWantedParty(wantedParty.id);

            if (getCanApply(currentData, userInfo, joinJob)) {
                const docRef = doc(db, 'wantedparty', currentData.id);
                await updateDoc(docRef, {
                    memberIds: arrayUnion(userInfo.id),
                    members: arrayUnion({
                        joinJob,
                        ...userInfo
                    })
                })

                return true;
            } else {
                return false;
            }
        },
        async registerWantedData(wantedData: WantedPartyDetails): Promise<string> {
            const json = localStorage.getItem(USERINFO_SAVE_KEY);
            if (json) {
                const userInfo = JSON.parse(json);
                const result = await addDoc(wantedPartyRef, {
                    details: {
                        ...wantedData,
                        time: {
                            from: Timestamp.fromDate(new Date(wantedData.time.from)),
                            to: wantedData.time.to,
                        },
                        bookNums: wantedData.bookNums.split(",")
                    },
                    owner: userInfo,
                    members: [],
                    memberIds: [],
                    createAt: Timestamp.fromDate(dayjs().toDate())
                });

                return result.id
            } else {
                return ""
            }
        },
        async searchWantedDataList(condition: {
            purpose?: string,
            map?: string,
            bookNums?: string,
            storyNums?: string,
            timeFrom?: string
        }): Promise<WantedParty[]> {
            const whereConditions = ([] as QueryFieldFilterConstraint[]).concat(
                condition && condition.purpose ? [where("details.purpose", "==", condition.purpose)] : [],
                condition && condition.map ? [where("details.map", "==", condition.map)] : [],
                condition && condition.bookNums ? where("details.bookNums", "in", condition.bookNums.split(",")) : [],
                condition && condition.storyNums ? where("details.storyNums", "in", condition.storyNums.split(",")) : [],
                condition && condition.timeFrom ? [where("details.time.from", ">=", new Date(condition.timeFrom))] : [where("details.time.from", ">=", dayjs().toDate())]
            );
            const q = query(wantedPartyRef, ...whereConditions, orderBy("details.time.from", "asc"), limit(100));

            const querySnapshot = await getDocs(q);

            const wantedDataList: WantedParty[] = [];
            querySnapshot.forEach((doc) => {
                wantedDataList.push({
                    id: doc.id,
                    ...doc.data(),
                } as WantedParty)
            });

            return wantedDataList;

        },

        async ownWantedDataList(userInfo: UserInfo): Promise<WantedParty[]> {

            const q = query(wantedPartyRef,
                where("owner.id", "==", userInfo.id),
                where("details.time.from", ">=", dayjs().subtract(30, "m").toDate()),
                orderBy("details.time.from", "asc"), limit(100)
            );

            const querySnapshot = await getDocs(q);

            const wantedDataList: WantedParty[] = [];
            querySnapshot.forEach((doc) => {
                wantedDataList.push({
                    id: doc.id,
                    ...doc.data(),
                } as WantedParty)
            });

            return wantedDataList;

        },

        async joinWantedDataList(userInfo: UserInfo): Promise<WantedParty[]> {
            const q = query(wantedPartyRef,
                where("memberIds", "array-contains-any", [userInfo.id]),
                where("details.time.from", ">=", dayjs().subtract(30, "m").toDate()),
                orderBy("details.time.from", "asc"), limit(100)
            );

            const querySnapshot = await getDocs(q);

            const wantedDataList: WantedParty[] = [];
            querySnapshot.forEach((doc) => {
                wantedDataList.push({
                    id: doc.id,
                    ...doc.data(),
                } as WantedParty)
            });

            return wantedDataList;

        },

        async deleteWantedParty(wantedParty: WantedParty): Promise<boolean> {
            const docRef = doc(db, 'wantedparty', wantedParty.id);

            await deleteDoc(docRef);
            return true;
        },

        async getWantedParty(id: string): Promise<WantedParty> {
            const docRef = doc(db, 'wantedparty', id);

            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                return {
                    id: docSnap.id,
                    ...docSnap.data(),
                } as WantedParty
            } else {
                throw new Error();
            }

        }
    }
}