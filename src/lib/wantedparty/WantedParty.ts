import type { UserInfo } from "./UserInfo"
import type { WantedPartyDetails } from "./WantedPartyDetails"

export type WantedParty = {
    id: string
    owner: UserInfo
    details: WantedPartyDetails
    members: ({ joinJob: string } & UserInfo)[]
}

export function getCanApplyJobs(
    wantedParty: WantedParty,
    userInfo: UserInfo | undefined,
    joinJob: string | undefined = undefined
) {
    return (
        userInfo?.jobs
            .filter(({ name }) => name !== '')
            .filter(({ name, level }) => {
                if (joinJob !== undefined && joinJob !== name) false;

                const isLevelMatch =
                    wantedParty.details.condition.level.from <= level &&
                    level <= wantedParty.details.condition.level.to;
                return wantedParty.details.wantedJobs.some(({ job, num }) => {
                    return (job === '' || job === name) && isLevelMatch;
                });
            }) ?? []
    );
}

export function getCanApply(
    wantedParty: WantedParty,
    userInfo: UserInfo | undefined,
    joinJob: string | undefined = undefined
) {
    const canApplyJobs = getCanApplyJobs(wantedParty, userInfo, joinJob);
    return (
        userInfo !== undefined &&
        userInfo.id !== wantedParty.owner.id &&
        !wantedParty.members.some(member => member.id === userInfo?.id) &&
        canApplyJobs.length !== 0
    );
}