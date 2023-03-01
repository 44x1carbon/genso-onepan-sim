import type Cropper from 'cropperjs';
import Konva from 'konva';
import type { Layer } from 'konva/lib/Layer';
import type { Stage } from 'konva/lib/Stage';
import SkillTreeData, { type Skill } from '../../SkillTreeData';

const skills = ([] as Skill[]).concat(...Object.values(SkillTreeData).map(({ skills }) => Object.values(skills)));

export class Canvas {
    stage: Stage
    width: number
    height: number
    layer: Layer

    constructor(id: string, backgroundImgUrl: string, debug: boolean = false) {
        const container = document.getElementById(id);
        const width = container?.clientWidth;
        if (width === undefined) {
            throw new Error(`${id}が存在しません。`);
        }

        const height = (width / 16) * 9;

        this.width = width;
        this.height = height;

        this.stage = new Konva.Stage({
            container: id,
            width: width,
            height: height,
            scaleX: width / 1280,
            scaleY: height / 720
        });

        this.setBackground(backgroundImgUrl);
        this.setBackground("/template.png");

        this.layer = new Konva.Layer();
        this.layer.add(new Konva.Rect({
            x: 715,
            y: 694,
            width: 1280 - 715,
            height: 26,
            fill: "#333"
        }));
        this.layer.add(new Konva.Text({
            x: 730,
            y: 697,
            text: "@IGNIS TOOLS：https://ignis-tools.vercel.app/",
            fontSize: 24,
            fontStyle: "bold",
            fill: "#fff"
        }));

        this.stage.add(this.layer);

        if (debug) {
            this.stage.on('click', () => {
                const pointerPos = this.stage.getPointerPosition();
                if (pointerPos) {
                    console.log(`
                        const x = ${pointerPos.x}; 
                        const y = ${pointerPos.y};
                    `);
                }
            });
        }


    }

    setBackground(backgroundImgUrl: string) {
        const layer = new Konva.Layer();
        this.stage.add(layer);

        Konva.Image.fromURL(backgroundImgUrl, (darthNode: any) => {
            darthNode.setAttrs({
                x: 0,
                y: 0,
                width: 1280,
                height: 720
            });
            layer.add(darthNode);
        });
    }

    renderCharacterName(text: string) {
        const x = 450 + 12;
        const y = 67 + 6;
        const _text = new Konva.Text({
            x,
            y,
            text,
            fontSize: 24,
            fontStyle: "bold",
            fill: "#444444"
        });

        this.layer.add(_text);
    }

    renderId(text: string) {
        const x = 450 + 14;
        const y = 140 + 14;
        const _text = new Konva.Text({
            x,
            y,
            text,
            fontSize: 24,
            fontStyle: "bold",
            fill: "#444444"
        });

        this.layer.add(_text);
    }

    renderJob(job: {
        name: string
        lv: number
    }) {
        const x = 543 + 45;
        const y = 141 + 13;
        const _text = new Konva.Text({
            x,
            y,
            text: `${job.name} Lv${job.lv}`,
            fontSize: 23,
            fontStyle: "bold",
            fill: "#444444"
        });

        this.layer.add(_text);
    }

    renderPlaystyle(text: string) {
        const x = 430 + 35;
        const y = 213 + 19;
        const _text = new Konva.Text({
            x,
            y,
            text,
            fontSize: 23,
            fontStyle: "bold",
            fill: "#444444"
        });

        this.layer.add(_text);
    }

    renderStatus(status: {
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
    }) {
        const pos = {
            hp: { x: 148 + 15, y: 285 + 21.5 },
            mp: { x: 518 + 40, y: 285 + 21.5 },
            attack: { x: 148 + 15, y: 315 + 17.5 },
            magicAttack: { x: 518 + 40, y: 315 + 17.5 },
            strength: { x: 148 + 15, y: 345 + 13 },
            brains: { x: 518 + 40, y: 345 + 13 },
            skillful: { x: 148 + 15, y: 375 + 8 },
            mind: { x: 518 + 40, y: 375 + 8 },
            difence: { x: 148 + 15, y: 375 + 35 },
            speed: { x: 518 + 40, y: 375 + 35 },
        }

        Object.entries(status).forEach(([key, value]) => {
            const x = pos[key].x;
            const y = pos[key].y;
            const _text = new Konva.Text({
                x,
                y,
                text: value?.toString(),
                fontSize: 23,
                fontStyle: "bold",
                fill: "#444444"
            });

            this.layer.add(_text);
        })

    }

