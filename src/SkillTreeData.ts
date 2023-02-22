export type SkillTree = {
    otherJobs: string[],
    skills: { [id: string]: Skill }
}

export type Skill = {
    id?: string,
    name: string,
    prev: string | null,
    maxLevel: number,
    maxSkillName: string | null,
    position: "top" | "bottom" | "left" | "right" | "topright" | "topleft" | "bottomright" | "bottomleft",
    isPassive?: boolean,
    isMaxPassive?: boolean,
    hash: string
}

export default {
    "ファイター": {
        "otherJobs": [
            "ガーディアン",
            "マジックナイト"
        ],
        "skills": {
            "スラッシュ": {
                "name": "スラッシュ",
                "prev": null,
                "maxLevel": 5,
                "maxSkillName": "滅多斬り",
                "position": "topright",
                "hash": "1-1"
            },
            "破気撃": {
                "name": "破気撃",
                "prev": "攻撃力+40-1",
                "maxLevel": 5,
                "maxSkillName": "血獄撃",
                "position": "topright",
                "hash": "1-2"
            },
            "練気斬": {
                "name": "練気斬",
                "prev": "挑発",
                "maxLevel": 5,
                "maxSkillName": "魂震練気斬",
                "position": "topright",
                "hash": "1-3"
            },
            "挑発": {
                "name": "挑発",
                "prev": "スラッシュ",
                "maxLevel": 5,
                "maxSkillName": "不屈の挑発",
                "position": "topright",
                "hash": "1-4"
            },
            "決闘": {
                "name": "決闘",
                "prev": "攻撃力+40-3",
                "maxLevel": 5,
                "maxSkillName": "覇王断",
                "position": "topleft",
                "hash": "1-5"
            },
            "[継承]攻撃力+40-1": {
                "name": "[継承]攻撃力+40",
                "prev": "挑発",
                "maxLevel": 1,
                "maxSkillName": null,
                "isPassive": true,
                "position": "topleft",
                "hash": "1-6"
            },
            "[継承]攻撃力+40-2": {
                "name": "[継承]攻撃力+40",
                "prev": "[継承]攻撃力+40-1",
                "maxLevel": 1,
                "maxSkillName": null,
                "isPassive": true,
                "position": "topleft",
                "hash": "1-7"
            },
            "攻撃力+40-1": {
                "name": "攻撃力+40",
                "prev": "スラッシュ",
                "maxLevel": 1,
                "maxSkillName": null,
                "isPassive": true,
                "position": "bottom",
                "hash": "1-8"
            },
            "攻撃力+40-2": {
                "name": "攻撃力+40",
                "prev": "破気撃",
                "maxLevel": 1,
                "maxSkillName": null,
                "isPassive": true,
                "position": "topright",
                "hash": "1-9"
            },
            "攻撃力+40-3": {
                "name": "攻撃力+40",
                "prev": "練気斬",
                "maxLevel": 1,
                "maxSkillName": null,
                "isPassive": true,
                "position": "topleft",
                "hash": "1-10"
            },
            "なぎ払い": {
                "name": "なぎ払い",
                "prev": "攻撃力+40-2",
                "maxLevel": 5,
                "maxSkillName": "渾身薙ぎ",
                "position": "topright",
                "hash": "1-11"
            },
            "戦士の心得": {
                "name": "戦士の心得",
                "prev": null,
                "maxLevel": 5,
                "maxSkillName": "戦士の誇り",
                "isMaxPassive": true,
                "position": "topleft",
                "hash": "1-12"
            },
            "防御のかまえ": {
                "name": "防御のかまえ",
                "prev": "戦士の心得",
                "maxLevel": 5,
                "maxSkillName": "熟練の守備",
                "isMaxPassive": true,
                "position": "bottom",
                "hash": "1-13"
            },
            "戦う勇気": {
                "name": "戦う勇気",
                "prev": "戦士の心得",
                "maxLevel": 5,
                "maxSkillName": "みなぎる闘志",
                "position": "topleft",
                "hash": "1-14"
            },
            "防御力+80-1": {
                "name": "防御力+80",
                "prev": "戦う勇気",
                "maxLevel": 1,
                "maxSkillName": null,
                "isPassive": true,
                "position": "topleft",
                "hash": "1-15"
            },
            "防御力+80-2": {
                "name": "防御力+80",
                "prev": "防御のかまえ",
                "maxLevel": 1,
                "maxSkillName": null,
                "isPassive": true,
                "position": "topleft",
                "hash": "1-16"
            },
            "筋骨隆々": {
                "name": "筋骨隆々",
                "prev": "防御力+80-1",
                "maxLevel": 5,
                "maxSkillName": "超人化",
                "position": "topright",
                "hash": "1-17"
            },
            "[継承]防御力+80": {
                "name": "[継承]防御力+80",
                "prev": "防御力+80-1",
                "maxLevel": 1,
                "maxSkillName": null,
                "isPassive": true,
                "position": "bottom",
                "hash": "1-18"
            },
            "フィットアーマー": {
                "name": "フィットアーマー",
                "prev": "防御力+80-2",
                "maxLevel": 5,
                "maxSkillName": "キングスアーマー",
                "position": "left",
                "hash": "1-19"
            },
            "シールドガード": {
                "name": "シールドガード",
                "prev": "防御のかまえ",
                "maxLevel": 5,
                "maxSkillName": "アダマントガード",
                "position": "bottomleft",
                "hash": "1-20"
            },
            "防御力+80-3": {
                "name": "防御力+80",
                "prev": "シールドガード",
                "maxLevel": 1,
                "maxSkillName": null,
                "isPassive": true,
                "position": "bottomleft",
                "hash": "1-21"
            },
            "ガードスタンス": {
                "name": "ガードスタンス",
                "prev": "防御力+80-3",
                "maxLevel": 5,
                "maxSkillName": "盾の達人",
                "isMaxPassive": true,
                "position": "bottomright",
                "hash": "1-22"
            },
            "[継承]防御効率+2-1": {
                "name": "[継承]防御効率+2",
                "prev": "防御力+80-3",
                "maxLevel": 1,
                "maxSkillName": null,
                "isPassive": true,
                "position": "top",
                "hash": "1-23"
            },
            "カウンターアタック": {
                "name": "カウンターアタック",
                "prev": "戦士の心得",
                "maxLevel": 5,
                "maxSkillName": "マルチカウンター",
                "position": "top",
                "hash": "1-24"
            },
            "クリティカルカウンター": {
                "name": "クリティカルカウンター",
                "prev": "カウンターアタック",
                "maxLevel": 5,
                "maxSkillName": "熾烈なる報復",
                "position": "topleft",
                "hash": "1-25"
            }
        }
    },
    "ウィザード": {
        "otherJobs": [],
        "skills": {
            "ファイア": {
                "name": "ファイア",
                "prev": null,
                "maxLevel": 5,
                "maxSkillName": "ヘルファイア",
                "position": "top",
                "hash": "2-1"
            },
            "サンダー": {
                "name": "サンダー",
                "prev": "ファイア",
                "maxLevel": 5,
                "maxSkillName": "ヘルサンダー",
                "position": "top",
                "hash": "2-2"
            },
            "フロスト": {
                "name": "フロスト",
                "prev": "サンダー",
                "maxLevel": 5,
                "maxSkillName": "ヘルフロスト",
                "position": "top",
                "hash": "2-3"
            },
            "ファイアボルト": {
                "name": "ファイアボルト",
                "prev": "フロスト",
                "maxLevel": 5,
                "maxSkillName": "ヘルフレイム",
                "position": "bottomleft",
                "hash": "2-4"
            },
            "サンダーブラスト": {
                "name": "サンダーブラスト",
                "prev": "ファイアボルト",
                "maxLevel": 5,
                "maxSkillName": "サンダースコール",
                "position": "bottomleft",
                "hash": "2-5"
            },
            "フロストストライク": {
                "name": "フロストストライク",
                "prev": "サンダーブラスト",
                "maxLevel": 5,
                "maxSkillName": "フロストキャノン",
                "position": "bottomleft",
                "hash": "2-6"
            },
            "ブリザード": {
                "name": "ブリザード",
                "prev": "フロストストライク",
                "maxLevel": 5,
                "maxSkillName": "アバランチ",
                "position": "bottomleft",
                "hash": "2-7"
            },
            "エクスプロージョン": {
                "name": "エクスプロージョン",
                "prev": "ブリザード",
                "maxLevel": 5,
                "maxSkillName": "イグニス・レイジ",
                "position": "bottom",
                "hash": "2-8"
            },
            "サンダーストーム": {
                "name": "サンダーストーム",
                "prev": "エクスプロージョン",
                "maxLevel": 5,
                "maxSkillName": "終末の雷嵐",
                "position": "bottom",
                "hash": "2-9"
            },
            "ポイズン": {
                "name": "ポイズン",
                "prev": null,
                "maxLevel": 5,
                "maxSkillName": "デッドリーベノム",
                "position": "bottomleft",
                "hash": "2-10"
            },
            "MP+40-1": {
                "name": "MP+40-1",
                "prev": "ポイズン",
                "maxLevel": 1,
                "maxSkillName": null,
                "position": "bottomleft",
                "hash": "2-11"
            },
            "フリーズ": {
                "name": "フリーズ",
                "prev": "MP+40-1",
                "maxLevel": 5,
                "maxSkillName": "フリーズショック",
                "position": "bottomleft",
                "hash": "2-12"
            },
            "[継承]MP+40": {
                "name": "[継承]MP+40",
                "prev": "フリーズ",
                "maxLevel": 1,
                "maxSkillName": null,
                "position": "bottomright",
                "hash": "2-13"
            },
            "レッサーディスペル": {
                "name": "レッサーディスペル",
                "prev": "[継承]MP+40",
                "maxLevel": 5,
                "maxSkillName": "魔素回収",
                "position": "bottomright",
                "hash": "2-14"
            },
            "知力+40-1": {
                "name": "知力+40",
                "prev": "レッサーディスペル",
                "maxLevel": 1,
                "maxSkillName": null,
                "position": "bottomright",
                "hash": "2-15"
            },
            "[継承]知力+40": {
                "name": "[継承]知力+40",
                "prev": "知力+40-1",
                "maxLevel": 1,
                "maxSkillName": null,
                "position": "bottomright",
                "hash": "2-16"
            },
            "ディスペル": {
                "name": "ディスペル",
                "prev": "[継承]知力+40",
                "maxLevel": 5,
                "maxSkillName": "魔解奪",
                "position": "topright",
                "hash": "2-17"
            },
            "[継承]魔法クリティカル最大倍率+0.1": {
                "name": "[継承]魔法クリティカル最大倍率+0.1",
                "prev": "ディスペル",
                "maxLevel": 1,
                "maxSkillName": null,
                "position": "topright",
                "hash": "2-18"
            },
            "術士の心得": {
                "name": "術士の心得",
                "prev": null,
                "maxLevel": 5,
                "maxSkillName": "術士の魔力",
                "position": "bottomright",
                "hash": "2-19"
            },
            "MP+40-2": {
                "name": "MP+40",
                "prev": "術士の心得",
                "maxLevel": 1,
                "maxSkillName": null,
                "position": "bottomright",
                "hash": "2-20"
            },
            "マジックシールド": {
                "name": "マジックシールド",
                "prev": "MP+40-2",
                "maxLevel": 5,
                "maxSkillName": "マジックウォール",
                "position": "bottomright",
                "hash": "2-21"
            },
            "知力+40-2": {
                "name": "知力+40",
                "prev": "マジックシールド",
                "maxLevel": 1,
                "maxSkillName": null,
                "position": "top",
                "hash": "2-22"
            },
            "導きの光": {
                "name": "導きの光",
                "prev": "知力+40-2",
                "maxLevel": 5,
                "maxSkillName": "導師の皆伝",
                "position": "top",
                "hash": "2-23"
            },
            "MP+40-3": {
                "name": "MP+40",
                "prev": "導きの光",
                "maxLevel": 1,
                "maxSkillName": null,
                "position": "top",
                "hash": "2-24"
            },
            "知力+40-3": {
                "name": "知力+40",
                "prev": "MP+40-3",
                "maxLevel": 1,
                "maxSkillName": null,
                "position": "top",
                "hash": "2-25"
            },
            "[継承]詠唱速度+2": {
                "name": "[継承]詠唱速度+2",
                "prev": "知力+40-3",
                "maxLevel": 1,
                "maxSkillName": null,
                "position": "topleft",
                "hash": "2-26"
            },
            "アーケインチャージ": {
                "name": "アーケインチャージ",
                "prev": "[継承]詠唱速度+2",
                "maxLevel": 5,
                "maxSkillName": "ハイパーアーケインチャージ",
                "position": "topleft",
                "hash": "2-27"
            }
        }
    },
    "シーフ": {
        "otherJobs": [
            "アサシン",
            "モンク"
        ],
        "skills": {
            "フェイントアタック": {
                "name": "フェイントアタック",
                "prev": null,
                "maxLevel": 5,
                "maxSkillName": "殺しの前撃",
                "position": "bottomleft",
                "hash": "3-1"
            },
            "影歩撃": {
                "name": "影歩撃",
                "prev": "フェイントアタック",
                "maxLevel": 5,
                "maxSkillName": "影没",
                "position": "topleft",
                "hash": "3-2"
            },
            "攻撃力+40-1": {
                "name": "攻撃力+40",
                "prev": "影歩撃",
                "maxLevel": 1,
                "maxSkillName": null,
                "position": "top",
                "hash": "3-3"
            },
            "急所攻撃": {
                "name": "急所攻撃",
                "prev": "攻撃力+40-1",
                "maxLevel": 5,
                "maxSkillName": "ハートスキューア",
                "position": "top",
                "hash": "3-4"
            },
            "[継承]攻撃力+40": {
                "name": "[継承]攻撃力+40",
                "prev": "急所攻撃",
                "maxLevel": 1,
                "maxSkillName": null,
                "position": "topright",
                "hash": "3-5"
            },
            "魔封撃": {
                "name": "魔封撃",
                "prev": "影歩撃",
                "maxLevel": 5,
                "maxSkillName": "術者殺し",
                "position": "topright",
                "hash": "3-6"
            },
            "攻撃力+40-2": {
                "name": "攻撃力+40",
                "prev": "魔封撃",
                "maxLevel": 1,
                "maxSkillName": null,
                "position": "top",
                "hash": "3-7"
            },
            "影当身": {
                "name": "影当身",
                "prev": "攻撃力+40-2",
                "maxLevel": 5,
                "maxSkillName": "永き眠りへの誘い",
                "position": "topright",
                "hash": "3-8"
            },
            "足がらみ": {
                "name": "足がらみ",
                "prev": "影当身",
                "maxLevel": 5,
                "maxSkillName": "アキレスブレイク",
                "position": "topright",
                "hash": "3-9"
            },
            "盗賊の心得": {
                "name": "盗賊の心得",
                "prev": null,
                "maxLevel": 5,
                "maxSkillName": "盗賊の見切り",
                "position": "right",
                "hash": "3-10"
            },
            "疾風の陣": {
                "name": "疾風の陣",
                "prev": "盗賊の心得",
                "maxLevel": 5,
                "maxSkillName": "砂嵐の陣",
                "position": "bottom",
                "hash": "3-11"
            },
            "速さ+40-1": {
                "name": "速さ+40",
                "prev": "疾風の陣",
                "maxLevel": 1,
                "maxSkillName": null,
                "position": "topright",
                "hash": "3-12"
            },
            "[継承]速さ+40": {
                "name": "[継承]速さ+40",
                "prev": "速さ+40-1",
                "maxLevel": 1,
                "maxSkillName": null,
                "position": "top",
                "hash": "3-13"
            },
            "[継承]物理クリティカル最大倍率+0.1": {
                "name": "[継承]物理クリティカル最大倍率+0.1",
                "prev": "速さ+40-1",
                "maxLevel": 1,
                "maxSkillName": null,
                "position": "bottom",
                "hash": "3-14"
            },
            "速さ+40-2": {
                "name": "速さ+40",
                "prev": "盗賊の心得",
                "maxLevel": 1,
                "maxSkillName": null,
                "position": "bottomleft",
                "hash": "3-15"
            },
            "盗賊の身かわし": {
                "name": "盗賊の身かわし",
                "prev": "速さ+40-2",
                "maxLevel": 5,
                "maxSkillName": "盗賊の身かわし",
                "position": "bottom",
                "hash": "3-16"
            },
            "深く突き立て！": {
                "name": "深く突き立て！",
                "prev": "盗賊の身かわし",
                "maxLevel": 5,
                "maxSkillName": "真・深く突き立て！",
                "position": "bottomright",
                "hash": "3-17"
            },
            "速さ+40-3": {
                "name": "速さ+40",
                "prev": "盗賊の身かわし",
                "maxLevel": 1,
                "maxSkillName": null,
                "position": "bottomleft",
                "hash": "3-18"
            },
            "ラッシュ": {
                "name": "ラッシュ",
                "prev": "速さ+40-3",
                "maxLevel": 5,
                "maxSkillName": "アドレナリン・ハイ",
                "position": "bottomright",
                "hash": "3-19"
            },
            "フェイクデス": {
                "name": "フェイクデス",
                "prev": "速さ+40-2",
                "maxLevel": 5,
                "maxSkillName": "擬死再生",
                "position": "bottomleft",
                "hash": "3-20"
            },
            "攻撃力+40-3": {
                "name": "攻撃力+40",
                "prev": "フェイクデス",
                "maxLevel": 1,
                "maxSkillName": null,
                "position": "bottomleft",
                "hash": "3-21"
            },
            "オーラスナッチ": {
                "name": "オーラスナッチ",
                "prev": "攻撃力+40-3",
                "maxLevel": 5,
                "maxSkillName": "オーラジャック",
                "position": "bottomleft",
                "hash": "3-22"
            },
            "[継承]器用+40": {
                "name": "[継承]器用+40",
                "prev": "オーラスナッチ",
                "maxLevel": 1,
                "maxSkillName": null,
                "position": "topleft",
                "hash": "3-23"
            },
            "追い風": {
                "name": "追い風",
                "prev": "オーラスナッチ",
                "maxLevel": 5,
                "maxSkillName": "幸運の風",
                "position": "bottomright",
                "hash": "3-24"
            }
        }
    },
    "クレリック": {
        "otherJobs": [],
        "skills": {
            "エンゼルフロウ": {
                "name": "エンゼルフロウ",
                "prev": null,
                "maxLevel": 5,
                "maxSkillName": "エンゼルブラスト",
                "position": "bottom",
                "hash": "4-1"
            },
            "ホーリーブロウ": {
                "name": "ホーリーブロウ",
                "prev": "エンゼルフロウ",
                "maxLevel": 5,
                "maxSkillName": "聖なる裁撃",
                "position": "topright",
                "hash": "4-2"
            },
            "攻撃力+40-1": {
                "name": "攻撃力+40",
                "prev": "ホーリーブロウ",
                "maxLevel": 1,
                "maxSkillName": null,
                "position": "topright",
                "hash": "4-3"
            },
            "ホーリースマイト": {
                "name": "ホーリースマイト",
                "prev": "攻撃力+40-1",
                "maxLevel": 5,
                "maxSkillName": "正義の暴打",
                "position": "bottom",
                "hash": "4-4"
            },
            "[継承]攻撃力+40": {
                "name": "[継承]攻撃力+40",
                "prev": "ホーリースマイト",
                "maxLevel": 1,
                "maxSkillName": null,
                "position": "bottomleft",
                "hash": "4-5"
            },
            "まやかしの光": {
                "name": "まやかしの光",
                "prev": "エンゼルフロウ",
                "maxLevel": 5,
                "maxSkillName": "堕落の光",
                "position": "topleft",
                "hash": "4-6"
            },
            "知力+40-1": {
                "name": "知力+40",
                "prev": "まやかしの光",
                "maxLevel": 1,
                "maxSkillName": null,
                "position": "bottomleft",
                "hash": "4-7"
            },
            "サイレンス": {
                "name": "サイレンス",
                "prev": "知力+40-1",
                "maxLevel": 5,
                "maxSkillName": "封心鎮圧",
                "position": "bottomright",
                "hash": "4-8"
            },
            "平和な心": {
                "name": "平和な心",
                "prev": "サイレンス",
                "maxLevel": 5,
                "maxSkillName": "悔根の心",
                "position": "bottomright",
                "hash": "4-9"
            },
            "神官の心得": {
                "name": "神官の心得",
                "prev": null,
                "maxLevel": 5,
                "maxSkillName": "神官の永誓",
                "position": "topleft",
                "hash": "4-10"
            },
            "防御力+80-1": {
                "name": "防御力+80",
                "prev": "神官の心得",
                "maxLevel": 1,
                "maxSkillName": null,
                "position": "top",
                "hash": "4-11"
            },
            "慈悲の心": {
                "name": "慈悲の心",
                "prev": "防御力+80-1",
                "maxLevel": 5,
                "maxSkillName": "深き慈悲の保護",
                "position": "topleft",
                "hash": "4-12"
            },
            "HP+40-1": {
                "name": "HP+40",
                "prev": "慈悲の心",
                "maxLevel": 1,
                "maxSkillName": null,
                "position": "bottomleft",
                "hash": "4-13"
            },
            "守護の泡": {
                "name": "守護の泡",
                "prev": "HP+40-1",
                "maxLevel": 5,
                "maxSkillName": "守護の泡壁",
                "position": "bottomleft",
                "hash": "4-14"
            },
            "[継承]MP+40": {
                "name": "[継承]MP+40",
                "prev": "守護の泡",
                "maxLevel": 1,
                "maxSkillName": null,
                "position": "bottom",
                "hash": "4-15"
            },
            "七色の守護の泡": {
                "name": "七色の守護の泡",
                "prev": "[継承]MP+40",
                "maxLevel": 5,
                "maxSkillName": "金剛の大泡",
                "position": "bottomright",
                "hash": "4-16"
            },
            "慈悲の博愛": {
                "name": "慈悲の博愛",
                "prev": "[継承]MP+40",
                "maxLevel": 5,
                "maxSkillName": "慈愛の奇蹟",
                "position": "right",
                "hash": "4-17"
            },
            "クルセイド": {
                "name": "クルセイド",
                "prev": "[継承]MP+40",
                "maxLevel": 5,
                "maxSkillName": "高速クルセイド",
                "position": "bottom",
                "hash": "4-18"
            },
            "セルフヒール": {
                "name": "セルフヒール",
                "prev": null,
                "maxLevel": 5,
                "maxSkillName": "リフレッシュセルフ",
                "position": "topright",
                "hash": "4-19"
            },
            "精神+40-1": {
                "name": "精神+40",
                "prev": "セルフヒール",
                "maxLevel": 1,
                "maxSkillName": null,
                "position": "top",
                "hash": "4-20"
            },
            "ヒール": {
                "name": "ヒール",
                "prev": "精神+40-1",
                "maxLevel": 5,
                "maxSkillName": "リニュウヒール",
                "position": "topright",
                "hash": "4-21"
            },
            "キュアポイズン": {
                "name": "キュアポイズン",
                "prev": "ヒール",
                "maxLevel": 5,
                "maxSkillName": "マスキュアポイズン",
                "position": "bottomright",
                "hash": "4-22"
            },
            "MP+40-1": {
                "name": "MP+40",
                "prev": "キュアポイズン",
                "maxLevel": 1,
                "maxSkillName": null,
                "position": "bottomright",
                "hash": "4-23"
            },
            "[継承]精神+40": {
                "name": "[継承]精神+40",
                "prev": "MP+40-1",
                "maxLevel": 1,
                "maxSkillName": null,
                "position": "bottom",
                "hash": "4-24"
            },
            "リバティ": {
                "name": "リバティ",
                "prev": "[継承]精神+40",
                "maxLevel": 5,
                "maxSkillName": "マスリバティ",
                "position": "left",
                "hash": "4-25"
            },
            "グループヒール": {
                "name": "グループヒール",
                "prev": "[継承]精神+40",
                "maxLevel": 5,
                "maxSkillName": "分け隔て無き治癒",
                "position": "bottom",
                "hash": "4-26"
            }
        }
    },
    "ガーディアン": {
        "otherJobs": [],
        "skills": {
            "突撃": {
                "name": "突撃",
                "prev": null,
                "maxLevel": 5,
                "maxSkillName": "ギガントクラッシュ",
                "position": "bottom",
                "hash": "5-1"
            },
            "咆哮": {
                "name": "咆哮",
                "prev": "HP+40-1",
                "maxLevel": 5,
                "maxSkillName": "鋼の咆哮",
                "position": "top",
                "hash": "5-2"
            },
            "鉄壁のかまえ": {
                "name": "鉄壁のかまえ",
                "prev": null,
                "maxLevel": 5,
                "maxSkillName": "大盾のかまえ",
                "position": "bottomleft",
                "hash": "5-3"
            },
            "城壁の陣": {
                "name": "城壁の陣",
                "prev": "防御力+80-1",
                "maxLevel": 5,
                "maxSkillName": "大岩の陣",
                "position": "bottomleft",
                "hash": "5-4"
            },
            "ランサーニードル": {
                "name": "ランサーニードル",
                "prev": "突撃",
                "maxLevel": 5,
                "maxSkillName": "ランサーインパクト",
                "position": "bottom",
                "hash": "5-5"
            },
            "パイルバンカー": {
                "name": "パイルバンカー",
                "prev": "ランサーニードル",
                "maxLevel": 5,
                "maxSkillName": "衝点突",
                "position": "bottom",
                "hash": "5-6"
            },
            "身代わり": {
                "name": "身代わり",
                "prev": "戦の叫び",
                "maxLevel": 5,
                "maxSkillName": "不退転の護衛",
                "position": "bottomleft",
                "hash": "5-7"
            },
            "気合防御": {
                "name": "気合防御",
                "prev": "防御力+80-2",
                "maxLevel": 5,
                "maxSkillName": "屈強なる肉の巨壁",
                "position": "top",
                "hash": "5-8"
            },
            "戦の叫び": {
                "name": "戦の叫び",
                "prev": "咆哮",
                "maxLevel": 5,
                "maxSkillName": "戦慄の叫び",
                "position": "left",
                "hash": "5-9"
            },
            "大城壁の陣": {
                "name": "大城壁の陣",
                "prev": "防御力+80-3",
                "maxLevel": 5,
                "maxSkillName": "不沈城の大陣",
                "position": "bottomright",
                "hash": "5-10"
            },
            "パイルスラスト": {
                "name": "パイルスラスト",
                "prev": "パイルバンカー",
                "maxLevel": 5,
                "maxSkillName": "弩級肉弾撃",
                "position": "topright",
                "hash": "5-11"
            },
            "一心盾": {
                "name": "一心盾",
                "prev": "HP+40-3",
                "maxLevel": 5,
                "maxSkillName": "真なる盾守",
                "position": "bottomright",
                "hash": "5-12"
            },
            "猛き雄叫び": {
                "name": "猛き雄叫び",
                "prev": "身代わり",
                "maxLevel": 5,
                "maxSkillName": "勝ち鬨の雄叫び",
                "position": "right",
                "hash": "5-13"
            },
            "不動の大盾": {
                "name": "不動の大盾",
                "prev": "[継承]防御力+80",
                "maxLevel": 5,
                "maxSkillName": "重盾の衝撃",
                "position": "top",
                "hash": "5-14"
            },
            "ガードカウンター": {
                "name": "ガードカウンター",
                "prev": "咆哮",
                "maxLevel": 5,
                "maxSkillName": "マルチガードカウンター",
                "position": "right",
                "hash": "5-15"
            },
            "ヘヴィーカウンター": {
                "name": "ヘヴィーカウンター",
                "prev": "ガードカウンター",
                "maxLevel": 5,
                "maxSkillName": "コロッサスカウンター",
                "position": "bottomright",
                "hash": "5-16"
            },
            "盾を掲げよ！": {
                "name": "盾を掲げよ！",
                "prev": "HP+40-2",
                "maxLevel": 5,
                "maxSkillName": "鎧とひとつに！",
                "position": "bottomleft",
                "hash": "5-17"
            },
            "[継承]防御力+80": {
                "name": "[継承]防御力+80",
                "prev": "[継承]HP+40",
                "maxLevel": 1,
                "maxSkillName": null,
                "position": "top",
                "hash": "5-18"
            },
            "[継承]HP+40": {
                "name": "[継承]HP+40",
                "prev": "一心盾",
                "maxLevel": 1,
                "maxSkillName": null,
                "position": "bottomright",
                "hash": "5-19"
            },
            "[継承]防御効率+2": {
                "name": "[継承]防御効率+2",
                "prev": "ヘヴィーカウンター",
                "maxLevel": 1,
                "maxSkillName": null,
                "position": "left",
                "hash": "5-20"
            },
            "HP+40-1": {
                "name": "HP+40",
                "prev": null,
                "maxLevel": 1,
                "maxSkillName": null,
                "position": "top",
                "hash": "5-21"
            },
            "HP+40-2": {
                "name": "HP+40",
                "prev": "[継承]HP+40",
                "maxLevel": 1,
                "maxSkillName": null,
                "position": "bottomleft",
                "hash": "5-22"
            },
            "HP+40-3": {
                "name": "HP+40",
                "prev": null,
                "maxLevel": 1,
                "maxSkillName": null,
                "position": "bottomright",
                "hash": "5-23"
            },
            "防御力+80-1": {
                "name": "防御力+80",
                "prev": "鉄壁のかまえ",
                "maxLevel": 1,
                "maxSkillName": null,
                "position": "bottomleft",
                "hash": "5-24"
            },
            "防御力+80-2": {
                "name": "防御力+80",
                "prev": "城壁の陣",
                "maxLevel": 1,
                "maxSkillName": null,
                "position": "top",
                "hash": "5-25"
            },
            "防御力+80-3": {
                "name": "防御力+80",
                "prev": "城壁の陣",
                "maxLevel": 1,
                "maxSkillName": null,
                "position": "bottomright",
                "hash": "5-26"
            }
        }
    },
    "マジックナイト": {
        "otherJobs": [],
        "skills": {
            "マジカルバックラー": {
                "name": "マジカルバックラー",
                "prev": null,
                "maxLevel": 5,
                "maxSkillName": "マジカルガーダー",
                "position": "bottomleft",
                "hash": "6-1"
            },
            "ファイアーアロー": {
                "name": "ファイアーアロー",
                "prev": null,
                "maxLevel": 5,
                "maxSkillName": "メルトアロー",
                "position": "topleft",
                "hash": "6-2"
            },
            "サンダーアロー": {
                "name": "サンダーアロー",
                "prev": "MP+40-1",
                "maxLevel": 5,
                "maxSkillName": "インパルスアロー",
                "position": "topright",
                "hash": "6-3"
            },
            "フロストアロー": {
                "name": "フロストアロー",
                "prev": "トリックビジョン",
                "maxLevel": 5,
                "maxSkillName": "アシッドアロー",
                "position": "right",
                "hash": "6-4"
            },
            "炎の守り": {
                "name": "炎の守り",
                "prev": "ファイアーアロー",
                "maxLevel": 5,
                "maxSkillName": "炎の精霊の加護",
                "position": "topleft",
                "hash": "6-5"
            },
            "風の守り": {
                "name": "風の守り",
                "prev": "サンダーアロー",
                "maxLevel": 5,
                "maxSkillName": "風の精霊の加護",
                "position": "right",
                "hash": "6-6"
            },
            "水の守り": {
                "name": "水の守り",
                "prev": "フロストアロー",
                "maxLevel": 5,
                "maxSkillName": "水の精霊の加護",
                "position": "bottom",
                "hash": "6-7"
            },
            "大地の守り": {
                "name": "大地の守り",
                "prev": "コンシューム オーラ",
                "maxLevel": 5,
                "maxSkillName": "大地の精霊の加護",
                "position": "bottomright",
                "hash": "6-8"
            },
            "マジックウェイブ": {
                "name": "マジックウェイブ",
                "prev": "知力+40-2",
                "maxLevel": 5,
                "maxSkillName": "ブレイクウェイブ",
                "position": "top",
                "hash": "6-9"
            },
            "マジックサージ": {
                "name": "マジックサージ",
                "prev": "風の守り",
                "maxLevel": 5,
                "maxSkillName": "マジックサイフォン",
                "position": "top",
                "hash": "6-10"
            },
            "トリックビジョン": {
                "name": "トリックビジョン",
                "prev": "HP+40-1",
                "maxLevel": 5,
                "maxSkillName": "トリックフィールド",
                "position": "bottomright",
                "hash": "6-11"
            },
            "マジックスラスト": {
                "name": "マジックスラスト",
                "prev": "[継承]MP+40",
                "maxLevel": 5,
                "maxSkillName": "双穴突貫衝",
                "position": "topleft",
                "hash": "6-12"
            },
            "鈍呪刺突": {
                "name": "鈍呪刺突",
                "prev": "知力+40-1",
                "maxLevel": 5,
                "maxSkillName": "絶命超突窮",
                "position": "bottomleft",
                "hash": "6-13"
            },
            "コンシューム オーラ": {
                "name": "コンシューム オーラ",
                "prev": "[継承]防御力+80",
                "maxLevel": 5,
                "maxSkillName": "オーラ キュイジーヌ",
                "position": "bottom",
                "hash": "6-14"
            },
            "マジカルブレイド": {
                "name": "マジカルブレイド",
                "prev": "[継承]HP+40",
                "maxLevel": 5,
                "maxSkillName": "ゾディアックブレイド",
                "position": "topright",
                "hash": "6-15"
            },
            "[継承]防御力+80": {
                "name": "[継承]防御力+80",
                "prev": "防御力+80-1",
                "maxLevel": 1,
                "maxSkillName": null,
                "position": "left",
                "hash": "6-16"
            },
            "[継承]MP+40": {
                "name": "[継承]MP+40",
                "prev": "マジックサージ",
                "maxLevel": 1,
                "maxSkillName": null,
                "position": "topleft",
                "hash": "6-17"
            },
            "[継承]HP+40": {
                "name": "[継承]HP+40",
                "prev": "マジックウェイブ",
                "maxLevel": 1,
                "maxSkillName": null,
                "position": "topright",
                "hash": "6-18"
            },
            "[継承]四属性耐性+5": {
                "name": "[継承]四属性耐性+5",
                "prev": "大地の守り",
                "maxLevel": 1,
                "maxSkillName": null,
                "position": "bottomright",
                "hash": "6-19"
            },
            "知力+40-1": {
                "name": "知力+40",
                "prev": "水の守り",
                "maxLevel": 1,
                "maxSkillName": null,
                "position": "bottomleft",
                "hash": "6-20"
            },
            "防御力+80-1": {
                "name": "防御力+80",
                "prev": "マジカルバックラー",
                "maxLevel": 1,
                "maxSkillName": null,
                "position": "bottomleft",
                "hash": "6-21"
            },
            "攻撃力+40-1": {
                "name": "攻撃力+40",
                "prev": "炎の守り",
                "maxLevel": 1,
                "maxSkillName": null,
                "position": "bottomleft",
                "hash": "6-22"
            },
            "HP+40-1": {
                "name": "HP+40",
                "prev": null,
                "maxLevel": 1,
                "maxSkillName": null,
                "position": "bottomright",
                "hash": "6-23"
            },
            "MP+40-1": {
                "name": "MP+40",
                "prev": null,
                "maxLevel": 1,
                "maxSkillName": null,
                "position": "topright",
                "hash": "6-24"
            },
            "知力+40-2": {
                "name": "知力+40",
                "prev": "攻撃力+40-1",
                "maxLevel": 1,
                "maxSkillName": null,
                "position": "top",
                "hash": "6-25"
            }
        }
    },
    "ウォーロック": {
        "otherJobs": [],
        "skills": {
            "ドレイン": {
                "name": "ドレイン",
                "prev": null,
                "maxLevel": 5,
                "maxSkillName": "マインドドレイン",
                "position": "topright",
                "hash": "7-1"
            },
            "闇の福音": {
                "name": "闇の福音",
                "prev": "知力+40-1",
                "maxLevel": 5,
                "maxSkillName": "闇への回帰",
                "position": "topleft",
                "hash": "7-2"
            },
            "死神の衣": {
                "name": "死神の衣",
                "prev": "闇の福音",
                "maxLevel": 5,
                "maxSkillName": "死神の法衣",
                "position": "top",
                "hash": "7-3"
            },
            "アーマーブレイク": {
                "name": "アーマーブレイク",
                "prev": "精神+40-1",
                "maxLevel": 5,
                "maxSkillName": "アーマーコラプス",
                "position": "bottomleft",
                "hash": "7-4"
            },
            "アイスブレス": {
                "name": "アイスブレス",
                "prev": "MP+40-1",
                "maxLevel": 5,
                "maxSkillName": "アイスカース",
                "position": "top",
                "hash": "7-5"
            },
            "メガドレイン": {
                "name": "メガドレイン",
                "prev": "ドレイン",
                "maxLevel": 5,
                "maxSkillName": "生命枯渇魔法",
                "position": "topright",
                "hash": "7-6"
            },
            "ソードブレイク": {
                "name": "ソードブレイク",
                "prev": "ドリームフォール",
                "maxLevel": 5,
                "maxSkillName": "ソードコラプス",
                "position": "bottomright",
                "hash": "7-7"
            },
            "アイスブレイズ": {
                "name": "アイスブレイズ",
                "prev": "アイスブレス",
                "maxLevel": 5,
                "maxSkillName": "アイスヘックス",
                "position": "topleft",
                "hash": "7-8"
            },
            "サンダーブレイク": {
                "name": "サンダーブレイク",
                "prev": "アイスブレス",
                "maxLevel": 5,
                "maxSkillName": "双雷爆",
                "position": "topright",
                "hash": "7-9"
            },
            "ドリームフォール": {
                "name": "ドリームフォール",
                "prev": "アーマーブレイク",
                "maxLevel": 5,
                "maxSkillName": "ドリームトリップ",
                "position": "bottomleft",
                "hash": "7-10"
            },
            "ブレイクアームズ": {
                "name": "ブレイクアームズ",
                "prev": "ソードブレイク",
                "maxLevel": 5,
                "maxSkillName": "ディケイドアームズ",
                "position": "right",
                "hash": "7-11"
            },
            "ギガドレイン": {
                "name": "ギガドレイン",
                "prev": "メガドレイン",
                "maxLevel": 5,
                "maxSkillName": "ダークネスドレイン",
                "position": "topright",
                "hash": "7-12"
            },
            "黒猫の呪い": {
                "name": "黒猫の呪い",
                "prev": "HP+40-1",
                "maxLevel": 5,
                "maxSkillName": "虐戯・黒猫の魂舐め",
                "position": "topright",
                "hash": "7-13"
            },
            "粘つくスライム酸": {
                "name": "粘つくスライム酸",
                "prev": "ソードブレイク",
                "maxLevel": 5,
                "maxSkillName": "虐戯・スライム溶解酸",
                "position": "topright",
                "hash": "7-14"
            },
            "[継承]精神+40": {
                "name": "[継承]精神+40",
                "prev": "メガドレイン",
                "maxLevel": 1,
                "maxSkillName": null,
                "position": "right",
                "hash": "7-15"
            },
            "[継承]MP+40": {
                "name": "[継承]MP+40",
                "prev": "アイスブレス",
                "maxLevel": 1,
                "maxSkillName": null,
                "position": "top",
                "hash": "7-16"
            },
            "[継承]知力+40": {
                "name": "[継承]知力+40",
                "prev": "闇の福音",
                "maxLevel": 1,
                "maxSkillName": null,
                "position": "left",
                "hash": "7-17"
            },
            "[継承]HP+40": {
                "name": "[継承]HP+40",
                "prev": "メガドレイン",
                "maxLevel": 1,
                "maxSkillName": null,
                "position": "top",
                "hash": "7-18"
            },
            "知力+40-1": {
                "name": "知力+40",
                "prev": null,
                "maxLevel": 1,
                "maxSkillName": null,
                "position": "topleft",
                "hash": "7-19"
            },
            "精神+40-1": {
                "name": "精神+40",
                "prev": null,
                "maxLevel": 1,
                "maxSkillName": null,
                "position": "bottomleft",
                "hash": "7-20"
            },
            "HP+40-1": {
                "name": "HP+40",
                "prev": "MP+40-2",
                "maxLevel": 1,
                "maxSkillName": null,
                "position": "topright",
                "hash": "7-21"
            },
            "MP+40-1": {
                "name": "MP+40",
                "prev": null,
                "maxLevel": 1,
                "maxSkillName": null,
                "position": "top",
                "hash": "7-22"
            },
            "MP+40-2": {
                "name": "MP+40",
                "prev": "ドリームフォール",
                "maxLevel": 1,
                "maxSkillName": null,
                "position": "right",
                "hash": "7-23"
            },
            "知力+40-2": {
                "name": "知力+40",
                "prev": "闇の福音",
                "maxLevel": 1,
                "maxSkillName": null,
                "position": "topleft",
                "hash": "7-24"
            }
        }
    },
    "アサシン": {
        "otherJobs": [],
        "skills": {
            "精神集中": {
                "name": "精神集中",
                "prev": null,
                "maxLevel": 5,
                "maxSkillName": "魔導眼",
                "position": "bottomright",
                "hash": "8-1"
            },
            "催眠波": {
                "name": "催眠波",
                "prev": null,
                "maxLevel": 5,
                "maxSkillName": "催眠連波",
                "position": "bottomleft",
                "hash": "8-2"
            },
            "毒手": {
                "name": "毒手",
                "prev": "器用+40-1",
                "maxLevel": 5,
                "maxSkillName": "猛毒手",
                "position": "bottom",
                "hash": "8-3"
            },
            "必殺の極意": {
                "name": "必殺の極意",
                "prev": "攻撃力+40-2",
                "maxLevel": 5,
                "maxSkillName": "皆殺しの誓い",
                "position": "bottom",
                "hash": "8-4"
            },
            "兜割り": {
                "name": "兜割り",
                "prev": "器用+40-2",
                "maxLevel": 5,
                "maxSkillName": "闇の恐慌",
                "position": "top",
                "hash": "8-5"
            },
            "黒龍閃": {
                "name": "黒龍閃",
                "prev": "攻撃力+40-1",
                "maxLevel": 5,
                "maxSkillName": "黒龍牙撃",
                "position": "top",
                "hash": "8-6"
            },
            "吹き矢": {
                "name": "吹き矢",
                "prev": "兜割り",
                "maxLevel": 5,
                "maxSkillName": "猛毒の吹き矢",
                "position": "top",
                "hash": "8-7"
            },
            "黒龍滅波": {
                "name": "黒龍滅波",
                "prev": "知力+40-2",
                "maxLevel": 5,
                "maxSkillName": "黒龍影伏波",
                "position": "bottomleft",
                "hash": "8-8"
            },
            "闇の衣": {
                "name": "闇の衣",
                "prev": "必殺の極意",
                "maxLevel": 5,
                "maxSkillName": "闇の帳",
                "position": "topright",
                "hash": "8-9"
            },
            "影斬り": {
                "name": "影斬り",
                "prev": "[継承]攻撃力+40",
                "maxLevel": 5,
                "maxSkillName": "大影切断",
                "position": "bottomright",
                "hash": "8-10"
            },
            "死神の眼": {
                "name": "死神の眼",
                "prev": "[継承]速さ+40",
                "maxLevel": 5,
                "maxSkillName": "死神の殺意",
                "position": "top",
                "hash": "8-11"
            },
            "黒龍双咬斬": {
                "name": "黒龍双咬斬",
                "prev": "黒龍滅波",
                "maxLevel": 5,
                "maxSkillName": "黒龍闇殺葬",
                "position": "bottomleft",
                "hash": "8-12"
            },
            "死神の爪": {
                "name": "死神の爪",
                "prev": "死神の眼",
                "maxLevel": 5,
                "maxSkillName": "死神の鋭爪",
                "position": "top",
                "hash": "8-13"
            },
            "[継承]速さ+40": {
                "name": "[継承]速さ+40",
                "prev": "闇の衣",
                "maxLevel": 1,
                "maxSkillName": null,
                "position": "top",
                "hash": "8-14"
            },
            "[継承]攻撃力+40": {
                "name": "[継承]攻撃力+40",
                "prev": "知力+40-2",
                "maxLevel": 1,
                "maxSkillName": null,
                "position": "bottomright",
                "hash": "8-15"
            },
            "[継承]器用+40": {
                "name": "[継承]器用+40",
                "prev": "知力+40-1",
                "maxLevel": 1,
                "maxSkillName": null,
                "position": "bottom",
                "hash": "8-16"
            },
            "[継承]知力+40": {
                "name": "[継承]知力+40",
                "prev": "吹き矢",
                "maxLevel": 1,
                "maxSkillName": null,
                "position": "top",
                "hash": "8-17"
            },
            "攻撃力+40-1": {
                "name": "攻撃力+40",
                "prev": null,
                "maxLevel": 1,
                "maxSkillName": null,
                "position": "top",
                "hash": "8-18"
            },
            "知力+40-1": {
                "name": "知力+40",
                "prev": null,
                "maxLevel": 1,
                "maxSkillName": null,
                "position": "bottom",
                "hash": "8-19"
            },
            "器用+40-1": {
                "name": "器用+40",
                "prev": "催眠波",
                "maxLevel": 1,
                "maxSkillName": null,
                "position": "bottomleft",
                "hash": "8-20"
            },
            "器用+40-2": {
                "name": "器用+40",
                "prev": "毒手",
                "maxLevel": 1,
                "maxSkillName": null,
                "position": "topleft",
                "hash": "8-21"
            },
            "攻撃力+40-2": {
                "name": "攻撃力+40",
                "prev": "精神集中",
                "maxLevel": 1,
                "maxSkillName": null,
                "position": "bottomright",
                "hash": "8-22"
            },
            "知力+40-2": {
                "name": "知力+40",
                "prev": "黒龍閃",
                "maxLevel": 1,
                "maxSkillName": null,
                "position": "top",
                "hash": "8-23"
            }
        }
    },
    "ビショップ": {
        "otherJobs": [],
        "skills": {
            "ヒーリング": {
                "name": "ヒーリング",
                "prev": null,
                "maxLevel": 5,
                "maxSkillName": "ハイヒーリング",
                "position": "topleft",
                "hash": "9-1"
            },
            "ホーリーアロー": {
                "name": "ホーリーアロー",
                "prev": "知力+40-1",
                "maxLevel": 5,
                "maxSkillName": "破戒 ブラッドアロー",
                "position": "bottomleft",
                "hash": "9-2"
            },
            "プロテクション": {
                "name": "プロテクション",
                "prev": "HP+40-1",
                "maxLevel": 5,
                "maxSkillName": "ソマト プロテクター",
                "position": "topright",
                "hash": "9-3"
            },
            "キュアサイレンス": {
                "name": "キュアサイレンス",
                "prev": null,
                "maxLevel": 5,
                "maxSkillName": "秘儀の聖域",
                "position": "bottom",
                "hash": "9-4"
            },
            "ディバインアロー": {
                "name": "ディバインアロー",
                "prev": "グリムケージ",
                "maxLevel": 5,
                "maxSkillName": "破戒 コラプトアロー",
                "position": "top",
                "hash": "9-5"
            },
            "バイタルガード": {
                "name": "バイタルガード",
                "prev": "MP+40-1",
                "maxLevel": 5,
                "maxSkillName": "バイタルブースト",
                "position": "topright",
                "hash": "9-6"
            },
            "蘇生": {
                "name": "蘇生",
                "prev": "[継承]精神+40",
                "maxLevel": 5,
                "maxSkillName": "復活の聖刻",
                "position": "bottomright",
                "hash": "9-7"
            },
            "ワイドヒール": {
                "name": "ワイドヒール",
                "prev": "セルフリカバー",
                "maxLevel": 5,
                "maxSkillName": "グレートワイドヒール",
                "position": "topright",
                "hash": "9-8"
            },
            "セルフリカバー": {
                "name": "セルフリカバー",
                "prev": "[継承]MP+40",
                "maxLevel": 5,
                "maxSkillName": "マインドリフレッシュ",
                "position": "topright",
                "hash": "9-9"
            },
            "グリムケージ": {
                "name": "グリムケージ",
                "prev": "知力+40-2",
                "maxLevel": 5,
                "maxSkillName": "破戒 ダークプリズン",
                "position": "bottomleft",
                "hash": "9-10"
            },
            "フラッシュヒール": {
                "name": "フラッシュヒール",
                "prev": "ワイドヒール",
                "maxLevel": 5,
                "maxSkillName": "破戒 インスタントラブ",
                "position": "bottomright",
                "hash": "9-11"
            },
            "再生の風": {
                "name": "再生の風",
                "prev": "フラッシュヒール",
                "maxLevel": 5,
                "maxSkillName": "ライフストリーム",
                "position": "bottomright",
                "hash": "9-12"
            },
            "修復の輝き": {
                "name": "修復の輝き",
                "prev": "[継承]知力+40",
                "maxLevel": 5,
                "maxSkillName": "修復のオーラ",
                "position": "bottom",
                "hash": "9-13"
            },
            "膨らむ魂の器": {
                "name": "膨らむ魂の器",
                "prev": "バイタルガード",
                "maxLevel": 5,
                "maxSkillName": "生命の樹",
                "position": "bottom",
                "hash": "9-14"
            },
            "[継承]精神+40": {
                "name": "[継承]精神+40",
                "prev": "精神+40-2",
                "maxLevel": 1,
                "maxSkillName": null,
                "position": "topright",
                "hash": "9-15"
            },
            "[継承]MP+40": {
                "name": "[継承]MP+40",
                "prev": "ヒーリング",
                "maxLevel": 1,
                "maxSkillName": null,
                "position": "topleft",
                "hash": "9-16"
            },
            "[継承]知力+40": {
                "name": "[継承]知力+40",
                "prev": "キュアサイレンス",
                "maxLevel": 1,
                "maxSkillName": null,
                "position": "bottom",
                "hash": "9-17"
            },
            "[継承]HP+40": {
                "name": "[継承]HP+40",
                "prev": "再生の風",
                "maxLevel": 1,
                "maxSkillName": null,
                "position": "bottomleft",
                "hash": "9-18"
            },
            "精神+40-1": {
                "name": "精神+40",
                "prev": null,
                "maxLevel": 1,
                "maxSkillName": null,
                "position": "top",
                "hash": "9-19"
            },
            "知力+40-1": {
                "name": "知力+40",
                "prev": null,
                "maxLevel": 1,
                "maxSkillName": null,
                "position": "bottomleft",
                "hash": "9-20"
            },
            "HP+40-1": {
                "name": "HP+40",
                "prev": null,
                "maxLevel": 1,
                "maxSkillName": null,
                "position": "bottomright",
                "hash": "9-21"
            },
            "MP+40-1": {
                "name": "MP+40",
                "prev": "プロテクション",
                "maxLevel": 1,
                "maxSkillName": null,
                "position": "bottom",
                "hash": "9-22"
            },
            "知力+40-2": {
                "name": "知力+40",
                "prev": "ホーリーアロー",
                "maxLevel": 1,
                "maxSkillName": null,
                "position": "top",
                "hash": "9-23"
            },
            "精神+40-2": {
                "name": "精神+40",
                "prev": "精神+40-1",
                "maxLevel": 1,
                "maxSkillName": null,
                "position": "topleft",
                "hash": "9-24"
            }
        }
    },
    "モンク": {
        "otherJobs": [],
        "skills": {
            "瞑想": {
                "name": "瞑想",
                "prev": null,
                "maxLevel": 5,
                "maxSkillName": "チャクラ精練",
                "position": "topleft",
                "hash": "10-1"
            },
            "天のかまえ": {
                "name": "天のかまえ",
                "prev": "器用+40-1",
                "maxLevel": 5,
                "maxSkillName": "共天一体",
                "position": "top",
                "hash": "10-2"
            },
            "気功": {
                "name": "気功",
                "prev": "精神+40-1",
                "maxLevel": 5,
                "maxSkillName": "錬精気功",
                "position": "topright",
                "hash": "10-3"
            },
            "地のかまえ": {
                "name": "地のかまえ",
                "prev": "器用+40-1",
                "maxLevel": 5,
                "maxSkillName": "共地一体",
                "position": "topleft",
                "hash": "10-4"
            },
            "鉄拳": {
                "name": "鉄拳",
                "prev": null,
                "maxLevel": 5,
                "maxSkillName": "金剛拳",
                "position": "bottomright",
                "hash": "10-5"
            },
            "人のかまえ": {
                "name": "人のかまえ",
                "prev": "器用+40-1",
                "maxLevel": 5,
                "maxSkillName": "共人一体",
                "position": "left",
                "hash": "10-6"
            },
            "虎砲": {
                "name": "虎砲",
                "prev": "MP+40-1",
                "maxLevel": 5,
                "maxSkillName": "猛虎砲",
                "position": "bottom",
                "hash": "10-7"
            },
            "幽隔": {
                "name": "幽隔",
                "prev": "HP+40-1",
                "maxLevel": 5,
                "maxSkillName": "世離浮虚",
                "position": "bottom",
                "hash": "10-8"
            },
            "鋼の意思": {
                "name": "鋼の意思",
                "prev": "[継承]HP+40",
                "maxLevel": 5,
                "maxSkillName": "鋼の魂",
                "position": "right",
                "hash": "10-9"
            },
            "気脈掌": {
                "name": "気脈掌",
                "prev": "気功",
                "maxLevel": 5,
                "maxSkillName": "気脈天泉掌",
                "position": "bottomright",
                "hash": "10-10"
            },
            "聖魔群狼拳": {
                "name": "聖魔群狼拳",
                "prev": "[継承]MP+40",
                "maxLevel": 5,
                "maxSkillName": "魔狼千牙拳",
                "position": "bottomleft",
                "hash": "10-11"
            },
            "玄武のかまえ": {
                "name": "玄武のかまえ",
                "prev": "器用+40-1",
                "maxLevel": 5,
                "maxSkillName": "玄武鏡鳴",
                "position": "bottomleft",
                "hash": "10-12"
            },
            "青龍のかまえ": {
                "name": "青龍のかまえ",
                "prev": "器用+40-1",
                "maxLevel": 5,
                "maxSkillName": "青龍鏡鳴",
                "position": "bottom",
                "hash": "10-13"
            },
            "朱雀のかまえ": {
                "name": "朱雀のかまえ",
                "prev": "器用+40-1",
                "maxLevel": 5,
                "maxSkillName": "朱雀鏡鳴",
                "position": "bottomright",
                "hash": "10-14"
            },
            "[継承]HP+40": {
                "name": "[継承]HP+40",
                "prev": "幽隔",
                "maxLevel": 1,
                "maxSkillName": null,
                "position": "bottom",
                "hash": "10-15"
            },
            "[継承]MP+40": {
                "name": "[継承]MP+40",
                "prev": "虎砲",
                "maxLevel": 1,
                "maxSkillName": null,
                "position": "bottomleft",
                "hash": "10-16"
            },
            "[継承]精神+40": {
                "name": "[継承]精神+40",
                "prev": "気脈掌",
                "maxLevel": 1,
                "maxSkillName": null,
                "position": "bottom",
                "hash": "10-17"
            },
            "[継承]状態異常耐性+5": {
                "name": "[継承]状態異常耐性+5",
                "prev": "鋼の意思",
                "maxLevel": 1,
                "maxSkillName": null,
                "position": "top",
                "hash": "10-18"
            },
            "精神+40-1": {
                "name": "精神+40",
                "prev": "瞑想",
                "maxLevel": 1,
                "maxSkillName": null,
                "position": "top",
                "hash": "10-19"
            },
            "速さ+40-1": {
                "name": "速さ+40",
                "prev": null,
                "maxLevel": 1,
                "maxSkillName": null,
                "position": "bottomleft",
                "hash": "10-20"
            },
            "器用+40-1": {
                "name": "器用+40",
                "prev": "速さ+40-1",
                "maxLevel": 1,
                "maxSkillName": null,
                "position": "bottomleft",
                "hash": "10-21"
            },
            "MP+40-1": {
                "name": "MP+40",
                "prev": "攻撃力+40-1",
                "maxLevel": 1,
                "maxSkillName": null,
                "position": "right",
                "hash": "10-22"
            },
            "HP+40-1": {
                "name": "HP+40",
                "prev": "速さ+40-1",
                "maxLevel": 1,
                "maxSkillName": null,
                "position": "bottomright",
                "hash": "10-23"
            },
            "攻撃力+40-1": {
                "name": "攻撃力+40",
                "prev": "鉄拳",
                "maxLevel": 1,
                "maxSkillName": null,
                "position": "bottomright",
                "hash": "10-24"
            }
        }
    }
} as { [job: string]: SkillTree }