export type SkillTreePreset = {
    title: string
    url: string
    author: string
    authorTwitter: string
    comment: string
    inheritedSkills: string[],
    tags: string[]
}
 
export default {
    "ファイター": [
        {
            title: "スキルプリセット",
            url: "https://ignis-tools.vercel.app/skill?job=%E3%83%95%E3%82%A1%E3%82%A4%E3%82%BF%E3%83%BC&skills=1-1*3_1-4*4_1-12*4",
            author: "ヨンヨン",
            authorTwitter: "https://twitter.com/44genso",
            comment: "スキルプリセット\nスキルプリセット\nスキルプリセット",
            inheritedSkills: ["城壁の陣"],
            tags: ["ドラゴンタワー中級", "狩り用"]   
        }
    ],
} as { [job: string]: SkillTreePreset[] }