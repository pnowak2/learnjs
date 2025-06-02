
import Phaser from "phaser";
import PreloadScene from "./scenes/preload.scene";
import PlayScene from "./scenes/play.scene";

export const PRELOAD_CONFIG = {
  cactusesCount: 6
}

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: 1000,
  height: 340,
  pixelArt: true,
  transparent: true,
  physics: {
    arcade: {
      debug: true
    },
    default: 'arcade',
  },
  scene: [ PreloadScene, PlayScene ]
};

new Phaser.Game(config);