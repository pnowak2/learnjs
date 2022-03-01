import Phaser from 'phaser';

export default class BaseScene extends Phaser.Scene {
    constructor(key, config) {
        super(key);
        this.config = config;
    }

    create() {
        this.add.image(0, 0, 'sky').setOrigin(0);
    }
}