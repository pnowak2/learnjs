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
let pipes = null;

const pipeVerticalDistanceRange = [150, 250]
const pipeHorizontalDistanceRange = [300, 600]

const PIPES_COUNT = 4;

const flapVelocity = 300;
const VELOCITY = -200;
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

  pipes = this.physics.add.group();

  for (let i = 0; i < PIPES_COUNT; i++) {
    const upperPipe = pipes.create(0, 0, 'pipe').setOrigin(0, 1);
    const lowerPipe = pipes.create(0, 0, 'pipe').setOrigin(0, 0);

    placePipe(upperPipe, lowerPipe);
  }

  pipes.setVelocityX(VELOCITY);

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
  const rightMostX = getRightMostPipe();
  const pipeVerticalDistance = Phaser.Math.Between(...pipeVerticalDistanceRange);
  const pipeVerticalPosition = Phaser.Math.Between(20, config.height - 20 - pipeVerticalDistance);
  const pipeHorizontalDistance = Phaser.Math.Between(...pipeHorizontalDistanceRange);

  upperPipe.x = rightMostX + pipeHorizontalDistance;
  upperPipe.y = pipeVerticalPosition;

  lowerPipe.x = upperPipe.x;
  lowerPipe.y = upperPipe.y + pipeVerticalDistance;
}

function getRightMostPipe() {
  return pipes
    .getChildren()
    .reduce((prevX, pipe) => Math.max(prevX, pipe.x), 0)
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