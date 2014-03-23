var load_state = {

  preload: function() { 
    // Function called first to load all the assets
    this.game.stage.backgroundColor = '#71c5cf';
    this.game.load.image('slider', 'assets/slider.png');
    this.game.load.image('pipe', 'assets/pipe.png');
    this.game.load.audio('jump', 'assets/jump.wav');
    this.game.load.audio('hit', 'assets/hit.wav');
  },
  create: function() {
    this.game.state.start('menu');
  }
};
