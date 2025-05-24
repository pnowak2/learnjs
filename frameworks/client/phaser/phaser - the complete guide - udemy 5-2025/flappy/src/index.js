import Phaser from 'phaser';

let config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
    default: 'arcade',
    arcade: {
      debug: true,
      // gravity: { y: 200 }
    }
  },
  scene: {
    preload,
    create,
    update
  }
};

let bird = null;
const VELOCITY = 200;


function preload() {
  this.load.image('sky', 'assets/sky.png');
  this.load.image('bird', 'assets/bird.png');
}

function create() {
  this.add.image(0, 0, 'sky').setOrigin(0, 0);
  bird = this.physics.add.sprite(config.width / 10, config.height / 2 , 'bird').setOrigin(0.5, 0.5);
  bird.body.velocity.x = VELOCITY;
}

function update(time, delta) {
  if(bird.body.x + bird.body.width >= config.width) {
    bird.body.velocity.x = -VELOCITY;
  } else if(bird.body.x <= 0) {
    bird.body.velocity.x = VELOCITY;
  }
}

new Phaser.Game(config);