import Phaser from 'phaser';

const config = {
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
    update,
  }
};

const VELOCITY = 200;
const FLAP_VELOCITY = 300;
const INITIAL_BIRD_POSITION = { x: config.width * 0.1, y: config.height / 2 };

let bird = null;

function preload() {
  this.load.image('sky', 'assets/sky.png');
  this.load.image('bird', 'assets/bird.png');
}

function create() {
  this.add.image(0, 0, 'sky').setOrigin(0, 0);
  bird = this.physics.add.sprite(INITIAL_BIRD_POSITION.x, INITIAL_BIRD_POSITION.y, 'bird').setOrigin(0);

  this.input.on('pointerdown', flap);
  this.input.keyboard.on('keydown-SPACE', flap);
}

function update(time, delta) {
  if (bird.y > config.height || (bird.y + bird.height) <= 0) {
    restartPlayerPosition();
  }
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