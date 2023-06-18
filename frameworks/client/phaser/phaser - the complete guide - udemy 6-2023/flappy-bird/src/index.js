import Phaser from 'phaser';
import PlayScene from './scenes/play.scene';
import MenuScene from './scenes/menu.scene';
import PreloadScene from './scenes/preload.scene';
import ScoreScene from './scenes/score.scene';
import PauseScene from './scenes/pause.scene';

const WIDTH = 800;
const HEIGHT = 600;
const BIRD_POSITION = { x: WIDTH * 0.1, y: HEIGHT / 2 };

const SHARED_CONFIG = {
  width: WIDTH,
  height: HEIGHT,
  startPosition: BIRD_POSITION
};

const SCENES = [
  PreloadScene,
  MenuScene,
  ScoreScene,
  PlayScene,
  PauseScene,
];

const createScene = Scene => new Scene(SHARED_CONFIG);
const initScenes = () => SCENES.map(createScene);

const config = {
  type: Phaser.AUTO,
  ...SHARED_CONFIG,
  pixelArt: true,
  physics: {
    default: 'arcade',
    arcade: {
      debug: false,
    }
  },
  scene: initScenes()
};

new Phaser.Game(config);
