import Phaser from 'phaser';
import BaseScene from './base.scene';

const VELOCITY = 200;
const FLAP_VELOCITY = 380;
const PIPES_TO_RENDER = 4;
const PIPE_VERTICAL_DISTANCE_RANGE = [100, 250];
const PIPE_HORIZONTAL_DISTANCE_RANGE = [350, 500];

class PlayScene extends BaseScene {
  constructor(config) {
    super('PlayScene', config);

    this.bird = null;
    this.pipes = null;
    this.score = 0;
    this.scoreText = '';
    this.bestScoreText = '';
  }

  create() {
    super.create();

    this.createBird();
    this.createPipes();
    this.createColliders();
    this.createScore();
    this.createPause();
    this.handleInputs();
    this.listenToEvents();
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
      'bird'
    ).setOrigin(0);

    this.bird.body.gravity.y = 600;
    this.bird.setCollideWorldBounds(true);
  }

  createPipes() {
    this.pipes = this.physics.add.group();

    for (let i = 0; i < PIPES_TO_RENDER; i++) {
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

    this.pipes.setVelocityX(-VELOCITY);
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

  createColliders() {
    this.physics.add.collider(this.bird, this.pipes, this.gameOver, null, this);
  }

  createScore() {
    this.score = 0;
    const bestScore = localStorage.getItem('bestScore');

    this.scoreText = this.add.text(16, 16, `Score: ${this.score}`, {
      fontFamily: 'sans-serif',
      fontSize: '32px',
      fill: '#000'
    });
    this.bestScoreText = this.add.text(16, 52, `Best score: ${bestScore || 0}`, {
      fontFamily: 'sans-serif',
      fontSize: '20px',
      fill: '#000'
    });
  }

  createPause() {
    const pauseBtn = this.add.image(
      this.config.width - 10, 
      this.config.height - 10,
      'pause')
      .setInteractive()
      .setScale(2)
      .setOrigin(1, 1);

      pauseBtn.on('pointerdown', () => {
        this.physics.pause();
        this.scene.pause();
        this.scene.launch('PauseScene');
      })

  }

  handleInputs() {
    this.input.on('pointerdown', this.flap, this);
    this.input.keyboard.on('keydown-SPACE', this.flap, this);
  }

  recyclePipes() {
    const tempPipes = [];

    this.pipes.getChildren().forEach((pipe) => {
      if (pipe.getBounds().right <= 0) {
        tempPipes.push(pipe);

        if (tempPipes.length === 2) {
          this.placePipe(...tempPipes);
          this.increaseScore();

          return;
        }
      }
    });
  }

  flap() {
    this.bird.body.velocity.y -= FLAP_VELOCITY;
  }

  saveBestScore() {
    const bestScoreString = localStorage.getItem('bestScore');
    const bestScore = bestScoreString && parseInt(bestScoreString, 10);

    if (!bestScore || this.score > bestScore) {
      localStorage.setItem('bestScore', this.score);
    }
  }

  gameOver() {
    this.physics.pause();
    this.bird.setTint(0xff0000);

    this.saveBestScore();

    this.time.addEvent({
      delay: 1000,
      callback: () => {
        this.scene.restart();
      },
      loop: false
    });
  }

  checkGameStatus() {
    if (this.bird.getBounds().bottom >= this.config.height || this.bird.y <= 0) {
      this.gameOver();
    }
  }

  increaseScore() {
    this.score++;
    this.bestScore = this.score;

    this.scoreText.setText(`Score: ${this.score}`);
  }

  listenToEvents() {
    
  }
}

export default PlayScene;