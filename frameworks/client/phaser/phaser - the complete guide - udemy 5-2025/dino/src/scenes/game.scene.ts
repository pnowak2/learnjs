export default class GameScene extends Phaser.Scene {
  constructor(key: string) {
    super(key);
  }

  isGameRunning: boolean = false;

  get gameHeight(): number {
    return this.game.config.height as number;
  }

  get gameWidth(): number {
    return this.game.config.width as number;
  }
}
