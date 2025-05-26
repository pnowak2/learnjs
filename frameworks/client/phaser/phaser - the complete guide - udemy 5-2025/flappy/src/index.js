import Phaser from 'phaser';

let config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
    default: 'arcade',
    arcade: {
      debug: true,
      // gravity: { y: 400 }
    }
  },
  scene: {
    preload,
    create,
    update
  }
};

let bird = null;

const pipeVerticalDistanceRange = [150, 250]
let pipeHorizontalDistance = 0;
const PIPES_COUNT = 4;

const flapVelocity = 300;
const VELOCITY = 200;
const initialBirdPosition = {
  x: config.width * 0.1,
  y: config.height / 2
};

function preload() {
  this.load.image('sky', 'assets/sky.png');
  this.load.image('bird', 'assets/bird.png');
  this.load.image('pipe', 'assets/pipe.png');
}

function create() {
  this.add.image(0, 0, 'sky').setOrigin(0, 0);
  bird = this.physics.add.sprite(
    initialBirdPosition.x,
    initialBirdPosition.y,
    'bird')
    .setOrigin(0.5, 0.5)
    .setGravityY(300);

  for (let i = 0; i < PIPES_COUNT; i++) {
    const upperPipe = this.physics.add.sprite(0, 0, 'pipe').setOrigin(0, 1);
    const lowerPipe = this.physics.add.sprite(0, 0, 'pipe').setOrigin(0, 0);

    placePipe(upperPipe, lowerPipe);
  }


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

function placePipe(upperPipe, lowerPipe) {
  pipeHorizontalDistance += 400;

  let pipeVerticalDistance = Phaser.Math.Between(...pipeVerticalDistanceRange);
  let pipeVerticalPosition = Phaser.Math.Between(20, config.height - 20 - pipeVerticalDistance);

  upperPipe.x = pipeHorizontalDistance;
  upperPipe.y = pipeVerticalPosition;

  lowerPipe.x = upperPipe.x;
  lowerPipe.y = upperPipe.y + pipeVerticalDistance;

  upperPipe.body.velocity.x = -200;
  lowerPipe.body.velocity.x = upperPipe.body.velocity.x;
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