    renderSkillStructure(skillStructure: { name: string, level: number }[]) {
        const x = 45 + 5;
        const y = 448 + 37;
        const width = 715;
        const height = 36;
        const _text = new Konva.Text({
            x,
            y,
            text: skillStructure.map(({ name, level }) => level === 5 ? `・${skills.find(s => s.name === name)?.maxSkillName}` : `・${name} Lv${level}`).join(" "),
            fontSize: 16,
            fontStyle: "bold",
            fill: "#444444",
            width,
            height,
            lineHeight: 1.1
        });
        // const rect = new Konva.Rect({
        //     x,
        //     y,
        //     stroke: '#555',
        //     strokeWidth: 1,
        //     fill: '#ddd',
        //     width: width,
        //     height: _text.height(),
        // });

        // this.layer.add(rect);
        this.layer.add(_text);
    }

    renderFreecomment(text: string) {
        const x = 357 + 45;
        const y = 535 + 48;
        const width = 408;
        const height = 92;
        const _text = new Konva.Text({
            x,
            y,
            text: text,
            fontSize: 23,
            fontStyle: "bold",
            fill: "#444444",
            width,
            height,
            lineHeight: 1
        });
        this.layer.add(_text);
    }

    renderBaseEquipment(equipment: {
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
        } | undefined }) {
        const pos = ["右手", "左手", "胴", "足", "頭", "背中", "肩", "指輪"];

        Object.entries(equipment).forEach(([key, e]) => {
            if (e.name !== "") {
                const index = pos.indexOf(key);
                const x = 896 + 80;
                const y = 72 + 7 + (38 * index);;
                const text = `${e.rarity.padEnd(2, " ")} ${e.name} Lv${e.level}`;
                const _text = new Konva.Text({
                    x,
                    y,
                    text: text,
                    fontSize: 15,
                    fontStyle: "bold",
                    fill: "#444444",
                });
                this.layer.add(_text);
            }
        })
    }

    renderCosplayEquipment(equipment: {
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
        } | undefined }) {
        const pos = ["右手", "左手", "胴", "足", "頭", "背中", "肩"];

        Object.entries(equipment).forEach(([key, e]) => {
            if (e.name !== "") {
                const index = pos.indexOf(key);
                const x = 896 + 80;
                const y = 394 + 32 + (38.5 * index);;
                const text = `${e.rarity.padEnd(2, " ")} ${e.name} Lv${e.level}`;
                const _text = new Konva.Text({
                    x,
                    y,
                    text: text,
                    fontSize: 15,
                    fontStyle: "bold",
                    fill: "#444444",
                });

                this.layer.add(_text);
            }
        })
    }

    renderDayOfWeek(dayOfWeekList: string[]) {
        const pos = "月火水木金土日".split("");

        pos.forEach(dayOfWeek => {
            const isInclude = dayOfWeekList.includes(dayOfWeek);
            const index = pos.indexOf(dayOfWeek);
            const x = 146 + 20 + (26 * index);
            const y = 547 + 45;
            const text = dayOfWeek;
            const _text = new Konva.Text({
                x,
                y,
                text: text,
                fontSize: 13,
                fontStyle: "bold",
                fill: isInclude ? "#fff" : "#aaa",
            });
            const rect = new Konva.Rect({
                x: x - 3.5,
                y: y - 5,
                fill: isInclude ? '#444' : '#eee',
                width: 20,
                height: 20,
                cornerRadius: 5
            });

            this.layer.add(rect);
            this.layer.add(_text);
        })
    }

    renderPlayTime(time: {
        weekday: string
        holiday: string
    }) {

        const x = 146 + 10;
        const y = 586 + 52;

        const _text = new Konva.Text({
            x,
            y,
            text: `平日：${time.weekday}\n休日：${time.holiday}`,
            fontSize: 13,
            fontStyle: "bold",
            fill: "#444",
            lineHeight: 1.2
        });
        this.layer.add(_text);
    }

    renderImg(cropper: Cropper) {
        const imageObj = new Image();
        imageObj.onload = () => {
            const image = new Konva.Image({
                x: 38,
                y: 40,
                image: imageObj,
                width: 396,
                height: 215,
            });


            this.layer.add(image);
        };
        imageObj.src = cropper.getCroppedCanvas().toDataURL();
    }

    toDataURL() {
        return this.stage.toDataURL({
            width: this.width,
            height: this.height,
        });
    }
}