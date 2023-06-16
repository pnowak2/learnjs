import Phaser, { UP } from 'phaser';
import PlayScene from './scenes/play.scene';

const WIDTH = 800;
const HEIGHT = 600;
const BIRD_POSITION = { x: WIDTH * 0.1, y: HEIGHT / 2 };

const SHARED_CONFIG = {
  width: 800,
  height: 600,
  startPosition: BIRD_POSITION
};

const config = {
  type: Phaser.AUTO,
  ...SHARED_CONFIG,
  physics: {
    default: 'arcade',
    arcade: {
      debug: true,
    }
  },
  scene: [new PlayScene(SHARED_CONFIG)]
};

function preload() {
}

function create() {
}

function update(time, delta) {
}

new Phaser.Game(config);
