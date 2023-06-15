import Phaser from 'phaser';

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
    default: 'arcade',
    arcade: {
      debug: true,
      gravity: { y: 400 }
    }
  },
  scene: {
    preload,
    create,
    update,
  }
};

const VELOCITY = 200;
let flapVelocity = 300;
let bird = null;

function preload() {
  this.load.image('sky', 'assets/sky.png');
  this.load.image('bird', 'assets/bird.png');
}

function create() {
  this.add.image(0, 0, 'sky').setOrigin(0, 0);
  bird = this.physics.add.sprite(config.width * 0.1, config.height / 2, 'bird').setOrigin(0);

  this.input.on('pointerdown', flap);
  this.input.keyboard.on('keydown-SPACE', flap);
}

function update(time, delta) {
  if(bird.y > config.height || (bird.y + bird.width) <= 0) {
    bird.y = config.height / 2;
    bird.body.velocity.y = 0;
  }
}

function flap() {
  bird.body.velocity.y -= flapVelocity;
}

new Phaser.Game(config);