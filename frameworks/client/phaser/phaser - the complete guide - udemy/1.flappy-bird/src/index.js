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
    create,
    update
  }
}

let bird = null;

// loading assets: images, music, animations, etc
function preload() {
  // this -> scene, functions and props to use
  this.load.image('sky', 'assets/sky.png');
  this.load.image('bird', 'assets/bird.png');
}

function create() {
  this.add.image(0, 0, 'sky').setOrigin(0);
  bird = this.physics.add.sprite(config.width / 10, config.height / 2, 'bird').setOrigin(0);
  bird.body.velocity.y = 200;
}

// 60fps
// delta ~16ms
// 16ms * 60fps ~ 1s
function update(time, delta) {
}

new Phaser.Game(config);