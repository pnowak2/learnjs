import Phaser from 'phaser';

let config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
    default: 'arcade'
  },
  scene: {
    preload,
    create
  }
};

function preload() {
  this.load.image('sky', 'assets/sky.png');
}

function create() {
  this.add.image(0, 0, 'sky').setOrigin(0, 0);
}

new Phaser.Game(config);