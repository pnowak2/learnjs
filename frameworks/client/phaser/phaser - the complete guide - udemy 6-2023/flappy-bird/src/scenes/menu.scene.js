import BaseScene from './base.scene';

class MenuScene extends BaseScene {
  constructor(config) {
    super('MenuScene', config);

    this.menu = [
      {
        scene: 'PlayScene', text: 'Play', action: () => {
        }
      },
      {
        scene: 'ScoreScene', text: 'Score', action: () => {
        }
      },
      {
        scene: null, text: 'Exit', action: () => {
          this.game.destroy(true);
          document.dispatchEvent(
            new CustomEvent('gameOver', { bubbles: true })
          );
        }
      },
    ]
  }

  create() {
    super.create();
    this.createMenu(this.menu);
  }
}

export default MenuScene;