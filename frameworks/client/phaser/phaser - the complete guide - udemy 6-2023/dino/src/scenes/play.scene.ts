import Phaser from 'phaser';

export class PlayScene extends Phaser.Scene {
  constructor() {
    super('PlayScene');
  }

  create() {
    const sceneWidth = this.game.scale.width;
    const sceneHeight = this.game.scale.height;
    const groundHeight = this.textures.get('ground').getSourceImage().height;

    this.add
      .tileSprite(0, sceneHeight, 88, groundHeight, 'ground')
      .setOrigin(0, 1)
  }
}