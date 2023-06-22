
import Phaser from "phaser";
import { PlayScene } from "./scenes/play.scene";
import { PreloadScene } from "./scenes/preload.scene";

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: 1000,
  height: 340,
  pixelArt: true,
  transparent: true,
  physics: {
    default: 'arcade',
    arcade: {
      debug: true,
      // gravity: { y: 200 }
    }
  },
  scene: [ PreloadScene, PlayScene]
};

new Phaser.Game(config);
