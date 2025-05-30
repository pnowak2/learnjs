import BaseScene from './base.scene';

const PIPES_COUNT = 4;
const FLAP_VELOCITY = 300;

class PlayScene extends BaseScene {
  constructor(config) {
    super('PlayScene',{ ...config, canGoBack: true });

    this.bird = null;
    this.pipes = null;
    this.isPaused = false;

    this.velocity = -200;

    this.score = 0;
    this.scoreText = null;
    this.bestScoreText = null;

    this.currentDifficulty = 'easy';
    this.difficulties = {
      'easy': {
        pipeHorizontalDistanceRange: [300, 350],
        pipeVerticalDistanceRange: [250, 350]
      },
      'normal': {
        pipeHorizontalDistanceRange: [250, 300],
        pipeVerticalDistanceRange: [180, 250]
      },
      'hard': {
        pipeHorizontalDistanceRange: [350, 450],
        pipeVerticalDistanceRange: [90, 140]
      }
    }
  }

  create() {
    super.create();

    this.createBird();
    this.createPipes();
    this.createColliders();
    this.createScore();
    this.createPauseButton();
    this.handleIinputs();
    this.listenToEvents();
  }

  update() {
    this.checkGameStatus();
    this.recyclePipes();
  }

  createBird() {
    this.bird = this.physics.add.sprite(
      this.config.startPosition.x,
      this.config.startPosition.y,
      'bird')
      .setOrigin(0, 0)
      .setGravityY(450)
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

    this.pipes.setVelocityX(this.velocity);
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

  listenToEvents() {
    if(this.pauseEvent) return;

    this.pauseEvent = this.events.on('resume', () => {
      this.initialTime = 3;
      this.countDownText = this.add.text(
        ...this.screenCenter,
        `Fly in ${this.initialTime}`,
        this.fontOptions
      )
      .setOrigin(0.5)
      .setInteractive();

      this.timedEvent = this.time.addEvent({
        delay: 1000,
        callback: this.countDown,
        callbackScope: this,
        loop: true
      });
    });
  }

  countDown() {
    this.initialTime--;
    this.countDownText.setText(`Fly in ${this.initialTime}`);

    if(this.initialTime <= 0) {
      this.countDownText.setText('');
      this.physics.resume();
      this.timedEvent.remove();
      this.isPaused = false;
    }
  }

  checkGameStatus() {
    const isHitBottom = this.bird.getBounds().bottom >= this.config.height;
    const isHitTop = this.bird.y <= 0;

    if (isHitBottom || isHitTop) {
      this.gameOver();
    }
  }

  placePipe(upperPipe, lowerPipe) {
    const difficulty = this.difficulties[this.currentDifficulty];

    const rightMostX = this.getRightMostPipe();
    const pipeVerticalDistance = Phaser.Math.Between(...difficulty.pipeVerticalDistanceRange);
    const pipeVerticalPosition = Phaser.Math.Between(20, this.config.height - 20 - pipeVerticalDistance);
    const pipeHorizontalDistance = Phaser.Math.Between(...difficulty.pipeHorizontalDistanceRange);

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
          this.updateScore();
          this.saveBestScore();
          this.increseDifficulty();
        }
      }
    });
  }

  increseDifficulty() {
    if(this.score === 3) {
      this.currentDifficulty = 'normal';
    }

    if(this.score === 5) {
      this.currentDifficulty = 'hard';
    }
  }

  flap() {
    if(!this.isPaused) {
      this.bird.body.velocity.y -= FLAP_VELOCITY;
    }
  }

  createScore() {
    this.score = 0;
    const bestScore = localStorage.getItem('bestScore');

    this.scoreText = this.add.text(16, 16, `Score: ${0}`, {
      fill: '#ffffff',
      fontSize: 32 
    });
    this.bestScoreText = this.add.text(16, 56, `Best Score: ${bestScore || 0}`, {
      fill: '#ffffff',
      fontSize: 24 
    });
  }

  createPauseButton() {
    this.isPaused = false;
    const pauseBtn = this.add.image(
      this.config.width - 16, 
      this.config.height- 16, 
      'pause')
    .setScale(3)
    .setInteractive()
    .setOrigin(1, 1);

    pauseBtn.on('pointerdown', () => {
        this.isPaused = true;
        this.physics.pause();
        this.scene.pause();
        this.scene.launch('PauseScene');
    });
  }

  updateScore() {
    this.score++;
    this.scoreText.setText(`Score: ${this.score}`);
  }

  saveBestScore() {
    const bestScoreText = localStorage.getItem('bestScore');
    const bestScore = bestScoreText && parseInt(bestScoreText, 10);

    if(!bestScore || this.score > bestScore) {
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
}

export default PlayScene;