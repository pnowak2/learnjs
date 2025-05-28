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
    menuItem.textGO.on('pointerup', () => {
      if(menuItem.scene && menuItem.text === 'Continue') {
        this.scene.stop();
        this.scene.resume(menuItem.scene);
      } else {
        this.scene.stop('PlayScene');
        this.scene.start('MenuScene');
      }
    });
  }
}

export default PauseScene;