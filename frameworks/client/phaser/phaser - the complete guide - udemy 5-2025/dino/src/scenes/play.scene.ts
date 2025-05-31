
import Phaser from 'phaser';
import { SpriteWithDynamicBody } from '../types';
import Player from '../entities/player';

export default class PlayScene extends Phaser.Scene {
  player: Player;
  startTrigger: SpriteWithDynamicBody;
  ground: Phaser.GameObjects.TileSprite;

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
        this.startTrigger.body.reset(0, this.gameHeight);
        return;
      }

      this.startTrigger.destroy(true);

      this.time.addEvent({
        delay: 1000/60,
        loop: true,
        callback: () => {
          if(this.ground.width <= this.gameWidth) {
            this.ground.width += 17 * 2;
          }         }
      });
    });
  }

  update() {
  }

  createEnvironment() {
    this.ground = this.add
      .tileSprite(0, this.gameHeight, 88, 26, 'ground')
      .setOrigin(0, 1);
  }

  createPlayer() {
    this.player = new Player(this, 0, this.gameHeight);
  }

  get gameHeight(): number {
    return this.game.config.height as number;
  }

  get gameWidth(): number {
    return this.game.config.width as number;
  }
}