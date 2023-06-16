import Phaser from 'phaser';

const VELOCITY = 200;
const FLAP_VELOCITY = 300;
const PIPES_TO_RENDER = 4;
const PIPE_VERTICAL_DISTANCE_RANGE = [100, 250];
const PIPE_HORIZONTAL_DISTANCE_RANGE = [350, 500];

class PlayScene extends Phaser.Scene {
  constructor(config) {
    super('PlayScene');
    this.config = config;

    this.bird = null;
    this.pipes = null;
  }

  preload() {
    this.load.image('sky', 'assets/sky.png');
    this.load.image('pipe', 'assets/pipe.png');
    this.load.image('bird', 'assets/bird.png');
  }

  create() {
    this.add.image(0, 0, 'sky').setOrigin(0, 0);

    this.bird = this.physics.add.sprite(
      this.config.startPosition.x,
      this.config.startPosition.y,
      'bird'
    ).setOrigin(0);

    this.bird.body.gravity.y = 400;

    this.pipes = this.physics.add.group();

    for (let i = 0; i < PIPES_TO_RENDER; i++) {
      const upperPipe = this.pipes.create(0, 0, 'pipe').setOrigin(0, 1);
      const lowerPipe = this.pipes.create(0, 0, 'pipe').setOrigin(0, 0);

      this.placePipe(upperPipe, lowerPipe);
    }

    this.pipes.setVelocityX(-VELOCITY);

    this.input.on('pointerdown', this.flap.bind(this));
    this.input.keyboard.on('keydown-SPACE', this.flap.bind(this));
  }

  update() {
    if (this.bird.y > this.config.height || (this.bird.y + this.bird.height) <= 0) {
      this.restartPlayerPosition();
    }

    this.recyclePipes();
  }


  placePipe(uPipe, lPipe) {
    const rightMostX = this.getRightMostPipe();

    const pipeVerticalDistance = Phaser.Math.Between(...PIPE_VERTICAL_DISTANCE_RANGE);
    const pipeVerticalPosition = Phaser.Math.Between(20, this.config.height - 20 - pipeVerticalDistance);
    const pipeHorizontalDistance = Phaser.Math.Between(...PIPE_HORIZONTAL_DISTANCE_RANGE);

    uPipe.x = rightMostX + pipeHorizontalDistance;
    uPipe.y = pipeVerticalPosition;

    lPipe.x = uPipe.x;
    lPipe.y = uPipe.y + pipeVerticalDistance;
  }

  getRightMostPipe() {
    let rightMostX = 0;

    this.pipes.getChildren().forEach(function (pipe) {
      rightMostX = Math.max(pipe.x, rightMostX);
    });

    return rightMostX;
  }

  recyclePipes() {
    const tempPipes = [];

    this.pipes.getChildren().forEach((pipe) => {
      if (pipe.getBounds().right <= 0) {
        tempPipes.push(pipe);

        if (tempPipes.length === 2) {
          this.placePipe(...tempPipes);
          return;
        }
      }
    });
  }

  flap() {
    this.bird.body.velocity.y -= FLAP_VELOCITY;
  }

  restartPlayerPosition() {
    this.bird.x = this.config.startPosition.x;
    this.bird.y = this.config.startPosition.y;
    this.bird.body.velocity.y = 0;
  }


}

export default PlayScene;