export class Player extends Phaser.Physics.Arcade.Sprite {
  cursors: Phaser.Types.Input.Keyboard.CursorKeys;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, 'dino-idle');
    scene.physics.add.existing(this);
    scene.add.existing(this);

    this.init();

    this.scene.events.on(Phaser.Scenes.Events.UPDATE, this.update, this);
  }

  init() {
    this.setOrigin(0, 1);
    this.setGravityY(5000);
    this.setCollideWorldBounds(true, 0);
    this.setBodySize(44, 92);

    this.cursors = this.scene.input.keyboard.createCursorKeys();
  }

  update(): void {
    const { space } = this.cursors;
    const isSpaceJustDown = Phaser.Input.Keyboard.JustDown(space)
    const isOnFloor = (this.body as Phaser.Physics.Arcade.Body).onFloor();

    if (isSpaceJustDown && isOnFloor) {
      this.setVelocityY(-1600);
    }
  }
}