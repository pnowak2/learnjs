import GameScene from "../scenes/game.scene";

export default class Player extends Phaser.Physics.Arcade.Sprite {
  cursors: Phaser.Types.Input.Keyboard.CursorKeys;
  scene: GameScene;

  constructor(scene: GameScene, x: number, y: number, key: string = 'dino-run') {
    super(scene, x, y, key);

    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.init();

    this.scene.events.on(
      Phaser.Scenes.Events.UPDATE, this.update, this
    );
  }

  init() {
    this.cursors = this.scene.input.keyboard.createCursorKeys();

    this.setGravityY(5000)
      .setCollideWorldBounds(true)
      .setBodySize(44, 92)
      .setOffset(20, 0)
      .setOrigin(0, 1);

    this.registerAnimations();
  }

  update(x: any, y: any) {
    const { space, down} = this.cursors;
    const isSpaceJustDown = Phaser.Input.Keyboard.JustDown(space);
    const isDownJustDown = Phaser.Input.Keyboard.JustDown(down);
    const isDownJustUp = Phaser.Input.Keyboard.JustUp(down);
    const onFloor = (this.body as Phaser.Physics.Arcade.Body).onFloor();

    if (isSpaceJustDown && onFloor) {
      this.setVelocityY(-1600);
    }

    if (isDownJustDown && onFloor) {
      this.setBodySize(this.body.width, 58);
      this.setOffset(68, 34);
    }

    if (isDownJustUp && onFloor) {
      this.setBodySize(44, 92);
      this.setOffset(20, 0);
    }

    if(!this.scene.isGameRunning) {
      return;
    }

    if(this.body.deltaAbsY() > 0) {
      this.anims.stop();
      this.setTexture('dino-run', 0);
    } else {
      this.playRunAnimation();
    }
  }

  registerAnimations() {
    this.anims.create({
      key: 'dino-run-anim',
      frameRate: 10,
      repeat: -1,
      frames: this.anims.generateFrameNumbers('dino-run', {
        start: 2,
        end: 3
      })
    });

    this.anims.create({
      key: 'dino-down-anim',
      frameRate: 10,
      repeat: -1,
      frames: this.anims.generateFrameNumbers('dino-down')
    });
  }

  playRunAnimation() {
    this.play('dino-run-anim', true);
  }

  die() {
    this.anims.pause();
    this.setTexture('dino-hurt');
  }
}