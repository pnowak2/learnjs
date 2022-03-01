import BaseScene from './base.scene';

export default class PreloadScene extends BaseScene {
    constructor(config) {
        super('PreloadScene', config);
    }

    preload() {
        this.load.image('sky', 'assets/sky.png');
        this.load.image('bird', 'assets/bird.png');
        this.load.image('pipe', 'assets/pipe.png');
        this.load.image('pause', 'assets/pause.png');
    }

    create() {
        this.scene.start('MenuScene');
    }
}