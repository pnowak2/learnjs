import BaseScene from './base.scene';

class PauseScene extends BaseScene {
  constructor(config) {
    super('PauseScene', config);

    this.menu = [
      {
        scene: null, text: 'Continue', action: () => {
          this.scene.stop();
          this.scene.resume('PlayScene');
          this.events.emit('resume');
        }
      },
      {
        text: 'Exit', action: () => { 
          this.scene.stop('PlayScene');
          this.scene.start('MenuScene');
        }
      },
    ]
  }

  create() {
    super.create();
    this.createMenu(this.menu);
  }
}

export default PauseScene;