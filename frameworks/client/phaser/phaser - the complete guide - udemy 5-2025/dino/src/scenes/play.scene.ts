
import Phaser from 'phaser';

export default class PlayScene extends Phaser.Scene {
  player: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;

  constructor() {
    super('PlayScene');
  }

  create() {
    this.createEnvironment();
    this.createPlayer();
    this.registerPlayerControl();
  }

  update(time: number, delta: number): void {
    // this.tile.tilePositionX += 10;
  }

  createEnvironment() {
    this.add
    .tileSprite(0, this.gameHeight, 88, 26, 'ground')
    .setOrigin(0, 1);
  }

  createPlayer() {
    this.player = this.physics.add
      .sprite(0, this.gameHeight, 'dino-idle')
      .setInteractive()
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