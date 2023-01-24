import { writable } from "svelte/store";

const clone = <T>(source: T): T => {
    return JSON.parse(JSON.stringify(source)) as T
}

export const defaultInitialState = {
    baseEquipment: {
        右手: { isUnEquipped: false, condition: 100 },
        左手: { isUnEquipped: false, condition: 100 },
        胴: { isUnEquipped: false, condition: 100 },
        足: { isUnEquipped: false, condition: 100 },
        頭: { isUnEquipped: false, condition: 100 },
        背中: { isUnEquipped: false, condition: 100 },
        肩: { isUnEquipped: false, condition: 100 },
        指輪: { isUnEquipped: false, condition: 100 }
    },
    cosplayEquipment: {
        右手: { isUnEquipped: false, condition: 100 },
        左手: { isUnEquipped: false, condition: 100 },
        胴: { isUnEquipped: false, condition: 100 },
        足: { isUnEquipped: false, condition: 100 },
        頭: { isUnEquipped: false, condition: 100 },
        背中: { isUnEquipped: false, condition: 100 },
        肩: { isUnEquipped: false, condition: 100 }
    },
    portion: {
        hp: {
            1: 0,
            2: 0,
            3: 0,
            4: 0,
            5: 0,
            6: 0
        },
        mp: {
            1: 0,
            2: 0,
            3: 0,
            4: 0,
            5: 0,
            6: 0
        }
    },
    meal: new Array(5).fill(null).map(() => {
        return {
            itemName: 'なし',
            num: 0
        };
    }),
    mR: 0,
    funClubCard: 'なし',
    exp: 0,
    skillExp: 0
};

export const defaultCurrentState = {
    baseEquipment: {
        右手: { condition: 100 },
        左手: { condition: 100 },
        胴: { condition: 100 },
        足: { condition: 100 },
        頭: { condition: 100 },
        背中: { condition: 100 },
        肩: { condition: 100 },
        指輪: { condition: 100 }
    },
    cosplayEquipment: {
        右手: { condition: 100 },
        左手: { condition: 100 },
        胴: { condition: 100 },
        足: { condition: 100 },
        頭: { condition: 100 },
        背中: { condition: 100 },
        肩: { condition: 100 }
    },
    portion: {
        hp: {
            1: 0,
            2: 0,
            3: 0,
            4: 0,
            5: 0,
            6: 0
        },
        mp: {
            1: 0,
            2: 0,
            3: 0,
            4: 0,
            5: 0,
            6: 0
        }
    },
    meal: new Array(5).fill(null).map(() => {
        return {
            num: 0
        };
    }),
    spring: {
        cost: 0,
        num: 0
    },
    mR: 0,
    workPlace: '',
    workingMinute: 60,
    exp: 0,
    skillExp: 0
};

export const initialState = writable(clone(defaultInitialState));

export const currentState = writable(clone(defaultCurrentState));

export const otherInfo = writable(clone())

