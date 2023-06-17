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
  }

  createMenu(menu, setupMenuEvents) {
    let lastMenuPositionY = 0;

    menu.forEach(menuItem => {
      const menuPosition = [this.screenCenter[0], this.screenCenter[1] + lastMenuPositionY];
      const textGO = this.add.text(...menuPosition, menuItem.text, this.fontOptions)
        .setInteractive()
        .setOrigin(0.5, 1);

      textGO.on('pointerover', () => {
        textGO.setStyle({ fill: '#ff0' })
      });

      textGO.on('pointerout', () => {
        textGO.setStyle({ fill: '#fff' })
      });

      textGO.on('pointerup', () => {
        menuItem.action && menuItem.action();
        menuItem.scene && this.scene.start(menuItem.scene);
      });

      lastMenuPositionY += this.lineHeight;
    });
  }
}

export default BaseScene;