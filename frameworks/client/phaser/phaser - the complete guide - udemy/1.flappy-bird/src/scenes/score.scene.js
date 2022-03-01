import BaseScene from './base.scene';

export default class ScoreScene extends BaseScene {
    constructor(config) {
        super('ScoreScene', config);
    }

    create() {
        super.create();

        const bestScore = localStorage.getItem('bestScore');

        this.add
            .text(this.config.width / 2, this.config.height / 2, `Best score: ${bestScore}`, { fontSize: 32 })
            .setOrigin(0.5, 0.5);
    }
}