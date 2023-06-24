import Phaser from 'phaser';
import { SpriteWithDynamicBody } from '../types';
import { Player } from '../entities/player'

export class PlayScene extends Phaser.Scene {
  player: Phaser.Physics.Arcade.Sprite;
  startTrigger: SpriteWithDynamicBody;

  constructor() {
    super('PlayScene');
  }

  get gameHeight(): number {
    return this.game.config.height as number;
  }

  create() {
    this.createEnvironment();
    this.createPlayer();

    this.startTrigger = this.physics.add
      .sprite(0, 10, null)
      .setAlpha(0)
      .setOrigin(0, 1);

    this.registerPlayerControl();

    this.physics.add.overlap(this.player, this.startTrigger, () => {
      console.log('collision');
    });
  }

  createPlayer() {
    this.player = new Player(this, 0, 0);
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