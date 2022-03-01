import BaseScene from './base.scene';

export default class MenuScene extends BaseScene {
    constructor(config) {
        super('MenuScene', config);

        this.menu = [
            { scene: 'PlayScene', text: 'Play' },
            { scene: 'ScoreScene', text: 'Score' },
            { scene: null, text: 'Exit' },
        ];
    }

    create() {
        super.create();

        this.createMenu(this.menu);
    }
}