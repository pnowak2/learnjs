import Phaser from 'phaser'

const config = {
  // WebGL (Web Graphics Library)
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
    // Arcade physics plugin, manages physics simulation
    default: 'arcade'
  },
  scene: {
    preload,
    create
  }
}

// loading assets: images, music, animations, etc
function preload() {
  // this -> scene, functions and props to use
}

function create() {
}

new Phaser.Game(config);