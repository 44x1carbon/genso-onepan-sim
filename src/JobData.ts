export default [
    {
        name: 'ファイター',
        shortName: 'ファイ',
        initialBaseState: {
            armStrength: 90,
            stamina: 90,
            brains: 40,
            mind: 40,
            speed: 50,
            skillful: 70
        },
        elevatedValue: {
            armStrength: {
                attack: (num: number) => 10,
                criticalResistance: (num: number) => 1 / 3,
            },
            stamina: {
                maxHp: (num: number) => 12,
                defense: (num: number) => num % 2 === 0 ? 0 : 10,
            },
            brains: {
                maxMp: (num: number) => num % 2 === 0 ? 3 : 2,
                magicAttack: (num: number) => 10,
            },
            mind: {
                maxMp: (num: number) => num % 2 === 0 ? 3 : 2,
                healMagicPower: (num: number) => num % 2 === 0 ? 0 : 1,
                abnormalityResistance: (num: number) => num % 5 === 0 ? 1 : 0,
            },
            speed: {
                defense: (num: number) => num % 2 === 0 ? 20 : 10,
                avoidanceRate: (num: number) => 1,
            },
            skillful: {
                accuracyRate: (num: number) => 1,
                physicalCriticalRate: (num: number) => num % 2 === 0 ? 1 : 0,
                magicCriticalRate: (num: number) => num % 2 === 0 ? 1 : 0,
            },
        },
        initialState: {
            "attack": 240,
            "criticalResistance": 3,
            "maxHp": 120,
            "defense": 300,
            "maxMp": 23,
            "magicAttack": 40,
            "healMagicPower": 2,
            "abnormalityResistance": 0,
            "avoidanceRate": 5,
            "accuracyRate": 6,
            "physicalCriticalRate": 12,
            "magicCriticalRate": 12
        }
    },
    {
        name: 'シーフ',
        shortName: 'シーフ',
        initialBaseState: {
            armStrength: 60,
            stamina: 60,
            brains: 50,
            mind: 50,
            speed: 90,
            skillful: 80
        },
        elevatedValue: {
            armStrength: {
                attack: (num: number) => 10,
                criticalResistance: (num: number) => 1 / 3,
            },
            stamina: {
                maxHp: (num: number) => 12,
                defense: (num: number) => num % 2 === 0 ? 0 : 10,
            },
            brains: {
                maxMp: (num: number) => num % 2 === 0 ? 3 : 2,
                magicAttack: (num: number) => 10,
            },
            mind: {
                maxMp: (num: number) => num % 2 === 0 ? 3 : 2,
                healMagicPower: (num: number) => num % 2 === 0 ? 0 : 1,
                abnormalityResistance: (num: number) => num % 5 === 0 ? 1 : 0,
            },
            speed: {
                defense: (num: number) => num % 2 === 0 ? 20 : 10,
                avoidanceRate: (num: number) => 1,
            },
            skillful: {
                accuracyRate: (num: number) => 1,
                physicalCriticalRate: (num: number) => num % 2 === 0 ? 1 : 0,
                magicCriticalRate: (num: number) => num % 2 === 0 ? 1 : 0,
            },
        },
        initialState: {
            "attack": 0,
            "criticalResistance": 0,
            "maxHp": 0,
            "defense": 0,
            "maxMp": 0,
            "magicAttack": 0,
            "healMagicPower": 0,
            "abnormalityResistance": 0,
            "avoidanceRate": 0,
            "accuracyRate": 0,
            "physicalCriticalRate": 0,
            "magicCriticalRate": 0
        }
    },
    {
        name: 'クレリック',
        shortName: 'クレ',
        initialBaseState: {
            armStrength: 70,
            stamina: 70,
            brains: 90,
            mind: 100,
            speed: 70,
            skillful: 70
        },
        elevatedValue: {
            armStrength: {
                attack: (num: number) => 10,
                criticalResistance: (num: number) => 1 / 3,
            },
            stamina: {
                maxHp: (num: number) => 12,
                defense: (num: number) => num % 2 === 0 ? 0 : 10,
            },
            brains: {
                maxMp: (num: number) => num % 2 === 0 ? 3 : 2,
                magicAttack: (num: number) => 10,
            },
            mind: {
                maxMp: (num: number) => num % 2 === 0 ? 3 : 2,
                healMagicPower: (num: number) => num % 2 === 0 ? 0 : 1,
                abnormalityResistance: (num: number) => num % 5 === 0 ? 1 : 0,
            },
            speed: {
                defense: (num: number) => num % 2 === 0 ? 20 : 10,
                avoidanceRate: (num: number) => 1,
            },
            skillful: {
                accuracyRate: (num: number) => 1,
                physicalCriticalRate: (num: number) => num % 2 === 0 ? 1 : 0,
                magicCriticalRate: (num: number) => num % 2 === 0 ? 1 : 0,
            },
        },
        initialState: {
            "attack": 0,
            "criticalResistance": 0,
            "maxHp": 0,
            "defense": 0,
            "maxMp": 0,
            "magicAttack": 0,
            "healMagicPower": 0,
            "abnormalityResistance": 0,
            "avoidanceRate": 0,
            "accuracyRate": 0,
            "physicalCriticalRate": 0,
            "magicCriticalRate": 0
        }
    },
    {
        name: 'ウィザード',
        shortName: 'ウィザ',
        initialBaseState: {
            armStrength: 50,
            stamina: 50,
            brains: 100,
            mind: 80,
            speed: 70,
            skillful: 80
        },
        elevatedValue: {
            armStrength: {
                attack: (num: number) => 10,
                criticalResistance: (num: number) => 1 / 3,
            },
            stamina: {
                maxHp: (num: number) => 12,
                defense: (num: number) => num % 2 === 0 ? 0 : 10,
            },
            brains: {
                maxMp: (num: number) => num % 2 === 0 ? 3 : 2,
                magicAttack: (num: number) => 10,
            },
            mind: {
                maxMp: (num: number) => num % 2 === 0 ? 3 : 2,
                healMagicPower: (num: number) => num % 2 === 0 ? 0 : 1,
                abnormalityResistance: (num: number) => num % 5 === 0 ? 1 : 0,
            },
            speed: {
                defense: (num: number) => num % 2 === 0 ? 20 : 10,
                avoidanceRate: (num: number) => 1,
            },
            skillful: {
                accuracyRate: (num: number) => 1,
                physicalCriticalRate: (num: number) => num % 2 === 0 ? 1 : 0,
                magicCriticalRate: (num: number) => num % 2 === 0 ? 1 : 0,
            },
        },
        initialState: {
            "attack": 0,
            "criticalResistance": 0,
            "maxHp": 0,
            "defense": 0,
            "maxMp": 0,
            "magicAttack": 0,
            "healMagicPower": 0,
            "abnormalityResistance": 0,
            "avoidanceRate": 0,
            "accuracyRate": 0,
            "physicalCriticalRate": 0,
            "magicCriticalRate": 0
        }
    },
    {
        name: 'ガーディアン',
        shortName: 'ガデ',
        initialBaseState: {
            armStrength: 0,
            stamina: 0,
            brains: 0,
            mind: 0,
            speed: 0,
            skillful: 0
        },
        elevatedValue: {
            armStrength: {
                attack: (num: number) => 10,
                criticalResistance: (num: number) => 1 / 3,
            },
            stamina: {
                maxHp: (num: number) => 12,
                defense: (num: number) => num % 2 === 0 ? 0 : 10,
            },
            brains: {
                maxMp: (num: number) => num % 2 === 0 ? 3 : 2,
                magicAttack: (num: number) => 10,
            },
            mind: {
                maxMp: (num: number) => num % 2 === 0 ? 3 : 2,
                healMagicPower: (num: number) => num % 2 === 0 ? 0 : 1,
                abnormalityResistance: (num: number) => num % 5 === 0 ? 1 : 0,
            },
            speed: {
                defense: (num: number) => num % 2 === 0 ? 20 : 10,
                avoidanceRate: (num: number) => 1,
            },
            skillful: {
                accuracyRate: (num: number) => 1,
                physicalCriticalRate: (num: number) => num % 2 === 0 ? 1 : 0,
                magicCriticalRate: (num: number) => num % 2 === 0 ? 1 : 0,
            },
        },
        initialState: {
            "attack": 0,
            "criticalResistance": 0,
            "maxHp": 0,
            "defense": 0,
            "maxMp": 0,
            "magicAttack": 0,
            "healMagicPower": 0,
            "abnormalityResistance": 0,
            "avoidanceRate": 0,
            "accuracyRate": 0,
            "physicalCriticalRate": 0,
            "magicCriticalRate": 0
        }
    },
    {
        name: 'マジックナイト',
        shortName: 'マジナイ',
        initialBaseState: {
            armStrength: 0,
            stamina: 0,
            brains: 0,
            mind: 0,
            speed: 0,
            skillful: 0
        },
        elevatedValue: {
            armStrength: {
                attack: (num: number) => 10,
                criticalResistance: (num: number) => 1 / 3,
            },
            stamina: {
                maxHp: (num: number) => 12,
                defense: (num: number) => num % 2 === 0 ? 0 : 10,
            },
            brains: {
                maxMp: (num: number) => num % 2 === 0 ? 3 : 2,
                magicAttack: (num: number) => 10,
            },
            mind: {
                maxMp: (num: number) => num % 2 === 0 ? 3 : 2,
                healMagicPower: (num: number) => num % 2 === 0 ? 0 : 1,
                abnormalityResistance: (num: number) => num % 5 === 0 ? 1 : 0,
            },
            speed: {
                defense: (num: number) => num % 2 === 0 ? 20 : 10,
                avoidanceRate: (num: number) => 1,
            },
            skillful: {
                accuracyRate: (num: number) => 1,
                physicalCriticalRate: (num: number) => num % 2 === 0 ? 1 : 0,
                magicCriticalRate: (num: number) => num % 2 === 0 ? 1 : 0,
            },
        }
    },
    {
        name: 'ビショップ',
        shortName: 'ビショ',
        initialBaseState: {
            armStrength: 0,
            stamina: 0,
            brains: 0,
            mind: 0,
            speed: 0,
            skillful: 0
        },
        elevatedValue: {
            armStrength: {
                attack: (num: number) => 10,
                criticalResistance: (num: number) => 1 / 3,
            },
            stamina: {
                maxHp: (num: number) => 12,
                defense: (num: number) => num % 2 === 0 ? 0 : 10,
            },
            brains: {
                maxMp: (num: number) => num % 2 === 0 ? 3 : 2,
                magicAttack: (num: number) => 10,
            },
            mind: {
                maxMp: (num: number) => num % 2 === 0 ? 3 : 2,
                healMagicPower: (num: number) => num % 2 === 0 ? 0 : 1,
                abnormalityResistance: (num: number) => num % 5 === 0 ? 1 : 0,
            },
            speed: {
                defense: (num: number) => num % 2 === 0 ? 20 : 10,
                avoidanceRate: (num: number) => 1,
            },
            skillful: {
                accuracyRate: (num: number) => 1,
                physicalCriticalRate: (num: number) => num % 2 === 0 ? 1 : 0,
                magicCriticalRate: (num: number) => num % 2 === 0 ? 1 : 0,
            },
        },
        initialState: {
            "attack": 0,
            "criticalResistance": 0,
            "maxHp": 0,
            "defense": 0,
            "maxMp": 0,
            "magicAttack": 0,
            "healMagicPower": 0,
            "abnormalityResistance": 0,
            "avoidanceRate": 0,
            "accuracyRate": 0,
            "physicalCriticalRate": 0,
            "magicCriticalRate": 0
        }
    },
    {
        name: 'モンク',
        shortName: 'モンク',
        initialBaseState: {
            armStrength: 0,
            stamina: 0,
            brains: 0,
            mind: 0,
            speed: 0,
            skillful: 0
        },
        elevatedValue: {
            armStrength: {
                attack: (num: number) => 10,
                criticalResistance: (num: number) => 1 / 3,
            },
            stamina: {
                maxHp: (num: number) => 12,
                defense: (num: number) => num % 2 === 0 ? 0 : 10,
            },
            brains: {
                maxMp: (num: number) => num % 2 === 0 ? 3 : 2,
                magicAttack: (num: number) => 10,
            },
            mind: {
                maxMp: (num: number) => num % 2 === 0 ? 3 : 2,
                healMagicPower: (num: number) => num % 2 === 0 ? 0 : 1,
                abnormalityResistance: (num: number) => num % 5 === 0 ? 1 : 0,
            },
            speed: {
                defense: (num: number) => num % 2 === 0 ? 20 : 10,
                avoidanceRate: (num: number) => 1,
            },
            skillful: {
                accuracyRate: (num: number) => 1,
                physicalCriticalRate: (num: number) => num % 2 === 0 ? 1 : 0,
                magicCriticalRate: (num: number) => num % 2 === 0 ? 1 : 0,
            },
        },
        initialState: {
            "attack": 0,
            "criticalResistance": 0,
            "maxHp": 0,
            "defense": 0,
            "maxMp": 0,
            "magicAttack": 0,
            "healMagicPower": 0,
            "abnormalityResistance": 0,
            "avoidanceRate": 0,
            "accuracyRate": 0,
            "physicalCriticalRate": 0,
            "magicCriticalRate": 0
        }
    },
    {
        name: 'アサシン',
        shortName: 'アサ',
        initialBaseState: {
            armStrength: 0,
            stamina: 0,
            brains: 0,
            mind: 0,
            speed: 0,
            skillful: 0
        },
        elevatedValue: {
            armStrength: {
                attack: (num: number) => 10,
                criticalResistance: (num: number) => 1 / 3,
            },
            stamina: {
                maxHp: (num: number) => 12,
                defense: (num: number) => num % 2 === 0 ? 0 : 10,
            },
            brains: {
                maxMp: (num: number) => num % 2 === 0 ? 3 : 2,
                magicAttack: (num: number) => 10,
            },
            mind: {
                maxMp: (num: number) => num % 2 === 0 ? 3 : 2,
                healMagicPower: (num: number) => num % 2 === 0 ? 0 : 1,
                abnormalityResistance: (num: number) => num % 5 === 0 ? 1 : 0,
            },
            speed: {
                defense: (num: number) => num % 2 === 0 ? 20 : 10,
                avoidanceRate: (num: number) => 1,
            },
            skillful: {
                accuracyRate: (num: number) => 1,
                physicalCriticalRate: (num: number) => num % 2 === 0 ? 1 : 0,
                magicCriticalRate: (num: number) => num % 2 === 0 ? 1 : 0,
            },
        },
        initialState: {
            "attack": 0,
            "criticalResistance": 0,
            "maxHp": 0,
            "defense": 0,
            "maxMp": 0,
            "magicAttack": 0,
            "healMagicPower": 0,
            "abnormalityResistance": 0,
            "avoidanceRate": 0,
            "accuracyRate": 0,
            "physicalCriticalRate": 0,
            "magicCriticalRate": 0
        }
    },
    {
        name: 'ウォーロック',
        shortName: 'ウォロ',
        initialBaseState: {
            armStrength: 0,
            stamina: 0,
            brains: 0,
            mind: 0,
            speed: 0,
            skillful: 0
        },
        elevatedValue: {
            armStrength: {
                attack: (num: number) => 10,
                criticalResistance: (num: number) => 1 / 3,
            },
            stamina: {
                maxHp: (num: number) => 12,
                defense: (num: number) => num % 2 === 0 ? 0 : 10,
            },
            brains: {
                maxMp: (num: number) => num % 2 === 0 ? 3 : 2,
                magicAttack: (num: number) => 10,
            },
            mind: {
                maxMp: (num: number) => num % 2 === 0 ? 3 : 2,
                healMagicPower: (num: number) => num % 2 === 0 ? 0 : 1,
                abnormalityResistance: (num: number) => num % 5 === 0 ? 1 : 0,
            },
            speed: {
                defense: (num: number) => num % 2 === 0 ? 20 : 10,
                avoidanceRate: (num: number) => 1,
            },
            skillful: {
                accuracyRate: (num: number) => 1,
                physicalCriticalRate: (num: number) => num % 2 === 0 ? 1 : 0,
                magicCriticalRate: (num: number) => num % 2 === 0 ? 1 : 0,
            },
        },
        initialState: {
            "attack": 0,
            "criticalResistance": 0,
            "maxHp": 0,
            "defense": 0,
            "maxMp": 0,
            "magicAttack": 0,
            "healMagicPower": 0,
            "abnormalityResistance": 0,
            "avoidanceRate": 0,
            "accuracyRate": 0,
            "physicalCriticalRate": 0,
            "magicCriticalRate": 0
        }
    }
] as JobData[];


export type JobData = {
    name: string,
    shortName: string,
    initialBaseState: {
        armStrength: number,
        stamina: number,
        brains: number,
        mind: number,
        speed: number,
        skillful: number
    },
    elevatedValue: {
        armStrength: {
            [key: string]: (num: number) => number
        },
        stamina: {
            [key: string]: (num: number) => number
        },
        brains: {
            [key: string]: (num: number) => number
        },
        mind: {
            [key: string]: (num: number) => number
        },
        speed: {
            [key: string]: (num: number) => number
        },
        skillful: {
            [key: string]: (num: number) => number
        },
    },
    initialState: {
        "attack": number,
        "criticalResistance": number,
        "maxHp": number,
        "defense": number,
        "maxMp": number,
        "magicAttack": number,
        "healMagicPower": number,
        "abnormalityResistance": number,
        "avoidanceRate": number,
        "accuracyRate": number,
        "physicalCriticalRate": number,
        "magicCriticalRate": number
    },
}