
import BaseScene from './base.scene';

class ScoreScene extends BaseScene {
  constructor(config) {
    super('ScoreScene', { ...config, canGoBack: true });
  }

  create() {
    super.create();

    const bestScore = localStorage.getItem('bestScore') || 0;

    this.add
      .text(this.screenCenter[0], this.screenCenter[1], `Best score: ${bestScore}`, this.fontOptions)
      .setInteractive()
      .setOrigin(0.5);
  }
}

export default ScoreScene;