import Phaser from 'phaser';
import MenuScene from './scenes/menu.scene';
import PauseScene from './scenes/pause.scene';
import PlayScene from './scenes/play.scene';
import PreloadScene from './scenes/preload.scene';
import ScoreScene from './scenes/score.scene';

const WIDTH = 400;
const HEIGHT = 600;
const BIRD_POSITION = { x: WIDTH / 10, y: HEIGHT / 2 };

const SHARED_CONFIG = {
  width: WIDTH,
  height: HEIGHT,
  startPosition: BIRD_POSITION
}

const Scenes = [PreloadScene, MenuScene, PlayScene, ScoreScene,  PauseScene];

const createScene = Scene => new Scene(SHARED_CONFIG);
const initScenes = () => Scenes.map(createScene)

const config = {
  type: Phaser.AUTO,
  ...SHARED_CONFIG,
  pixelArt: true,
  physics: {
    default: 'arcade',
    arcade: {
      debug: false,
    },
  },
  scene: initScenes()
};

new Phaser.Game(config);
