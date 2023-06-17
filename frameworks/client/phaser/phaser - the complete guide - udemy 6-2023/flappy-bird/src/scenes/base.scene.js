import Phaser from 'phaser';

class BaseScene extends Phaser.Scene {
  constructor(key, config) {
    super(key);
    this.config = config;
    this.screenCenter = [config.width / 2, config.height / 2]

    this.fontSize = 34;
    this.lineHeight = 42;
    this.fontOptions = {
      fontSize: this.fontSize,
      fill: '#fff'
    }
  }

  create() {
    this.add.image(0, 0, 'sky').setOrigin(0, 0);

    if (this.config.canGoBack) {
      const backBtn = this.add.image(
        this.config.width - 10,
        this.config.height - 10,
        'back')
        .setInteractive()
        .setScale(2)
        .setOrigin(1, 1);

      backBtn.on('pointerup', () => {
        this.scene.start('MenuScene');
      });
    }
  }

  createMenu(menu, setupMenuEvents) {
    let lastMenuPositionY = 0;

    menu.forEach(item => {
      const menuPosition = [this.screenCenter[0], this.screenCenter[1] + lastMenuPositionY];
      const textGO = this.add.text(...menuPosition, item.text, this.fontOptions)
        .setInteractive()
        .setOrigin(0.5, 1);

      textGO.on('pointerover', () => {
        textGO.setStyle({ fill: '#ff0' })
      });

      textGO.on('pointerout', () => {
        textGO.setStyle({ fill: '#fff' })
      });

      textGO.on('pointerup', () => {
        item.action && item.action(item.scene);
        item.scene && this.scene.start(item.scene);
      });

      lastMenuPositionY += this.lineHeight;
    });
  }
}

export default BaseScene;