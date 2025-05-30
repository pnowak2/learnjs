import Phaser from 'phaser';

class BaseScene extends Phaser.Scene {
  constructor(key, config) {
    super(key);
    this.config = config;
    this.fontSize = 32;
    this.lineHeight = 50;
    this.fontOptions = {
      fontSize: `${this.fontSize}px`,
      fill: '#fff'
    };
    this.screenCenter = [config.width / 2, config.height / 2];
  }

  create() {
    this.add.image(0, 0, 'sky').setOrigin(0, 0);
    this.createGoBack();
  }

  createGoBack() {
    if (this.config.canGoBack) {
      const backBtn = this.add.image(
        this.config.width - 16,
        this.config.height - 16,
        'back'
      )
        .setOrigin(1)
        .setInteractive()
        .setScale(2);

      backBtn.on('pointerdown', () => {
        this.scene.start('MenuScene');
      });

    }
  }

  createMenu(menu, setupMenuEvents) {
    let lastMenuPositionY = 0;

    menu.forEach(menuItem => {
      const menuPosition = [this.screenCenter[0], this.screenCenter[1] + lastMenuPositionY];

      menuItem.textGO = this.add.text(...menuPosition, menuItem.text, this.fontOptions)
        .setInteractive()
        .setOrigin(0.5, 2);

      setupMenuEvents(menuItem);

      lastMenuPositionY += this.lineHeight;
    });
  }
}

export default BaseScene;