import Phaser from 'phaser';

const VELOCITY = -200;
const PIPES_COUNT = 4;
const FLAP_VELOCITY = 300;

const PIPE_VERTICAL_DISTANCE_RANGE = [150, 250]
const PIPE_HORIZONTAL_DISTANCE_RANGE = [300, 600]

class PlayScene extends Phaser.Scene {
  constructor(config) {
    super('PlayScene');

    this.config = config;
    this.bird = null;
    this.pipes = null;
  }

  preload() {
    this.load.image('sky', 'assets/sky.png');
    this.load.image('bird', 'assets/bird.png');
    this.load.image('pipe', 'assets/pipe.png');
  }

  create() {
    this.createBG();
    this.createBird();
    this.createPipes();
    this.createColliders();
    this.handleIinputs();
  }

  update() {
    this.checkGameStatus();
    this.recyclePipes();
  }

  createBG() {
    this.add.image(0, 0, 'sky').setOrigin(0, 0);
  }

  createBird() {
    this.bird = this.physics.add.sprite(
      this.config.startPosition.x,
      this.config.startPosition.y,
      'bird')
      .setOrigin(0, 0)
      .setGravityY(300)
      .setCollideWorldBounds(true);

  }

  createPipes() {
    this.pipes = this.physics.add.group();

    for (let i = 0; i < PIPES_COUNT; i++) {
      const upperPipe = this.pipes
        .create(0, 0, 'pipe')
        .setImmovable(true)
        .setOrigin(0, 1);

      const lowerPipe = this.pipes
        .create(0, 0, 'pipe')
        .setImmovable(true)
        .setOrigin(0, 0);

      this.placePipe(upperPipe, lowerPipe);
    }

    this.pipes.setVelocityX(VELOCITY);
  }

  createColliders() {
    this.physics.add.collider(
      this.bird,
      this.pipes,
      this.gameOver,
      null,
      this
    );
  }

  handleIinputs() {
    this.input.on('pointerdown', this.flap, this);
    this.input.keyboard.on('keydown-SPACE', this.flap, this);
  }

  checkGameStatus() {
    const isHitBottom = this.bird.getBounds().bottom >= this.config.height;
    const isHitTop = this.bird.y <= 0;

    if (isHitBottom || isHitTop) {
      this.gameOver();
    }
  }

  placePipe(upperPipe, lowerPipe) {
    const rightMostX = this.getRightMostPipe();
    const pipeVerticalDistance = Phaser.Math.Between(...PIPE_VERTICAL_DISTANCE_RANGE);
    const pipeVerticalPosition = Phaser.Math.Between(20, this.config.height - 20 - pipeVerticalDistance);
    const pipeHorizontalDistance = Phaser.Math.Between(...PIPE_HORIZONTAL_DISTANCE_RANGE);

    upperPipe.x = rightMostX + pipeHorizontalDistance;
    upperPipe.y = pipeVerticalPosition;

    lowerPipe.x = upperPipe.x;
    lowerPipe.y = upperPipe.y + pipeVerticalDistance;
  }

  getRightMostPipe() {
    return this.pipes
      .getChildren()
      .reduce((prevX, pipe) => Math.max(prevX, pipe.x), 0)
  }

  recyclePipes() {
    let tempPipes = [];

    this.pipes.getChildren().forEach((pipe, idx) => {
      if (pipe.getBounds().right < 0) {
        tempPipes.push(pipe);

        if (tempPipes.length === 2) {
          this.placePipe(...tempPipes);
        }
      }
    });
  }

  flap() {
    this.bird.body.velocity.y -= FLAP_VELOCITY;
  }

  gameOver() {
    this.physics.pause();
    this.bird.setTint(0xff0000);

    this.time.addEvent({
      delay: 1000,
      callback: () => {
        this.scene.resume();
        this.scene.restart();
      },
      loop: false
    });
  }
}

export default PlayScene;