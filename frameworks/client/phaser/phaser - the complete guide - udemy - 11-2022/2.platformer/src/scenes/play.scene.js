import Phaser from 'phaser'

export default class PlayScene extends Phaser.Scene {

    constructor() {
        super('PlayScene');
    }

    preload() {
        this.load.image('sky', 'assets/sky.png');
    }

    create() {
        this.add.image(0, 0, 'sky').setOrigin(0)
    }
}