import type Cropper from 'cropperjs';
import Konva from 'konva';
import type { Layer } from 'konva/lib/Layer';
import type { Stage } from 'konva/lib/Stage';


export class FriendCanvas {
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
        this.setBackground("/template2.png");

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
        const x = 50;
        const y = 73;
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
        const x = 50;
        const y = 154;
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
        const x = 170;
        const y = 154;
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
        const x = 50;
        const y = 232;
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


    renderFreecomment(text: string) {
        const x = 50;
        const y = 575;
        const width = 770;
        const height = 110;
        const _text = new Konva.Text({
            x,
            y,
            text: text,
            fontSize: 24,
            fontStyle: "bold",
            fill: "#444444",
            width,
            height,
            lineHeight: 1
        });
        this.layer.add(_text);
    }

    renderDayOfWeek(dayOfWeekList: string[]) {
        const pos = "月火水木金土日".split("");

        pos.forEach(dayOfWeek => {
            const isInclude = dayOfWeekList.includes(dayOfWeek);
            const index = pos.indexOf(dayOfWeek);
            const x = 555 + (40 * index);
            const y = 80;
            const text = dayOfWeek;
            const _text = new Konva.Text({
                x,
                y,
                text: text,
                fontSize: 24,
                fontStyle: "bold",
                fill: isInclude ? "#fff" : "#aaa",
            });
            const rect = new Konva.Rect({
                x: x - 3.5,
                y: y - 5,
                fill: isInclude ? '#444' : '#eee',
                width: 30,
                height: 30,
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

        const x = 555;
        const y = 125;

        const _text = new Konva.Text({
            x,
            y,
            text: `平日：${time.weekday}\n休日：${time.holiday}`,
            fontSize: 16,
            fontStyle: "bold",
            fill: "#444",
            lineHeight: 1.2
        });
        this.layer.add(_text);
    }

    renderImg1(cropper: Cropper) {
        const imageObj = new Image();
        imageObj.onload = () => {
            const image = new Konva.Image({
                x: 843,
                y: 40,
                image: imageObj,
                width: 396,
                height: 215,
            });


            this.layer.add(image);
        };
        imageObj.src = cropper.getCroppedCanvas().toDataURL();
    }

    renderImg2(cropper: Cropper) {
        const imageObj = new Image();
        imageObj.onload = () => {
            const image = new Konva.Image({
                x: 843,
                y: 40 + 235,
                image: imageObj,
                width: 396,
                height: 215,
            });


            this.layer.add(image);
        };
        imageObj.src = cropper.getCroppedCanvas().toDataURL();
    }

    renderTogetherFriends(friends: string[]) {
        const x = 50;
        const y = 400;

        const _text = new Konva.Text({
            x,
            y,
            text: friends.filter(f => f).map(f => `・${f}`).join("\n"),
            fontSize: 24,
            fontStyle: "bold",
            fill: "#444",
            lineHeight: 1.2
        });
        this.layer.add(_text);
    }

    renderWantFriends(friends: string[]) {
        const pos = {
            "狩り": {
                x: 72.5,
                y: 320,
                rx: 50,
                ry: 310,
            },
            "タワー": {
                x: 72.5 + 82,
                y: 320,
                rx: 50 + 92,
                ry: 310,
            },
            "雑談": {
                x: 72.5 + 82 + 102,
                y: 320,
                rx: 50 + 92 + 92,
                ry: 310,
            },
            "写真": {
                x: 72.5 + 82 + 102 + 92,
                y: 320,
                rx: 50 + 92 + 92 + 92,
                ry: 310,
            },
        }

        friends.forEach(f => {

            const _text = new Konva.Text({
                x: pos[f].x,
                y: pos[f].y,
                text: f,
                fontSize: 18,
                fontStyle: "bold",
                fill: "#fff",
            });
            const _rect = new Konva.Rect({
                x: pos[f].rx,
                y: pos[f].ry,
                width: 80.5,
                height: 32,
                fill: "#444",
                cornerRadius: 10
            });
            this.layer.add(_rect);
            this.layer.add(_text);
        })


    }

    renderHabitat(habitat: string[]) {
        const x = 440;
        const y = 221;

        const _text = new Konva.Text({
            x,
            y,
            text: habitat.filter(h => h).map(h => `・${h}`).join("\n"),
            fontSize: 18,
            fontStyle: "bold",
            fill: "#444",
            lineHeight: 1.2
        });
        this.layer.add(_text);
    }

    renderFavouriteMonsters(monsters: string[]) {
        const x = 440;
        const y = 336;

        const _text = new Konva.Text({
            x,
            y,
            text: monsters.filter(h => h).map(h => `・${h}`).join("\n"),
            fontSize: 18,
            fontStyle: "bold",
            fill: "#444",
            lineHeight: 1.2
        });
        this.layer.add(_text);
    }

    renderDislikesMonsters(monsters: string[]) {
        const x = 440;
        const y = 451;

        const _text = new Konva.Text({
            x,
            y,
            text: monsters.filter(h => h).map(h => `・${h}`).join("\n"),
            fontSize: 18,
            fontStyle: "bold",
            fill: "#444",
            lineHeight: 1.2
        });
        this.layer.add(_text);
    }

    toDataURL() {
        return this.stage.toDataURL({
            width: this.width,
            height: this.height,
        });
    }
}