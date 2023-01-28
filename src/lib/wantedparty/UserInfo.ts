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

export const getUserInfo = (): UserInfo => {
    const json = localStorage.getItem(USERINFO_SAVE_KEY);

    if (json) {
        return JSON.parse(json) as UserInfo
    } else {
        throw new Error();
    }
}