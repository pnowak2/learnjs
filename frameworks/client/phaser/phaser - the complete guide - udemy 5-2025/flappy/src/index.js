import Phaser from 'phaser';

let config = {
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
    update
  }
};

let bird = null;
const flapVelocity = 300;
const VELOCITY = 200;
const initialBirdPosition = {
  x: config.width * 0.1,
  y: config.height / 2
};

function preload() {
  this.load.image('sky', 'assets/sky.png');
  this.load.image('bird', 'assets/bird.png');
}

function create() {
  this.add.image(0, 0, 'sky').setOrigin(0, 0);
  bird = this.physics.add.sprite(
    initialBirdPosition.x,
    initialBirdPosition.y,
    'bird')
    .setOrigin(0.5, 0.5);

  this.input.on('pointerdown', flap);
  this.input.keyboard.on('keydown-SPACE', flap);
}

function update(time, delta) {
  const isHitBottom = bird.y > config.height;
  const isHitTop = bird.y <= -bird.height;

  if (isHitBottom || isHitTop) {
    restartBirdPosition();
  }
}

function flap() {
  bird.body.velocity.y -= flapVelocity;
}

function restartBirdPosition() {
  bird.x = initialBirdPosition.x;
  bird.y = initialBirdPosition.y;
  bird.body.velocity.y = 0;
}

new Phaser.Game(config);