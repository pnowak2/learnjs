import Phaser from 'phaser';
import { SpriteWithDynamicBody } from '../types';
import Player from '../entities/player';
import GameScene from './game.scene';
import { PRELOAD_CONFIG } from '..';

export default class PlayScene extends GameScene {
  player: Player;
  obstacles: Phaser.Physics.Arcade.Group;
  startTrigger: SpriteWithDynamicBody;
  ground: Phaser.GameObjects.TileSprite;

  gameOverContainer: Phaser.GameObjects.Container;
  gameOverText: Phaser.GameObjects.Image;
  restartText: Phaser.GameObjects.Image;

  spawnInterval: number = 1500;
  spawnTime: number = 0;
  gameSpeed: number = 10;

  constructor() {
    super('PlayScene');
  }

  create() {
    this.createEnvironment();
    this.createPlayer();

    this.obstacles = this.physics.add.group();

    this.gameOverText = this.make.image({
      x: 0,
      y: 0,
      key: 'game-over',
    }, false);

    this.restartText = this.make
    .image({
      x: 0,
      y: 80,
      key: 'restart',
    }, false)
    .setInteractive();

    this.restartText.on('pointerdown', () => {
    });

    this.gameOverContainer = this.add
      .container(this.gameWidth / 2, (this.gameHeight / 2) - 40)
      .add([this.gameOverText, this.restartText])
      .setVisible(false);

    this.startTrigger = this.physics.add
      .sprite(0, 10, null)
      .setAlpha(0)
      .setOrigin(0, 1);

    this.physics.add.collider(this.obstacles, this.player, () => {
      this.isGameRunning = false;
      this.physics.pause();
      this.player.die();
      this.gameOverContainer.setVisible(true);

      this.spawnTime = 0;
      this.gameSpeed = 10;
    });

    this.physics.add.overlap(this.player, this.startTrigger, () => {
      if (this.startTrigger.y === 10) {
        this.startTrigger.body.reset(this.startTrigger.x, this.gameHeight);

        return;
      }

      this.startTrigger.destroy(true);

      const rolloutEvent = this.time.addEvent({
        delay: 1000 / 60,
        loop: true,
        callback: () => {
          this.player.playRunAnimation();
          this.player.setVelocityX(80)
          this.ground.width += 17 * 2;

          if (this.ground.width >= this.gameWidth) {
            this.ground.width = this.gameWidth;
            this.player.setVelocityX(0);
            this.isGameRunning = true;

            rolloutEvent.remove();
          }
        }
      });
    });
  }

  update(time: number, delta: number) {
    if (!this.isGameRunning) return;

    this.spawnTime += delta;
    if (this.spawnTime >= this.spawnInterval) {
      this.spawnObstacle();
      this.spawnTime = 0;
    }

    Phaser.Actions.IncX(this.obstacles.getChildren(), -this.gameSpeed);

    this.obstacles.getChildren().forEach((item: Phaser.Physics.Arcade.Sprite) => {
      if (item.getBounds().right < 0) {
        this.obstacles.remove(item, true, true);
      }
    });

    this.ground.tilePositionX += this.gameSpeed;
  }

  createEnvironment() {
    this.ground = this.add
      .tileSprite(0, this.gameHeight, 88, 26, 'ground')
      .setOrigin(0, 1);
  }

  createPlayer() {
    this.player = new Player(this, 0, this.gameHeight);
  }

  spawnObstacle() {
    const obstacleNumber = Phaser.Math.Between(1, PRELOAD_CONFIG.cactusesCount);
    const distance = Phaser.Math.Between(
      this.gameWidth * 0.6,
      this.gameWidth * 0.9
    );

    const obstacle = this.obstacles
      .create(distance, this.gameHeight, `obstacle-${obstacleNumber}`)
      .setImmovable()
      .setOrigin(0, 1);
  }
}