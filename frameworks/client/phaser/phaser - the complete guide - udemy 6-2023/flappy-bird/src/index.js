import Phaser from 'phaser';

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 200 }
    }
  },
  scene: {
    preload,
    create,
    update,
  }
};

let bird = null;
let totalDelta = null;

function preload() {
  this.load.image('sky', 'assets/sky.png');
  this.load.image('bird', 'assets/bird.png');
}

function create() {
  this.add.image(0, 0, 'sky').setOrigin(0, 0);
  bird = this.physics.add.sprite(config.width * 0.1, config.height / 2, 'bird').setOrigin(0, 0);
}

function update(time, delta) {
  totalDelta += delta;

  if (totalDelta < 1000) {
    return;
  }

  // console.log(bird.body.velocity.y);
  totalDelta = 0;
}

new Phaser.Game(config);