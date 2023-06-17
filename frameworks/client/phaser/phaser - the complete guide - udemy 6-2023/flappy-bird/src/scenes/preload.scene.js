import BaseScene from './base.scene';

class PreloadScene extends BaseScene {
  constructor(config) {
    super('PreloadScene', config);
  }

  preload() {
    this.load.image('sky', 'assets/sky.png');
    this.load.image('pipe1', 'assets/block.png');
    this.load.image('pipe2', 'assets/avatar.png');
    this.load.image('pipe3', 'assets/card.png');
    this.load.image('pipe4', 'assets/message.png');
    this.load.image('pipe5', 'assets/menu.png');
    this.load.image('pipe6', 'assets/green.png');
    this.load.image('pipe7', 'assets/red.png');
    this.load.image('bird', 'assets/XL.png');
    this.load.image('pause', 'assets/pause.png');
    this.load.image('back', 'assets/back.png');
  }

  create() {
    this.scene.start('MenuScene');
  }
}

export default PreloadScene;