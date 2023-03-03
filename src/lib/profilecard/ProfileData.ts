export type StatusProfileData = {
    name: string
    id: string
    job: {
        name: string
        lv: number
    }
    playstyle: string
    status: {
        hp: number | undefined
        mp: number | undefined
        attack: number | undefined
        magicAttack: number | undefined
        strength: number | undefined
        brains: number | undefined
        skillful: number | undefined
        mind: number | undefined
        difence: number | undefined
        speed: number | undefined
    }
    freecomment: string
    playTime: {
        dayOfWeek: string[]
        time: {
            weekday: string
            holiday: string
        }
    }
    baseEquipment: {
        [pos in
        "右手" |
        "左手" |
        "胴" |
        "足" |
        "頭" |
        "背中" |
        "肩" |
        "指輪"
        ]: {
            name: string
            level: number
            rarity: string
        }
    }
    cosplayEquipment: {
        [pos in
        "右手" |
        "左手" |
        "胴" |
        "足" |
        "頭" |
        "背中" |
        "肩"
        ]: {
            name: string
            level: number
            rarity: string
        }
    }
    skillStructure: { name: string, level: number }[],
    image1: Cropper | undefined
}

export type FriendProfileData = {
    name: string
    id: string
    job: {
        name: string
        lv: number
    }
    playstyle: string
    freecomment: string
    togetherFriends: string[]
    wantFriends: string[]
    habitat: string[]
    favouriteMonsters: string[]
    dislikesMonsters: string[]
    playTime: {
        dayOfWeek: string[]
        time: {
            weekday: string
            holiday: string
        }
    }
    image1: Cropper | undefined
    image2: Cropper | undefined
}