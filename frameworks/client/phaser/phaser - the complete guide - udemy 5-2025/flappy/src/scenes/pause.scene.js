import BaseScene from "./base.scene";

class PauseScene extends BaseScene {
  constructor(config) {
    super('PauseScene', {...config, canGoBack: true});

    this.menu = [
      { scene: 'PlayScene', text: 'Continue' },
      { scene: 'MenuScene', text: 'Exit' },
    ]
  }

  create() {
    super.create();
    super.createMenu(this.menu, this.setupMenuEvents.bind(this));
  }

  setupMenuEvents(menuItem) {
    menuItem.textGO.on('pointerdown', () => {

    });
  }
}

export default PauseScene;