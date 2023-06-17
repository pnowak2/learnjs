import BaseScene from './base.scene';

class MenuScene extends BaseScene {
  constructor(config) {
    super('MenuScene', config);
  }

  create() {
    super.create();
    this.scene.start('PlayScene');
  }
}

export default MenuScene;