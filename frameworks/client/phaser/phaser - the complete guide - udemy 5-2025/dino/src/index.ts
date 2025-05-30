
import Phaser from "phaser";
import PreloadScene from "./scenes/preload.scene";
import PlayScene from "./scenes/play.scene";

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: 1000,
  height: 340,
  pixelArt: true,
  transparent: true,
  physics: {
    default: 'arcade',
  },
  scene: [ PreloadScene, PlayScene ]
};

new Phaser.Game(config);