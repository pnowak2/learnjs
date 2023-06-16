import Phaser from 'phaser';

class PlayScene extends Phaser.Scene {
  constructor() {
    super('PlayScene');
    this.INITIAL_BIRD_POSITION = {
      x: 80,
      y: 300
    }

    this.bird = null;
  }

  preload() {
    this.load.image('sky', 'assets/sky.png');
    this.load.image('bird', 'assets/bird.png');
  }

  create() {
    this.add.image(0, 0, 'sky').setOrigin(0, 0);

    this.bird = this.physics.add.sprite(this.INITIAL_BIRD_POSITION.x, this.INITIAL_BIRD_POSITION.y, 'bird').setOrigin(0);
    this.bird.body.gravity.y = 400;

  }

  update() {

  }
}

export default PlayScene;