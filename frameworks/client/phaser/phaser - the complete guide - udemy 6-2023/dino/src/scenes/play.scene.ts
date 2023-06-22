import Phaser from 'phaser';
import { SpriteWithDynamicBody } from '../types';

export class PlayScene extends Phaser.Scene {
  player: SpriteWithDynamicBody;

  constructor() {
    super('PlayScene');
  }

  get gameHeight(): number {
    return this.game.config.height as number;
  }

  create() {
    this.createEnvironment();
    this.createPlayer();
    this.registerPlayerControl();
  }

  createPlayer() {
    this.player = this.physics.add
      .sprite(0, this.gameHeight, 'dino-idle')
      .setGravityY(5000)
      .setCollideWorldBounds(true, 0)
      .setBodySize(44, 92)
      .setOrigin(0, 1);
  }

  createEnvironment() {
    const groundHeight = this.textures.get('ground').getSourceImage().height;

    this.add
      .tileSprite(0, this.gameHeight, 88, groundHeight, 'ground')
      .setOrigin(0, 1)
  }

  registerPlayerControl() {
    const spaceBar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    spaceBar.on('down', () => {
      this.player.setVelocityY(-1600);
    });
  }
}