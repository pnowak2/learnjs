
import Phaser from 'phaser';

export default class PlayScene extends Phaser.Scene {
  constructor() {
    super('PlayScene');
  }

  private tile: Phaser.GameObjects.TileSprite;

  create() {
    this.tile = this.add
    .tileSprite(0, +this.game.config.height, +this.game.config.width, 26, 'ground')
    .setOrigin(0, 1);
  }

  update(time: number, delta: number): void {
    // this.tile.tilePositionX += 10;
  }
}