import Chance from 'chance';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import customParseFormat from 'dayjs/plugin/customParseFormat'
import 'dayjs/locale/ja';
import JobData from '../../JobData';


dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(customParseFormat);
dayjs.tz.setDefault('Asia/Tokyo');
dayjs.locale('ja');

export const getPersonalFortuneResult = (id: string): Result => {
    const seedDate = dayjs().format("YYYY-MM-DD");
    const chance = new Chance(seedDate + id);

    const randomLuck = (type: ResultType) => {
        const rank = chance.weighted(Array.from(resultRanks), [25, 25, 25, 25]);

        return {
            rank,
            text: chance.pickone(resultTexts[type][rank]),
            score: rank,
        }
    }

    const ドロップ運 = randomLuck("ドロップ運");
    const クリティカル運 = randomLuck("クリティカル運");
    const 狩場運 = randomLuck("狩場運");

    return {
        name: id,
        totalScore: ドロップ運.score + クリティカル運.score + 狩場運.score,
        ドロップ運,
        クリティカル運,
        狩場運
    }
}



export const getJobsFortuneResults = (): Result[] => {
    const seedDate = dayjs().format("YYYY-MM-DD");
    const jobsRank = getJobsFortuneRank();

    const chance = new Chance(seedDate)
    const shuffledResultTexts = Object.fromEntries(Object.entries(resultTexts).map(([key, value]) => {
        return [key, Object.fromEntries(Object.entries(value).map(([key2, value2]) => {
            return [key2, chance.shuffle(value2)]
        }))]
    }))

    return jobsRank.map((jobRank, i) => {
        const totalScore = resultTypes.reduce((p, c) => p + jobRank[c], 0);

        return {
            ...jobRank,
            totalScore,
            "ドロップ運": {
                rank: jobRank.ドロップ運,
                text: shuffledResultTexts["ドロップ運"][jobRank.ドロップ運][i],
                score: jobRank.ドロップ運,
            },
            "クリティカル運": {
                rank: jobRank.クリティカル運,
                text: shuffledResultTexts["クリティカル運"][jobRank.クリティカル運][i],
                score: jobRank.クリティカル運,
            },
            "狩場運": {
                rank: jobRank.狩場運,
                text: shuffledResultTexts["狩場運"][jobRank.狩場運][i],
                score: jobRank.狩場運,
            }
        }
    })
}


const getJobsFortuneRank = (): ({ name: string } & { [type in ResultType]: ResultRank })[] => {
    const seed = dayjs().format("YYYY-MM-DD");
    const chance = new Chance(seed);

    const ranks: { [job: string]: { [type in ResultType]: ResultRank } } = {}

    JobData.forEach(job => {
        ranks[job.name] = {
            "ドロップ運": chance.weighted(Array.from(resultRanks), [25, 25, 25, 25]),
            "クリティカル運": chance.weighted(Array.from(resultRanks), [25, 25, 25, 25]),
            "狩場運": chance.weighted(Array.from(resultRanks), [25, 25, 25, 25])
        };
    });

    return Object.entries(ranks).map(([jobName, v]) => {
        return {
            name: jobName,
            ...v,
        }
    });
}

export const resultTypes = ["ドロップ運", "クリティカル運", "狩場運"] as const;
type ResultType = typeof resultTypes[number];

const resultRanks = [1, 2, 3, 4] as const;
type ResultRank = typeof resultRanks[number];

export type Result = {
    name: string
    totalScore: number
} & {
        [type in ResultType]: {
            rank: ResultRank,
            text: string,
            score: number
        }
    }

type ResultTexts = { [type in ResultType]: { [rank in ResultRank]: string[] } };


const combine = (array1: string[], array2: string[]): string[] => {
    return ([] as string[]).concat(...array1.map((seq1) => {
        return array2.map((seq2) => seq1 + " " + seq2)
    }))
}





