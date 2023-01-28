import { USERINFO_SAVE_KEY } from "./SaveKeys"

export type UserInfo = {
    id: string
    name: string
    jobs: Job[]
}

export type Job = {
    name: string
    level: number
}

export const getUserInfo = (): UserInfo | undefined => {
    const json = localStorage.getItem(USERINFO_SAVE_KEY);

    if (json) {
        return JSON.parse(json) as UserInfo
    } else {
        return undefined;
    }
}