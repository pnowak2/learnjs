import BaseScene from './base.scene';

export default class ScoreScene extends BaseScene {
    constructor(config) {
        super('ScoreScene', {...config, canGoBack: true });
    }

    create() {
        super.create();

        const bestScore = localStorage.getItem('bestScore');

        this.add
            .text(
                ...this.screenCenter,
                `Best score: ${bestScore}`,
                this.fontOptions
            )
            .setOrigin(0.5, 0.5);
    }
}