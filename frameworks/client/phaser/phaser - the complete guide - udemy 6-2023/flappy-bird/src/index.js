import Phaser, { UP } from 'phaser';

const config = {
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
    update,
  }
};

const VELOCITY = 200;
const PIPES_TO_RENDER = 4;
const FLAP_VELOCITY = 300;
const INITIAL_BIRD_POSITION = { x: config.width * 0.1, y: config.height / 2 };
const PIPE_VERTICAL_DISTANCE_RANGE = [100, 250];
const PIPE_HORIZONTAL_DISTANCE_RANGE = [350, 500];

let bird = null;
let pipes = null;

function preload() {
  this.load.image('sky', 'assets/sky.png');
  this.load.image('bird', 'assets/bird.png');
  this.load.image('pipe', 'assets/pipe.png');
}

function create() {
  this.add.image(0, 0, 'sky').setOrigin(0, 0);

  bird = this.physics.add.sprite(INITIAL_BIRD_POSITION.x, INITIAL_BIRD_POSITION.y, 'bird').setOrigin(0);
  bird.body.gravity.y = 400;

  pipes = this.physics.add.group();

  for (let i = 0; i < PIPES_TO_RENDER; i++) {
    const upperPipe = pipes.create(0, 0, 'pipe').setOrigin(0, 1);
    const lowerPipe = pipes.create(0, 0, 'pipe').setOrigin(0, 0);

    placePipe(upperPipe, lowerPipe);
  }

  pipes.setVelocityX(-VELOCITY);

  this.input.on('pointerdown', flap);
  this.input.keyboard.on('keydown-SPACE', flap);
}

function update(time, delta) {
  if (bird.y > config.height || (bird.y + bird.height) <= 0) {
    restartPlayerPosition();
  }

  recyclePipes();
}

function placePipe(uPipe, lPipe) {
    const rightMostX = getRightMostPipe();

    const pipeVerticalDistance = Phaser.Math.Between(...PIPE_VERTICAL_DISTANCE_RANGE);
    const pipeVerticalPosition = Phaser.Math.Between(20, config.height - 20 - pipeVerticalDistance);
    const pipeHorizontalDistance = Phaser.Math.Between(...PIPE_HORIZONTAL_DISTANCE_RANGE);

    uPipe.x = rightMostX + pipeHorizontalDistance;
    uPipe.y = pipeVerticalPosition;

    lPipe.x = uPipe.x;
    lPipe.y = uPipe.y + pipeVerticalDistance;
}

function getRightMostPipe() {
  let rightMostX = 0;

  pipes.getChildren().forEach(function(pipe) {
    rightMostX = Math.max(pipe.x, rightMostX);
  });

  return rightMostX;
}

function recyclePipes() {
  const tempPipes = [];

  pipes.getChildren().forEach((pipe) => {
    if(pipe.getBounds().right <= 0) {
      tempPipes.push(pipe);

      if(tempPipes.length === 2) {
        placePipe(...tempPipes);
        return;
      }
    }
  });
}

function flap() {
  bird.body.velocity.y -= FLAP_VELOCITY;
}

function restartPlayerPosition() {
  bird.x = INITIAL_BIRD_POSITION.x;
  bird.y = INITIAL_BIRD_POSITION.y;
  bird.body.velocity.y = 0;
}

new Phaser.Game(config);
