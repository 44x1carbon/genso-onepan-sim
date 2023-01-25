import Shepherd from 'shepherd.js';

const tourSetup = (getStep: () => number, addStep: () => void) => {
    const tour = new Shepherd.Tour({
        useModalOverlay: true,
        defaultStepOptions: {
            classes: 'shadow-md bg-purple-dark', // 全てのステップでshadow-mdとbg-purple-darkのクラスがつく
            scrollTo: true // 全てのステップでスクロールするかの設定をtrueにする
        }
    });

    tour.addStep({
        text: /* html */ `
            <ol class="list-decimal pl-5">
                <li>ベース装備のCNDを入力してください。</li>
                <li>未装備の箇所は未装備にチェックをつけて下さい。</li>
                <li>全て入力を終えたら「次へ」を押してください。</li>
            </ol>
        `,
        attachTo: {
            element: '#InitialStateInput',
            on: 'right'
        },
        buttons: [
            {
                text: '完了',
                action: () => {
                    if (getStep() === 0) {
                        addStep();
                    }
                    tour.next();
                }
            }
        ]
    });

    tour.addStep({
        text: /* html */ `
            <ol class="list-decimal pl-5">
                <li>おしゃれ装備のCNDを入力してください。</li>
                <li>未装備の箇所は未装備にチェックをつけて下さい。</li>
                <li>全て入力を終えたら「次へ」を押してください。</li>
            </ol>
        `,
        attachTo: {
            element: '#InitialStateInput',
            on: 'right'
        },
        buttons: [
            {
                text: '完了',
                action: () => {
                    if (getStep() === 1) {
                        addStep();
                    }
                    tour.next();
                }
            }
        ]
    });

    return tour
}


export default tourSetup;