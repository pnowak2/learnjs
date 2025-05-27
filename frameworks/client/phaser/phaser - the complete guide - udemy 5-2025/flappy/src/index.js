import Phaser from 'phaser';
import PlayScene from './scenes/play.scene';
import MenuScene from './scenes/menu.scene';

const WIDTH = 800;
const HEIGHT = 600;

const BIRD_POSITION = {
  x: WIDTH / 10,
  y: HEIGHT / 2
};

const SHARED_CONFIG = {
  width: WIDTH,
  height: HEIGHT,
  startPosition: BIRD_POSITION
}

let config = {
  type: Phaser.AUTO,
  ...SHARED_CONFIG,
  physics: {
    default: 'arcade',
    arcade: {
      debug: true,
    }
  },
  scene: [
    new MenuScene(SHARED_CONFIG),
    new PlayScene(SHARED_CONFIG),
  ]
};


new Phaser.Game(config);