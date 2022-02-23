import Phaser from 'phaser'

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
    default: 'arcade',
    arcade: {
      debug: true,
    },
  },
  scene: {
    preload,
    create,
    update
  }
}

let bird = null;
let pipeHorizontalDistance = 0;

const pipeVerticalDistanceRange = [150, 250];

const initialBirdPosition = {
  x: config.width / 10,
  y: config.height / 2
};

const VELOCITY = 200;
const flapVelocity = 300;
const PIPES_TO_RENDER = 4;

function preload() {
  this.load.image('sky', 'assets/sky.png');
  this.load.image('bird', 'assets/bird.png');
  this.load.image('pipe', 'assets/pipe.png');
}

function create() {
  this.add.image(0, 0, 'sky').setOrigin(0);

  bird = this.physics.add.sprite(initialBirdPosition.x, initialBirdPosition.y, 'bird').setOrigin(0);
  bird.body.gravity.y = 400;

  for (let i = 0; i < PIPES_TO_RENDER; i++) {
    const upperPipe = this.physics.add.sprite(0, 0, 'pipe').setOrigin(0, 1);
    const lowerPipe = this.physics.add.sprite(0, 0, 'pipe').setOrigin(0, 0);

    placePipe(upperPipe, lowerPipe);
  }

  this.input.on('pointerdown', flap);
  this.input.keyboard.on('keydown-SPACE', flap);
}

function update(time, delta) {
  if (bird.y > config.height || bird.y < -bird.height) {
    restartBirdPosition();
  }
}

function placePipe(uPipe, lPipe) {
    pipeHorizontalDistance += 400;

    let pipeVerticalDistance = Phaser.Math.Between(...pipeVerticalDistanceRange);
    let pipeVerticalPosition = Phaser.Math.Between(0 + 20, config.height - 20 - pipeVerticalDistance);

    uPipe.x = pipeHorizontalDistance;
    uPipe.y = pipeVerticalPosition;

    lPipe.x = uPipe.x;
    lPipe.y = uPipe.y + pipeVerticalDistance;

    uPipe.body.velocity.x = -200;
    lPipe.body.velocity.x = -200;
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