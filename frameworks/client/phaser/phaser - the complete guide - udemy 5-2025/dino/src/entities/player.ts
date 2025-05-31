import { Scene } from "phaser";

export default class Player extends Phaser.Physics.Arcade.Sprite {
  constructor(scene: Scene, x: number, y: number, key: string = 'dino-idle') {
    super(scene, x, y, key);

    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.init();
  }

  init() {
    this.setGravityY(5000)
      .setCollideWorldBounds(true)
      .setBodySize(44, 92)
      .setOrigin(0, 1);

    this.registerPlayerControl();
  }

  registerPlayerControl() {
    const spaceBar = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

    spaceBar.on('down', () => {
      this.setVelocityY(-1600);
    })
  }
}