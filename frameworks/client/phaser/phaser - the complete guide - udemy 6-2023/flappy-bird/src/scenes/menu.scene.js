import BaseScene from './base.scene';

class MenuScene extends BaseScene {
  constructor(config) {
    super('MenuScene', config);

    this.menu = [
      { scene: 'PlayScene', text: 'Play' },
      { scene: 'ScoreScene', text: 'Score' },
      { scene: null, text: 'Exit' },
    ]
  }

  create() {
    super.create();
    this.createMenu(this.menu, this.setupMenuEvents);
  }

  setupMenuEvents(menuItem) {
    const textGO = menuItem.textGO;
    textGO.on('pointerover', () => {
      textGO.setStyle({ fill: '#ff0' })
    });

    textGO.on('pointerout', () => {
      textGO.setStyle({ fill: '#fff' })
    })
  }
}

export default MenuScene;