import Phaser from 'phaser';

class PlayScene extends Phaser.Scene {
  constructor() {
    super('PlayScene');

    this.bird = null;

    this.initialBirdPosition = {
      x: 80,
      y: 300
    }
  }

  preload() {
    this.load.image('sky', 'assets/sky.png');
    this.load.image('bird', 'assets/bird.png');
  }

  create() {
    this.add.image(0, 0, 'sky').setOrigin(0, 0);

    this.bird = this.physics.add.sprite(
      this.initialBirdPosition.x,
      this.initialBirdPosition.y,
      'bird')
      .setOrigin(0.5, 0.5)
      .setGravityY(300);
  }

  update() {

  }
}

export default PlayScene;