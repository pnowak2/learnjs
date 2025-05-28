import Phaser from 'phaser';
import PlayScene from './scenes/play.scene';
import MenuScene from './scenes/menu.scene';
import PreloadSceneScene from './scenes/preload.scene';
import ScoreScene from './scenes/score.scene';
import PauseScene from './scenes/pause.scene';

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

const Scenes = [
  PreloadSceneScene, 
  MenuScene, 
  PlayScene, 
  ScoreScene,
  PauseScene
];
const createScene = Scene => new Scene(SHARED_CONFIG);
const initScenes = () => Scenes.map(createScene);

let config = {
  type: Phaser.AUTO,
  ...SHARED_CONFIG,
  physics: {
    default: 'arcade',
    arcade: {
      debug: true,
    }
  },
  scene: initScenes()
};

new Phaser.Game(config);