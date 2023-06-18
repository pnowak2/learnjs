import Phaser from 'phaser';

export class PreloadScene extends Phaser.Scene {
  constructor() {
    super('PreloadScene');
  }

  preload() {
    this.load.image('ground', 'assets/ground.png');
  }

  create() {
    this.scene.start('PlayScene');
  }
}