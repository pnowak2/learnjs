import Phaser from 'phaser';
import { PRELOAD_CONFIG } from '..';

export default class PreloadScene extends Phaser.Scene {
  constructor() {
    super('PreloadScene');
  }

  preload() {
    this.load.image('ground', 'assets/ground.png');
    this.load.image('dino-idle', 'assets/dino-idle-2.png');
    this.load.spritesheet('dino-run', 'assets/dino-run.png', {
      frameWidth: 88,
      frameHeight: 94 
    });
    for(let i = 1; i <= PRELOAD_CONFIG.cactusesCount; i++) {
      this.load.image(`obstacle-${i}`, `assets/cactuses_${i}.png`);
      console.log(i)
    }
  }

  create() {
    this.scene.start('PlayScene');
  }
}