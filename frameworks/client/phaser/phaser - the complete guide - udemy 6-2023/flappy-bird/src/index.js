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

let bird = null;
let pipeHorizontalDistance = 0;

function preload() {
  this.load.image('sky', 'assets/sky.png');
  this.load.image('bird', 'assets/bird.png');
  this.load.image('pipe', 'assets/pipe.png');
}

function create() {
  this.add.image(0, 0, 'sky').setOrigin(0, 0);

  bird = this.physics.add.sprite(INITIAL_BIRD_POSITION.x, INITIAL_BIRD_POSITION.y, 'bird').setOrigin(0);
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
  if (bird.y > config.height || (bird.y + bird.height) <= 0) {
    restartPlayerPosition();
  }
}

function placePipe(uPipe, lPipe) {
    pipeHorizontalDistance += 400;
    let pipeVerticalDistance = Phaser.Math.Between(...PIPE_VERTICAL_DISTANCE_RANGE);
    let pipeVerticalPosition = Phaser.Math.Between(20, config.height - 20 - pipeVerticalDistance);

    uPipe.x = pipeHorizontalDistance;
    uPipe.y = pipeVerticalPosition;

    lPipe.x = uPipe.x;
    lPipe.y = uPipe.y + pipeVerticalDistance;

    uPipe.body.velocity.x = -VELOCITY;
    lPipe.body.velocity.x = -VELOCITY;
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