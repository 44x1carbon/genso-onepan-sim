export type UserInfo = {
    id: string
    name: string
    jobs: Job[]
}

export type Job = {
    name: string
    level: number
}