export type WantedPartyDetails = {
    purpose: string;
    map: string;
    targetMonster: string;
    bookNums: string;
    storyNums: string;
    time: Time;
    wantedNum: number;
    wantedJobs: (WantedJob)[];
    meetPlace: MeetPlace;
    condition: Condition;
}
export type Time = {
    from: string;
    to: number;
}
export type WantedJob = {
    job: string;
    num: number;
}
export type MeetPlace = {
    region: string;
    map: string;
    point: string;
    channel: number;
}
export type Condition = {
    level: Level;
    memo: string;
}
export type Level = {
    from: number;
    to: number;
}
