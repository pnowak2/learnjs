import Phaser from 'phaser';

export default class BaseScene extends Phaser.Scene {
    constructor(key, config) {
        super(key);
        this.config = config;
        this.screenCenter = [config.width / 2, config.height / 2];

        this.fontSize = 32;
        this.lineHeight = 42;

        this.fontOptions = {
            fontSize: `${this.fontSize}px`,
            fill: '#fff',
            fontFamily: 'Arial',
        }
    }

    create() {
        this.add.image(0, 0, 'sky').setOrigin(0);

        if (this.config.canGoBack) {
            const backButton = this.add
                .image(this.config.width - 10, this.config.height - 10, 'back')
                .setScale(2)
                .setInteractive()
                .setOrigin(1, 1);

            backButton.on('pointerup', () => {
                this.scene.start('MenuScene');
            });
        }
    }

    createMenu(menu, setupMenuEvents) {
        let lastMenuPositionY = 0;

        menu.forEach(item => {
            const menuPosition = [this.screenCenter[0], this.screenCenter[1] + lastMenuPositionY];
            item.textGO = this.add
                .text(...menuPosition, item.text, this.fontOptions)
                .setInteractive()
                .setOrigin(0.5, 1);

            lastMenuPositionY += this.lineHeight;

            setupMenuEvents(item);
        });
    }
}