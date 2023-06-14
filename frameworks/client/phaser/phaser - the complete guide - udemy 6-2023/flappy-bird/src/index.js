import Phaser from 'phaser';

const config = {
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
  debugger
}

function create() {
  debugger
}


new Phaser.Game(config);