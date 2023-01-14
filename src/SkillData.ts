export type Skill = {
    name: string,
    job: string,
    pending?: SkillLevel[],
    lv: {
        [lv in SkillLevel]: Attack[]
    }
}

export type SkillLevel = 1 | 2 | 3 | 4 | 5;

export type Attack = { power: number, type: string, element: string, condition?: (context: any) => boolean }

const jobs = [
    'ファイター',
    'シーフ',
    'クレリック',
    'ウィザード',
    'ガーディアン',
    'マジックナイト',
    'ビショップ',
    'モンク',
    'アサシン',
    'ウォーロック'
];

export default [
    ...jobs.map(job => {
        return {
            name: "通常攻撃",
            job,
            lv: {
                1: [{ power: 100, type: "physics", element: "empty" }],
                2: [{ power: 100, type: "physics", element: "empty" }],
                3: [{ power: 100, type: "physics", element: "empty" }],
                4: [{ power: 100, type: "physics", element: "empty" }],
                5: [{ power: 100, type: "physics", element: "empty" }],
            }
        }
    }),
    {
        name: "スラッシュ",
        job: "ファイター",
        lv: {
            1: [...new Array(2).fill({ power: 50, type: "physics", element: "empty" })],
            2: [...new Array(2).fill({ power: 70, type: "physics", element: "empty" })],
            3: [...new Array(2).fill({ power: 80, type: "physics", element: "empty" })],
            4: [...new Array(2).fill({ power: 100, type: "physics", element: "empty" })],
            5: [...new Array(3).fill({ power: 90, type: "physics", element: "wind" })],
        }
    },
    {
        name: "破気撃",
        job: "ファイター",
        lv: {
            1: [{ power: 130, type: "physics", element: "devil" }],
            2: [{ power: 160, type: "physics", element: "devil" }],
            3: [{ power: 160, type: "physics", element: "devil" }],
            4: [{ power: 190, type: "physics", element: "devil" }],
            5: [{ power: 200, type: "physics", element: "devil" }, { power: 400, type: "physics", element: "devil", condition: (context: any) => context.isCheck1 }],
        }
    },
    {
        name: "なぎ払い",
        job: "ファイター",
        lv: {
            1: [{ power: 150, type: "physics", element: "empty" }],
            2: [{ power: 190, type: "physics", element: "empty" }],
            3: [{ power: 230, type: "physics", element: "empty" }],
            4: [{ power: 270, type: "physics", element: "empty" }],
            5: [{ power: 290, type: "physics", element: "empty" }],
        }
    },
    {
        name: "練気斬",
        job: "ファイター",
        lv: {
            1: [{ power: 200, type: "physics", element: "devil" }],
            2: [{ power: 230, type: "physics", element: "devil" }],
            3: [{ power: 250, type: "physics", element: "devil" }],
            4: [{ power: 300, type: "physics", element: "devil" }],
            5: [{ power: 300, type: "physics", element: "devil" }, { power: 300, type: "magic", element: "devil" }],
        }
    },
    {
        name: "ファイア",
        job: "ウィザード",
        lv: {
            1: [{ power: 113, type: "magic", element: "fire" }],
            2: [{ power: 139, type: "magic", element: "fire" }],
            3: [{ power: 171, type: "magic", element: "fire" }],
            4: [{ power: 210, type: "magic", element: "fire" }],
            5: [{ power: 258, type: "magic", element: "fire" }, { power: 258, type: "magic", element: "fire", condition: (context: any) => context.isCheck1 }],
        }
    },
    {
        name: "サンダー",
        job: "ウィザード",
        lv: {
            1: [{ power: 208, type: "magic", element: "wind" }],
            2: [{ power: 252, type: "magic", element: "wind" }],
            3: [{ power: 305, type: "magic", element: "wind" }],
            4: [{ power: 369, type: "magic", element: "wind" }],
            5: [{ power: 446, type: "magic", element: "wind" }],
        }
    },
    {
        name: "フロスト",
        job: "ウィザード",
        lv: {
            1: [{ power: 315, type: "magic", element: "water" }],
            2: [{ power: 381, type: "magic", element: "water" }],
            3: [{ power: 461, type: "magic", element: "water" }],
            4: [{ power: 558, type: "magic", element: "water" }],
            5: [{ power: 675, type: "magic", element: "water" }],
        }
    },
    {
        name: "ファイアボルト",
        job: "ウィザード",
        lv: {
            1: [{ power: 540, type: "magic", element: "fire" }],
            2: [{ power: 653, type: "magic", element: "fire" }],
            3: [{ power: 790, type: "magic", element: "fire" }],
            4: [{ power: 956, type: "magic", element: "fire" }],
            5: [{ power: 1129, type: "magic", element: "fire" }, ...new Array(2).fill({ power: 1129, type: "magic", element: "fire", condition: (context: any) => context.isCheck1 })],
        }
    },
    {
        name: "サンダーブラスト",
        job: "ウィザード",
        lv: {
            1: [{ power: 648, type: "magic", element: "wind" }],
            2: [{ power: 778, type: "magic", element: "wind" }],
            3: [{ power: 934, type: "magic", element: "wind" }],
            4: [{ power: 1121, type: "magic", element: "wind" }],
            5: [{ power: 1256, type: "magic", element: "wind" }],
        }
    },
    {
        name: "フロストストライク",
        job: "ウィザード",
        lv: {
            1: [{ power: 765, type: "magic", element: "water" }],
            2: [{ power: 918, type: "magic", element: "water" }],
            3: [{ power: 1102, type: "magic", element: "water" }],
            4: [{ power: 1322, type: "magic", element: "water" }],
            5: [{ power: 793, type: "magic", element: "water" }, { power: 793, type: "magic", element: "ground" }],
        }
    },
    {
        name: "ポイズン",
        job: "ウィザード",
        pending: [5],
        lv: {
            1: [...new Array(6).fill({ power: 24, type: "magic", element: "ground" })],
            2: [...new Array(8).fill({ power: 30, type: "magic", element: "ground" })],
            3: [...new Array(10).fill({ power: 37, type: "magic", element: "ground" })],
            4: [...new Array(12).fill({ power: 46, type: "magic", element: "ground" })],
            5: [...new Array(3).fill({ power: 46, type: "magic", element: "ground" })], // TODO 現在のHPを1%分減少させる効果を3回発生させる
        }
    },
    {
        name: "ブリザード",
        job: "ウィザード",
        lv: {
            1: [{ power: 393, type: "magic", element: "water" }],
            2: [{ power: 550, type: "magic", element: "water" }],
            3: [{ power: 770, type: "magic", element: "water" }],
            4: [{ power: 1078, type: "magic", element: "water" }],
            5: [{ power: 1509, type: "magic", element: "water" }, { power: 679, type: "magic", element: "ground" }],
        }
    },
    {
        name: "エクスプロージョン",
        job: "ウィザード",
        pending: [5],
        lv: {
            1: [{ power: 615, type: "magic", element: "fire" }, ...new Array(3).fill({ power: 128, type: "magic", element: "fire" })],
            2: [{ power: 861, type: "magic", element: "fire" }, ...new Array(3).fill({ power: 154, type: "magic", element: "fire" })],
            3: [{ power: 1205, type: "magic", element: "fire" }, ...new Array(4).fill({ power: 154, type: "magic", element: "fire" })],
            4: [{ power: 1687, type: "magic", element: "fire" }, ...new Array(5).fill({ power: 185, type: "magic", element: "fire" })],
            5: [{ power: 2362, type: "magic", element: "fire" }, ...new Array(5).fill({ power: 0, type: "magic", element: "fire" })], // TODO 現在のHPの1%分を減らす効果が5回発生する
        }
    },
    {
        name: "サンダーストーム",
        job: "ウィザード",
        lv: {
            1: [...new Array(4).fill({ power: 610, type: "magic", element: "wind" })],
            2: [...new Array(4).fill({ power: 815, type: "magic", element: "wind" })],
            3: [...new Array(4).fill({ power: 1194, type: "magic", element: "wind" })],
            4: [...new Array(4).fill({ power: 1742, type: "magic", element: "wind" })],
            5: [...new Array(10).fill({ power: 1768, type: "magic", element: "wind" })],
        }
    },
    {
        name: "影歩撃",
        job: "シーフ",
        lv: {
            1: [{ power: 126, type: "physics", element: "dark" }],
            2: [{ power: 150, type: "physics", element: "dark" }],
            3: [{ power: 150, type: "physics", element: "dark" }],
            4: [{ power: 180, type: "physics", element: "dark" }],
            5: [{ power: 200, type: "physics", element: "dark" }],
        }
    },
    {
        name: "急所攻撃",
        job: "シーフ",
        lv: {
            1: [...new Array(3).fill({ power: 100, type: "physics", element: "empty" })],
            2: [...new Array(3).fill({ power: 110, type: "physics", element: "empty" })],
            3: [...new Array(3).fill({ power: 110, type: "physics", element: "empty" })],
            4: [...new Array(3).fill({ power: 120, type: "physics", element: "empty" })],
            5: [...new Array(3).fill({ power: 250, type: "physics", element: "empty" })],
        }
    },
    {
        name: "影当身",
        job: "シーフ",
        lv: {
            1: [{ power: 150, type: "physics", element: "empty" }],
            2: [{ power: 175, type: "physics", element: "empty" }],
            3: [{ power: 200, type: "physics", element: "empty" }],
            4: [{ power: 225, type: "physics", element: "empty" }],
            5: [{ power: 250, type: "physics", element: "empty" }],
        }
    },
    {
        name: "魔封撃",
        job: "シーフ",
        lv: {
            1: [{ power: 180, type: "physics", element: "empty" }],
            2: [{ power: 220, type: "physics", element: "empty" }],
            3: [{ power: 260, type: "physics", element: "empty" }],
            4: [{ power: 300, type: "physics", element: "empty" }],
            5: [{ power: 350, type: "physics", element: "empty" }],
        }
    },
    {
        name: "足がらみ",
        job: "シーフ",
        lv: {
            1: [{ power: 150, type: "physics", element: "devil" }],
            2: [{ power: 200, type: "physics", element: "devil" }],
            3: [{ power: 250, type: "physics", element: "devil" }],
            4: [{ power: 300, type: "physics", element: "devil" }],
            5: [{ power: 300, type: "physics", element: "devil" }],
        }
    },
    {
        name: "フェイントアタック",
        job: "シーフ",
        lv: {
            1: [...new Array(2).fill({ power: 100, type: "physics", element: "empty" })],
            2: [...new Array(2).fill({ power: 115, type: "physics", element: "empty" })],
            3: [...new Array(2).fill({ power: 115, type: "physics", element: "empty" })],
            4: [...new Array(2).fill({ power: 130, type: "physics", element: "empty" })],
            5: [...new Array(2).fill({ power: 200, type: "physics", element: "empty" })],
        }
    },
    {
        name: "ホーリーブロウ",
        job: "クレリック",
        lv: {
            1: [{ power: 100, type: "magic", element: "shine" }, { power: 100, type: "physics", element: "shine" }],
            2: [{ power: 125, type: "magic", element: "shine" }, { power: 125, type: "physics", element: "shine" }],
            3: [{ power: 150, type: "magic", element: "shine" }, { power: 150, type: "physics", element: "shine" }],
            4: [{ power: 175, type: "magic", element: "shine" }, { power: 175, type: "physics", element: "shine" }],
            5: [{ power: 180, type: "magic", element: "shine" }, { power: 180, type: "physics", element: "shine" }],
        }
    },
    {
        name: "ホーリースマイト",
        job: "クレリック",
        lv: {
            1: [{ power: 190, type: "magic", element: "shine" }, { power: 150, type: "physics", element: "shine" }],
            2: [{ power: 215, type: "magic", element: "shine" }, { power: 175, type: "physics", element: "shine" }],
            3: [{ power: 230, type: "magic", element: "shine" }, { power: 200, type: "physics", element: "shine" }],
            4: [{ power: 255, type: "magic", element: "shine" }, { power: 225, type: "physics", element: "shine" }],
            5: [{ power: 400, type: "physics", element: "shine" }],
        }
    },
    {
        name: "エンゼルフロウ",
        job: "クレリック",
        lv: {
            1: [{ power: 100, type: "magic", element: "shine" }],
            2: [{ power: 123, type: "magic", element: "shine" }],
            3: [{ power: 151, type: "magic", element: "shine" }],
            4: [{ power: 186, type: "magic", element: "shine" }],
            5: [...new Array(3).fill({ power: 100, type: "magic", element: "shine" })],
        }
    },
    {
        name: "突撃",
        job: "ガーディアン",
        pending: [5],
        lv: {
            1: [{ power: 100, type: "physics", element: "empty" }],
            2: [{ power: 130, type: "physics", element: "empty" }],
            3: [{ power: 130, type: "physics", element: "empty" }],
            4: [{ power: 160, type: "physics", element: "empty" }],
            5: [{ power: 200, type: "physics", element: "empty" }], // TODO 防御力を参照する必要あり
        }
    },
    {
        name: "ランサーニードル",
        job: "ガーディアン",
        pending: [5],
        lv: {
            1: [{ power: 100, type: "physics", element: "empty" }],
            2: [{ power: 120, type: "physics", element: "empty" }],
            3: [{ power: 140, type: "physics", element: "empty" }],
            4: [{ power: 160, type: "physics", element: "empty" }],
            5: [{ power: 200, type: "physics", element: "empty" }], // TODO 同時に対象の現在のHPの1%を失わせる
        }
    },
    {
        name: "パイルバンカー",
        job: "ガーディアン",
        lv: {
            1: [{ power: 150, type: "physics", element: "empty" }],
            2: [{ power: 200, type: "physics", element: "empty" }],
            3: [{ power: 200, type: "physics", element: "empty" }],
            4: [{ power: 250, type: "physics", element: "empty" }],
            5: [{ power: 250, type: "physics", element: "empty" }],
        }
    },
    {
        name: "パイルスラスト",
        job: "ガーディアン",
        pending: [5],
        lv: {
            1: [{ power: 200, type: "physics", element: "empty" }],
            2: [{ power: 270, type: "physics", element: "empty" }],
            3: [{ power: 270, type: "physics", element: "empty" }],
            4: [{ power: 340, type: "physics", element: "empty" }],
            5: [{ power: 450, type: "physics", element: "empty" }], // TODO 防御力を参照する必要あり
        }
    },
    {
        name: "ファイアーアロー",
        job: "マジックナイト",
        lv: {
            1: [{ power: 250, type: "magic", element: "fire" }, { power: 100, type: "physics", element: "fire" }],
            2: [{ power: 287, type: "magic", element: "fire" }, { power: 150, type: "physics", element: "fire" }],
            3: [{ power: 287, type: "magic", element: "fire" }, { power: 150, type: "physics", element: "fire" }],
            4: [{ power: 330, type: "magic", element: "fire" }, { power: 200, type: "physics", element: "fire" }],
            5: [{ power: 380, type: "magic", element: "fire" }, { power: 250, type: "physics", element: "fire" }],
        }
    },
    {
        name: "サンダーアロー",
        job: "マジックナイト",
        lv: {
            1: [{ power: 250, type: "magic", element: "wind" }, { power: 100, type: "physics", element: "wind" }],
            2: [{ power: 287, type: "magic", element: "wind" }, { power: 150, type: "physics", element: "wind" }],
            3: [{ power: 287, type: "magic", element: "wind" }, { power: 150, type: "physics", element: "wind" }],
            4: [{ power: 330, type: "magic", element: "wind" }, { power: 200, type: "physics", element: "wind" }],
            5: [{ power: 380, type: "magic", element: "wind" }, { power: 250, type: "physics", element: "wind" }],
        }
    },
    {
        name: "フロストアロー",
        job: "マジックナイト",
        lv: {
            1: [{ power: 250, type: "magic", element: "water" }, { power: 100, type: "physics", element: "water" }],
            2: [{ power: 287, type: "magic", element: "water" }, { power: 150, type: "physics", element: "water" }],
            3: [{ power: 287, type: "magic", element: "water" }, { power: 150, type: "physics", element: "water" }],
            4: [{ power: 330, type: "magic", element: "water" }, { power: 200, type: "physics", element: "water" }],
            5: [{ power: 380, type: "magic", element: "water" }, { power: 250, type: "physics", element: "water" }],
        }
    },
    {
        name: "マジックウェイブ",
        job: "マジックナイト",
        lv: {
            1: [...new Array(6).fill({ power: 32, type: "magic", element: "devil" })],
            2: [...new Array(6).fill({ power: 39, type: "magic", element: "devil" })],
            3: [...new Array(8).fill({ power: 39, type: "magic", element: "devil" })],
            4: [...new Array(8).fill({ power: 47, type: "magic", element: "devil" })],
            5: [...new Array(4).fill({ power: 102, type: "magic", element: "devil" })],
        }
    },
    {
        name: "マジックサージ",
        job: "マジックナイト",
        lv: {
            1: [...new Array(7).fill({ power: 48, type: "magic", element: "devil" })],
            2: [...new Array(7).fill({ power: 58, type: "magic", element: "devil" })],
            3: [...new Array(9).fill({ power: 58, type: "magic", element: "devil" })],
            4: [...new Array(9).fill({ power: 70, type: "magic", element: "devil" })],
            5: [...new Array(5).fill({ power: 154, type: "magic", element: "devil" })],
        }
    },
    {
        name: "マジックスラスト",
        job: "マジックナイト",
        lv: {
            1: [{ power: 330, type: "magic", element: "devil" }, { power: 200, type: "physics", element: "devil" }],
            2: [{ power: 396, type: "magic", element: "devil" }, { power: 240, type: "physics", element: "devil" }],
            3: [{ power: 396, type: "magic", element: "devil" }, { power: 240, type: "physics", element: "devil" }],
            4: [{ power: 475, type: "magic", element: "devil" }, { power: 280, type: "physics", element: "devil" }],
            5: [{ power: 250, type: "physics", element: "devil" }, { power: 250, type: "physics", element: "devil" }],
        }
    },
    {
        name: "鈍呪刺突",
        job: "マジックナイト",
        lv: {
            1: [{ power: 400, type: "magic", element: "devil" }, { power: 200, type: "physics", element: "devil" }],
            2: [{ power: 460, type: "magic", element: "devil" }, { power: 250, type: "physics", element: "devil" }],
            3: [{ power: 460, type: "magic", element: "devil" }, { power: 250, type: "physics", element: "devil" }],
            4: [{ power: 529, type: "magic", element: "devil" }, { power: 300, type: "physics", element: "devil" }],
            5: [{ power: 608, type: "magic", element: "devil" }, { power: 350, type: "physics", element: "devil" }],
        }
    },
    {
        name: "ドレイン",
        job: "ウォーロック",
        lv: {
            1: [{ power: 175, type: "magic", element: "devil" }],
            2: [{ power: 210, type: "magic", element: "devil" }],
            3: [{ power: 210, type: "magic", element: "devil" }],
            4: [{ power: 252, type: "magic", element: "devil" }],
            5: [{ power: 302, type: "magic", element: "devil" }],
        }
    },
    {
        name: "アイスブレス",
        job: "ウォーロック",
        lv: {
            1: [...new Array(6).fill({ power: 42, type: "magic", element: "water" })],
            2: [...new Array(6).fill({ power: 51, type: "magic", element: "water" })],
            3: [...new Array(8).fill({ power: 51, type: "magic", element: "water" })],
            4: [...new Array(8).fill({ power: 62, type: "magic", element: "water" })],
            5: [...new Array(8).fill({ power: 67, type: "magic", element: "water" })],
        }
    },
    {
        name: "メガドレイン",
        job: "ウォーロック",
        lv: {
            1: [{ power: 320, type: "magic", element: "devil" }],
            2: [{ power: 384, type: "magic", element: "devil" }],
            3: [{ power: 384, type: "magic", element: "devil" }],
            4: [{ power: 461, type: "magic", element: "devil" }],
            5: [{ power: 1015, type: "magic", element: "devil" }],
        }
    },
    {
        name: "アイスブレイズ",
        job: "ウォーロック",
        lv: {
            1: [...new Array(7).fill({ power: 80, type: "magic", element: "water" })],
            2: [...new Array(7).fill({ power: 96, type: "magic", element: "water" })],
            3: [...new Array(9).fill({ power: 96, type: "magic", element: "water" })],
            4: [...new Array(9).fill({ power: 116, type: "magic", element: "water" })],
            5: [...new Array(5).fill({ power: 140, type: "magic", element: "water" }), ...new Array(5).fill({ power: 120, type: "physics", element: "water" })],
        }
    },
    {
        name: "サンダーブレイク",
        job: "ウォーロック",
        lv: {
            1: [{ power: 340, type: "magic", element: "wind" }],
            2: [{ power: 340, type: "magic", element: "wind" }],
            3: [{ power: 415, type: "magic", element: "wind" }],
            4: [{ power: 415, type: "magic", element: "wind" }],
            5: [...new Array(2).fill({ power: 498, type: "magic", element: "wind" })],
        }
    },
    {
        name: "ギガドレイン",
        job: "ウォーロック",
        lv: {
            1: [{ power: 530, type: "magic", element: "devil" }],
            2: [{ power: 636, type: "magic", element: "devil" }],
            3: [{ power: 636, type: "magic", element: "devil" }],
            4: [{ power: 764, type: "magic", element: "devil" }],
            5: [{ power: 917, type: "magic", element: "devil" }],
        }
    },
    {
        name: "黒猫の呪い",
        job: "ウォーロック",
        lv: {
            1: [...new Array(8).fill({ power: 99, type: "magic", element: "devil" })],
            2: [...new Array(8).fill({ power: 119, type: "magic", element: "devil" })],
            3: [...new Array(8).fill({ power: 119, type: "magic", element: "devil" })],
            4: [...new Array(8).fill({ power: 143, type: "magic", element: "devil" })],
            5: [...new Array(10).fill({ power: 172, type: "magic", element: "devil" })],
        }
    },
    {
        name: "毒手",
        job: "アサシン",
        pending: [5],
        lv: {
            1: [...new Array(7).fill({ power: 13, type: "magic", element: "ground" })],
            2: [...new Array(7).fill({ power: 25, type: "magic", element: "ground" })],
            3: [...new Array(8).fill({ power: 37, type: "magic", element: "ground" })],
            4: [...new Array(8).fill({ power: 50, type: "magic", element: "ground" })],
            5: [{ power: 172, type: "magic", element: "devil" }], // TODO 現在のHPの10%のダメージを即座に与える
        }
    },
    {
        name: "黒龍閃",
        job: "アサシン",
        pending: [1, 2, 3, 4, 5],
        lv: {
            1: [...new Array(2).fill({ power: 200, type: "magic", element: "dark" })], // TODO 隠密状態で使うと追加のダメージを与える
            2: [...new Array(2).fill({ power: 240, type: "magic", element: "dark" })], // TODO 隠密状態で使うと追加のダメージを与える
            3: [...new Array(2).fill({ power: 240, type: "magic", element: "dark" })], // TODO 隠密状態で使うと追加のダメージを与える
            4: [...new Array(2).fill({ power: 288, type: "magic", element: "dark" })], // TODO 隠密状態で使うと追加のダメージを与える
            5: [...new Array(2).fill({ power: 170, type: "physics", element: "dark" })], // TODO 隠密状態で使うと追加のダメージを与える
        }
    },
    {
        name: "吹き矢",
        job: "アサシン",
        pending: [5],
        lv: {
            1: [{ power: 50, type: "physics", element: "empty" }],
            2: [{ power: 50, type: "physics", element: "empty" }],
            3: [{ power: 100, type: "physics", element: "empty" }],
            4: [{ power: 100, type: "physics", element: "empty" }],
            5: [{ power: 200, type: "physics", element: "empty" }], // TODO 現在のHPの10%のダメージを即座に与える毒に侵す
        }
    },
    {
        name: "黒龍滅波",
        job: "アサシン",
        pending: [1, 2, 3, 4, 5],
        lv: {
            1: [...new Array(3).fill({ power: 250, type: "magic", element: "dark" })], // TODO 隠密状態で使うと追加のダメージを与える
            2: [...new Array(3).fill({ power: 300, type: "magic", element: "dark" })], // TODO 隠密状態で使うと追加のダメージを与える
            3: [...new Array(3).fill({ power: 300, type: "magic", element: "dark" })], // TODO 隠密状態で使うと追加のダメージを与える
            4: [...new Array(3).fill({ power: 360, type: "magic", element: "dark" })], // TODO 隠密状態で使うと追加のダメージを与える
            5: [...new Array(2).fill({ power: 400, type: "physics", element: "dark" })], // TODO 隠密状態で使うと追加のダメージを与える
        }
    },
    {
        name: "影斬り",
        job: "アサシン",
        pending: [1, 2, 3, 4, 5],
        lv: {
            1: [{ power: 120, type: "physics", element: "empty" }], // TODO 隠密状態で使うと追加のダメージを与える
            2: [{ power: 180, type: "physics", element: "empty" }], // TODO 隠密状態で使うと追加のダメージを与える
            3: [{ power: 180, type: "physics", element: "empty" }], // TODO 隠密状態で使うと追加のダメージを与える
            4: [{ power: 180, type: "physics", element: "empty" }], // TODO 隠密状態で使うと追加のダメージを与える
            5: [{ power: 200, type: "physics", element: "empty" }], // TODO 隠密状態で使うと追加のダメージを与える
        }
    },
    {
        name: "黒龍双咬斬",
        job: "アサシン",
        pending: [1, 2, 3, 4, 5],
        lv: {
            1: [...new Array(2).fill({ power: 300, type: "magic", element: "dark" }), ...new Array(2).fill({ power: 130, type: "physics", element: "dark" })], // TODO 隠密状態で使うと追加のダメージを与える
            2: [...new Array(2).fill({ power: 300, type: "magic", element: "dark" }), ...new Array(3).fill({ power: 130, type: "physics", element: "dark" })], // TODO 隠密状態で使うと追加のダメージを与える
            3: [...new Array(2).fill({ power: 300, type: "magic", element: "dark" }), ...new Array(3).fill({ power: 130, type: "physics", element: "dark" })], // TODO 隠密状態で使うと追加のダメージを与える
            4: [...new Array(3).fill({ power: 250, type: "magic", element: "dark" }), ...new Array(3).fill({ power: 130, type: "physics", element: "dark" })], // TODO 隠密状態で使うと追加のダメージを与える
            5: [...new Array(3).fill({ power: 260, type: "physics", element: "dark" }), ...new Array(3).fill({ power: 160, type: "physics", element: "dark" })], // TODO 隠密状態で使うと追加のダメージを与える
        }
    },
    {
        name: "ホーリーアロー",
        job: "ビショップ",
        lv: {
            1: [{ power: 283, type: "magic", element: "shine" }],
            2: [{ power: 340, type: "magic", element: "shine" }],
            3: [{ power: 408, type: "magic", element: "shine" }],
            4: [{ power: 490, type: "magic", element: "shine" }],
            5: [{ power: 569, type: "magic", element: "fire" }],
        }
    },
    {
        name: "ディバインアロー",
        job: "ビショップ",
        lv: {
            1: [{ power: 598, type: "magic", element: "shine" }],
            2: [{ power: 718, type: "magic", element: "shine" }],
            3: [{ power: 862, type: "magic", element: "shine" }],
            4: [{ power: 1034, type: "magic", element: "shine" }],
            5: [{ power: 1255, type: "magic", element: "dark" }],
        }
    },
    {
        name: "グリムケージ",
        job: "ビショップ",
        lv: {
            1: [{ power: 735, type: "magic", element: "shine" }],
            2: [{ power: 882, type: "magic", element: "shine" }],
            3: [{ power: 882, type: "magic", element: "shine" }],
            4: [{ power: 1059, type: "magic", element: "shine" }],
            5: [{ power: 1270, type: "magic", element: "dark" }],
        }
    },
    {
        name: "鉄拳",
        job: "モンク",
        lv: {
            1: [{ power: 190, type: "physics", element: "empty" }],
            2: [{ power: 225, type: "physics", element: "empty" }],
            3: [{ power: 225, type: "physics", element: "empty" }],
            4: [{ power: 270, type: "physics", element: "empty" }],
            5: [{ power: 160, type: "physics", element: "empty" }],
        }
    },
    {
        name: "虎砲",
        job: "モンク",
        pending: [5],
        lv: {
            1: [{ power: 196, type: "physics", element: "empty" }],
            2: [{ power: 221, type: "physics", element: "empty" }],
            3: [{ power: 249, type: "physics", element: "empty" }],
            4: [{ power: 281, type: "physics", element: "empty" }],
            5: [{ power: 315, type: "physics", element: "empty" }], // TODO 隠密状態で使うと追加のダメージを与える
        }
    },
    {
        name: "聖魔群狼拳",
        job: "モンク",
        pending: [1, 2, 3, 4, 5],
        lv: {
            1: [...new Array(9).fill({ power: 0, type: "physics", element: "devil" })], // TODO 威力不明
            2: [...new Array(9).fill({ power: 0, type: "physics", element: "devil" })], // TODO 威力不明
            3: [...new Array(9).fill({ power: 0, type: "physics", element: "devil" })], // TODO 威力不明
            4: [...new Array(11).fill({ power: 0, type: "physics", element: "devil" })], // TODO 威力不明
            5: [...new Array(11).fill({ power: 0, type: "physics", element: "devil" })], // TODO 威力不明 隠密状態で使うと追加のダメージを与える
        }
    },
] as Skill[]