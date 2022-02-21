import Phaser from 'phaser'

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
    default: 'arcade',
    arcade: {
      debug: true,
      gravity: { y: 400 },
    },
  },
  scene: {
    preload,
    create,
    update
  }
}

let bird = null;
const initialBirdPosition = {
  x: config.width / 10,
  y: config.height / 2
};
const VELOCITY = 200;
const flapVelocity = 300;

function preload() {
  this.load.image('sky', 'assets/sky.png');
  this.load.image('bird', 'assets/bird.png');
}

function create() {
  this.add.image(0, 0, 'sky').setOrigin(0);
  bird = this.physics.add.sprite(initialBirdPosition.x, initialBirdPosition.y, 'bird').setOrigin(0);

  this.input.on('pointerdown', flap);
  this.input.keyboard.on('keydown_SPACE', flap);
}

function update(time, delta) {
  if (bird.y > config.height || bird.y < -bird.height) {
    restartBirdPosition();
  }
}

function restartBirdPosition() {
  bird.x = initialBirdPosition.x;
  bird.y = initialBirdPosition.y;
  bird.body.velocity.y = 0;
}

function flap() {
  bird.body.velocity.y -= flapVelocity;
}

new Phaser.Game(config);