export class Player extends Phaser.Physics.Arcade.Sprite {
  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, 'dino-idle');
    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.init();
  }

  init() {
    this.setOrigin(0, 1);
    this.setGravityY(5000);
    this.setCollideWorldBounds(true, 0);
    this.setBodySize(44, 92);
  }
}