import Phaser from 'phaser';

export class PlayScene extends Phaser.Scene {
  constructor() {
    super('PlayScene');
  }

  get gameHeight(): number {
    return this.game.config.height as number;
  }

  create() {
    this.createEnvironment();
    this.createPlayer();
  }

  createPlayer() {
    this.physics.add
    .sprite(0, this.gameHeight, 'dino-idle')
    .setOrigin(0, 1);
  }

  createEnvironment() {
    const groundHeight = this.textures.get('ground').getSourceImage().height;

    this.add
      .tileSprite(0, this.gameHeight, 88, groundHeight, 'ground')
      .setOrigin(0, 1)
  }
}