const resultTexts: ResultTexts = {
    ドロップ運: {
        1: combine(
            [
                "残念ながらアイテムが手に入りにくいかも…",
                "アイテムが手に入る確率が低いかも…",
                "今日はドロップしにくいかも…",
            ],
            [
                "レベル上げに専念した方がいいかも？",
                "諦めずに敵を倒しているといい事があるかも？",
                "根気よく敵を倒していると思わぬドロップがあるかも？",
                "クエストを進めてみるのもいいかも？",
                "今日は諦めて綺麗な景色を探してみてもいいかも？",
            ],
        ),
        2: combine(
            [
                "ドロップ率は悪くなさそう、",
                "アイテムが手に入る確率はそこそこ、",
                "今日はいつも通りのドロップ率、",
            ],
            [
                "地道にコツコツと集めるといいかも？",
                "諦めずに挑めば装備が落ちるかも？",
                "根気よく敵を倒せば装備も落ちて稼ぎがアップするかも？",
                "時々大きい石がドロップするかも？",
                "いつもの狩場が良いかも？",
            ],
        ),
        3: combine(
            [
                "今日はドロップ率が少し良いかも、",
                "アイテムがいつもより手に入りやすいかも、",
                "今日はいつもよりドロップしやすいかも、",
            ],
            [
                "1つ上の狩場に行っても良いかも？",
                "タワーに挑んでみるのもあり？",
                "PTを組んで良い石が落ちる狩場に行っても良いかも？",
                "いつもより長く狩りをしても良いかも？",
                "いつもより稼げる気がする 知らんけど…",
            ],
        ),
        4: combine(
            [
                "今日はじゃんじゃんドロップするかも、",
                "アイテムが手に入りやすそう、",
                "アイテムがどんどん手に入りそう、",
            ],
            [
                "SR武器が落ちる気がする  知らんけど…",
                "タワーに挑んでみるのもあり？",
                "PTを組んで良い石が落ちる狩場に行っても良いかも？",
                "いつもより長く狩りをしても良いかも？",
                "いつもより稼げる気がする 知らんけど…",
            ],
        )
    },
    クリティカル運: {
        1: combine(
            [
                "クリティカルは出にくそう…",
                "クリティカルはあまり期待できない、",
                "クリティカルに頼るのはやめた方がよさそう…",
            ],
            [
                "敵を倒すのにいつもより時間かかるかも？",
                "いつもの狩場でのんびり狩るのが良いかも？",
                "PTを組んで狩りをすることで効率が良くなるかも？",
                "根気よく攻撃していればいつかは倒せます！",
                "狩りは諦めてクエストを進めてみても良いかも？",
            ],
        ),
        2: combine(
            [
                "クリティカル率は悪くなさそう、",
                "クリティカルはそこそこでそう、",
                "いつも通りのクリティカル率、",
            ],
            [
                "今日は狩りではなく綺麗な景色を探してみても良いかも？",
                "いつもの狩場でのんびり狩るのが良いかも？",
                "PTを組んで狩りをすることで効率が良くなるかも？",
                "根気よく攻撃していればいつかは倒せます！",
                "今日は狩りではなくクエストを進めてみても良いかも？",
            ],
        ),
        3: combine(
            [
                "クリティカル率は少し良さそう、",
                "クリティカルがいつもより出そう、",
                "いつもより良いクリティカル率、",
            ],
            [
                "ワンランク上の狩場に挑戦してみても良いかも？",
                "いつもより効率よく狩りができるかも？",
                "PTを組むとみんなを助けてあげられるかも？",
                "いつもより敵が多く倒せるかも？",
                "倒せなかった敵も倒せるかも？",
            ],
        ),
        4: combine(
            [
                "クリティカル率はとても良さそう、",
                "クリティカルがじゃんじゃん出そう、",
                "類をみないクリティカル率、",
            ],
            [
                "タワーのドラゴンも余裕で倒せるかも？ 知らんけど…",
                "さくさく狩りができるかも？",
                "PTを組むとみんなのヒーローに！？",
                "今がレベル上げのチャンスかも！？",
                "5連続でクリティカルが出るかも？ 知らんけど…",
            ],
        ),
    },
    "狩場運": {
        1: combine(
            [
                "狩場運は良くなさそう…",
                "今日はついてなさそう…",
                "今日は狩場運が悪いかも…",
            ],
            [
                "BOTがいっぱいでスムーズに狩りができないかも？",
                "横取りされてストレスを感じるかも？",
                "のんびり狩りをするのが良いかも",
                "今日は諦めてクエストを進めてみるのもいいかも？",
                "今日は諦めて綺麗な景色を探してみてもいいかも？",
            ],
        ),       
        2: combine(
            [
                "狩場運は悪くなさそう、",
                "狩場運はそこそこ、",
                "今日はいつも通りにの狩場運、",
            ],
            [
                "今日も狩りを頑張ろう！！",
                "PT組んでやってみるのも良いかも！？",
                "のんびり狩りをするのが良いかも",
                "今日も金策頑張ろう！！",
                "新しい狩場を探すのも良いかも？",
            ],
        ),
        3: combine(
            [
                "今日は狩場運が少し良さそう、",
                "狩場がいつもより空いてそう、",
                "今日はいつもより狩場が空いてそう、",
            ],
            [
                "いつもは混んでいる狩場に行ってみても良いかも？",
                "今日はレベル上げのチャンスかも？",
                "今日は金策のチャンスかも？",
                "いつもより長く狩りをしても良いかも？",
                "今日は快適な狩りができそう！",
            ],
        ),    
        4: combine(
            [
                "今日は狩場運がとても良さそう、",
                "狩場がガラガラかも、",
                "狩場運は絶好調、",
            ],
            [
                "いつもは混んでいる狩場に行ってみても良いかも？",
                "今日がレベル上げのチャンスかも？",
                "今日が金策のチャンスかも？",
                "自分にあった狩場がみつかるかも",
                "今日は快適な狩りができそう！",
            ],
        ),
    },
}