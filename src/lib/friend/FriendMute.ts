import type { UserInfo } from "./Core";

const SAVE_KEY = "GENSO-FRIEND-MUTE-LIST";

export const mute = (userInfo: UserInfo) => {
    const muteList = getMuteList();

    if (!muteList.includes(userInfo.id)) {
        localStorage.setItem(SAVE_KEY, JSON.stringify([...muteList, userInfo.id]));
    }
}

export const unmute = (userInfo: UserInfo) => {
    const muteList = getMuteList();


    localStorage.setItem(SAVE_KEY, JSON.stringify(muteList.filter(id => id !== userInfo.id)));
}

export const getMuteList = (): string[] => {
    const json = localStorage.getItem(SAVE_KEY);

    if (json) {
        return JSON.parse(json);
    } else {
        return []
    }
}