import Phaser from 'phaser';

let config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
    default: 'arcade',
    arcade: {
      debug: true,
      gravity: { y: 200 }
    }
  },
  scene: {
    preload,
    create,
    update
  }
};

let bird = null;
const VELOCITY = 200;


function preload() {
  this.load.image('sky', 'assets/sky.png');
  this.load.image('bird', 'assets/bird.png');
}

function create() {
  this.add.image(0, 0, 'sky').setOrigin(0, 0);
  bird = this.physics.add.sprite(config.width / 10, config.height / 2 , 'bird').setOrigin(0.5, 0.5);

  this.input.on('pointerdown', function() {
    console.log('mouse down');
  });

  this.input.keyboard.on('keydown-SPACE', function() {
    console.log('space');
  });
}

function update(time, delta) {
}

new Phaser.Game(config);