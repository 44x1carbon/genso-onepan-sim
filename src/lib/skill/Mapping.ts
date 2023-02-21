import type { Skill, SkillTree } from "../../SkillTreeData";

export const mapping = (skillTree: SkillTree): (Skill | "center" | null)[][] => {
    const size = 50;
    const initMap: (Skill | "center" | null)[][] = [];
    for (let i = 0; i < size; i++) {
        initMap[i] = [];
        for (let j = 0; j < size; j++) {
            initMap[i][j] = null;
        }
    }

    const put = (prevId: (string | null), x: number, y: number) => {

        const putSkills = Object.entries(skillTree.skills).filter(([_, skill]) => skill.prev === prevId);
        if (putSkills.length === 0) return;

        putSkills.forEach(([id, skill]) => {
            switch (skill.position) {
                case "top": {
                    if (initMap[y - 1][x] !== null) {
                        console.log(`${initMap[y - 1][x].name}と${skill.name}が被っています`)
                    }
                    initMap[y - 1][x] = {
                        id,
                        ...skill
                    };
                    put(id, x, y - 1);
                    break;
                }
                case "bottom": {
                    if (initMap[y + 1][x] !== null) {
                        console.log(`${initMap[y + 1][x].name}と${skill.name}が被っています`)
                    }
                    initMap[y + 1][x] = {
                        id,
                        ...skill
                    };
                    put(id, x, y + 1);
                    break;
                }
                case "left": {
                    if (initMap[y][x - 1] !== null) {
                        console.log(`${initMap[y][x - 1].name}と${skill.name}が被っています`)
                    }
                    initMap[y][x - 1] = {
                        id,
                        ...skill
                    };
                    put(id, x - 1, y);
                    break;
                }
                case "right": {
                    if (initMap[y][x + 1] !== null) {
                        console.log(`${initMap[y][x + 1].name}と${skill.name} が被っています`)
                    }
                    initMap[y][x + 1] = {
                        id,
                        ...skill
                    };
                    put(id, x + 1, y);
                    break;
                }
                case "topright": {
                    if (initMap[y - 1][x + 1] !== null) {
                        console.log(`${initMap[y - 1][x + 1].name}と${skill.name} が被っています`)
                    }
                    initMap[y - 1][x + 1] = {
                        id,
                        ...skill
                    };
                    put(id, x + 1, y - 1);
                    break;
                }
                case "topleft": {
                    if (initMap[y - 1][x - 1] !== null) {
                        console.log(`${initMap[y - 1][x - 1].name}と${skill.name} が被っています`)
                    }
                    initMap[y - 1][x - 1] = {
                        id,
                        ...skill
                    };
                    put(id, x - 1, y - 1);
                    break;
                }
                case "bottomright": {
                    if (initMap[y + 1][x + 1] !== null) {
                        console.log(`${initMap[y + 1][x + 1].name}と${skill.name} が被っています`)
                    }
                    initMap[y + 1][x + 1] = {
                        id,
                        ...skill
                    };
                    put(id, x + 1, y + 1);
                    break;
                }
                case "bottomleft": {
                    if (initMap[y + 1][x - 1] !== null) {
                        console.log(`${initMap[y + 1][x - 1].name}と${skill.name} が被っています`)
                    }
                    initMap[y + 1][x - 1] = {
                        id,
                        ...skill
                    };
                    put(id, x - 1, y + 1);
                    break;
                }
            }
        })
    }

    initMap[Math.floor(size / 2)][Math.floor(size / 2)] = "center";
    put(null, Math.floor(size / 2), Math.floor(size / 2));

    let top = 0;
    let bottom = 0;
    let left = 0;
    let right = 0;

    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            if (initMap[i][j] !== null) {
                if (top === 0) {
                    top = i;
                }

                if (bottom < i) {
                    bottom = i;
                }

                if (left === 0 || left > j) {
                    left = j;
                }

                if (right < j) {
                    right = j;
                }
            }
        }
    }

    // console.log(left, top, right, bottom)
    const yLength = bottom - top + 1;
    const xLength = right - left + 1;

    const map: (Skill | "center" | null)[][] = [];
    for (let i = 0; i < yLength; i++) {
        map[i] = [];
        for (let j = 0; j < xLength; j++) {
            map[i][j] = initMap[i + top][j + left];
        }
    }

    return map;
}