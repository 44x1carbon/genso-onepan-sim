import type { UserInfo } from "genso-friend-core"

const SAVE_KEY = "GENSO-FRIEND-USERINFO"

export const getUserInfo = (): UserInfo | undefined => {
    const json = localStorage.getItem(SAVE_KEY);

    if (json) {
        return JSON.parse(json) as UserInfo
    } else {
        return undefined;
    }
}

export const saveUserInfo = (userInfo: UserInfo) => {
    localStorage.setItem(SAVE_KEY, JSON.stringify(userInfo));
}