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
    this.createObstacles();
    this.createGameOverContainer();
    this.createAnimations();

    this.handleGameStart();
    this.handleObstacleCollisions();
    this.handleGameRestart();
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

  createObstacles() {
    this.obstacles = this.physics.add.group();
  }

  createGameOverContainer() {
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

    this.gameOverContainer = this.add
      .container(this.gameWidth / 2, (this.gameHeight / 2) - 40)
      .add([this.gameOverText, this.restartText])
      .setVisible(false);
  }

  createAnimations() {
    this.anims.create({
      key: 'enemy-bird-fly-anim',
      frames: this.anims.generateFrameNumbers('enemy-bird'),
      frameRate: 10,
      repeat: -1
    });
  }

  handleGameStart() {
    this.startTrigger = this.physics.add
      .sprite(0, 10, null)
      .setAlpha(0)
      .setOrigin(0, 1);

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

  handleObstacleCollisions() {
    this.physics.add.collider(this.obstacles, this.player, () => {
      this.isGameRunning = false;
      this.physics.pause();
      this.player.die();
      this.gameOverContainer.setVisible(true);

      this.spawnTime = 0;
      this.gameSpeed = 10;
    });
  }

  handleGameRestart() {
    this.restartText.on('pointerdown', () => {
      this.physics.resume();
      this.player.setVelocityY(0);

      this.obstacles.clear(true, true);
      this.gameOverContainer.setVisible(false);
      this.anims.resumeAll();
      this.isGameRunning = true;
    });
  }

  spawnObstacle() {
    const obstaclesCount = PRELOAD_CONFIG.cactusesCount + PRELOAD_CONFIG.birdsCount;
    const obstacleNumber = Phaser.Math.Between(1, obstaclesCount);
    let obstacle: Phaser.Physics.Arcade.Sprite;

    const distance = Phaser.Math.Between(
      this.gameWidth * 0.6,
      this.gameWidth * 0.9
    );

    if (obstacleNumber > PRELOAD_CONFIG.cactusesCount) {
      const enemyPossibleHeight = [20, 70];
      const enemyHeight = enemyPossibleHeight[Math.floor(Math.random() * 2)];

      obstacle = this.obstacles
        .create(distance, this.gameHeight - enemyHeight, 'enemy-bird');
      obstacle.play('enemy-bird-fly-anim');
    } else {
      obstacle = this.obstacles
        .create(distance, this.gameHeight, `obstacle-${obstacleNumber}`);
    }

    obstacle
      .setOrigin(0, 1)
      .setImmovable();
  }
}