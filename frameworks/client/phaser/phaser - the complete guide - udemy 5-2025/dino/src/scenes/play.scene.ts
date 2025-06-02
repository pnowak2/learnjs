import Phaser from 'phaser';
import { SpriteWithDynamicBody } from '../types';
import Player from '../entities/player';
import GameScene from './game.scene';

export default class PlayScene extends GameScene {
  player: Player;
  startTrigger: SpriteWithDynamicBody;
  ground: Phaser.GameObjects.TileSprite;
  spawnInterval: number = 1500;
  spawnTime: number = 0;

  constructor() {
    super('PlayScene');
  }

  create() {
    this.createEnvironment();
    this.createPlayer();

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

  update(time: number, delta: number) {
    this.spawnTime += delta;
    if (this.spawnTime >= this.spawnInterval) {
      this.spawnObstacle();
      this.spawnTime = 0;
    }
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
    const obstacleNumber = Phaser.Math.Between(1, 6);
    const obstacleXPosition = Phaser.Math.Between(
      this.gameWidth * 0.5,
      this.gameWidth * 0.9
    );

    // this.physics.add
    //   .sprite(obstacleXPosition, this.gameHeight, `obstacle-${obstacleNumber}`)
    //   .setOrigin(0, 1)
  }
}