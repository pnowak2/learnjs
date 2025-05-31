
import Phaser from 'phaser';
import { SpriteWithDynamicBody } from '../types';

export default class PlayScene extends Phaser.Scene {
  player: SpriteWithDynamicBody;
  startTrigger: SpriteWithDynamicBody;

  constructor() {
    super('PlayScene');
  }

  create() {
    this.createEnvironment();
    this.createPlayer();

    this.startTrigger = this.physics.add
      .sprite(0, 10, null)
      .setAlpha(0)
      .setOrigin(0,1);

    this.registerPlayerControl();

    this.physics.add.overlap(this.player, this.startTrigger, () => {
      console.log('collision')
    });
  }

  update(time: number, delta: number): void {
  }

  createEnvironment() {
    this.add
      .tileSprite(0, this.gameHeight, 88, 26, 'ground')
      .setOrigin(0, 1);
  }

  createPlayer() {
    this.player = this.physics.add
      .sprite(0, this.gameHeight, 'dino-idle')
      .setGravityY(5000)
      .setCollideWorldBounds(true)
      .setInteractive()
      .setBodySize(44, 92)
      .setOrigin(0, 1);
  }

  get gameHeight(): number {
    return this.game.config.height as number;
  }

  registerPlayerControl() {
    const spaceBar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

    spaceBar.on('down', () => {
      this.player.setVelocityY(-1600);
    })
  }
}