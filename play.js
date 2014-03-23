var play_state = {
  create: function() {
    var space_key = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    space_key.onDown.add(this.jump, this);

    this.pipes = game.add.group();
    this.pipes.createMultiple(30, 'pipe');
    this.timer = this.game.time.events.loop(1500, this.add_row_of_pipe, this);

    this.slider = this.game.add.sprite(100, 245, 'slider');
    this.slider.body.gravity.y = 1000;
    this.slider.anchor.setTo(-0.2, 0.5);

    score = 0;
    var style = { font: "30px Arial", fill: "#ffffff"};
    this.label_score = this.game.add.text(20, 20, "0", style);

    this.jump_sound = this.game.add.audio('jump');
    this.hit_sound = this.game.add.audio('hit');
  },

  update: function() {
    // Function called 60 times per second
    if (!this.slider.inWorld) {
      this.restart_game();
    }
    if (this.slider.angle < 20) {
      this.slider.angle += 1;
    }
    this.game.physics.overlap(this.slider, this.pipes, this.hit_pipe, null, this);
  },

  jump: function() {
    if (!this.slider.alive) {
      return;
    }
    this.game.add.tween(this.slider).to({angle: -20}, 100).start();
    this.slider.body.velocity.y = -350;
    this.jump_sound.play();
  },

  hit_pipe: function() {
    if (!this.slider.alive) {
      return;
    }
    this.slider.alive = false;
    this.game.time.events.remove(this.timer);
    this.pipes.forEachAlive(function(pipe) {
      pipe.body.velocity.x = 0;
    }, this);
    this.hit_sound.play();
  },

  restart_game: function() {
    this.game.time.events.remove(this.timer);
    this.game.state.start('menu');
  },

  add_one_pipe: function(x, y) {
    var pipe = this.pipes.getFirstDead();
    pipe.reset(x, y);
    pipe.body.velocity.x = -200;
    pipe.outOfBoundsKill = true;
  },

  add_row_of_pipe: function() {
    var hole = Math.floor(Math.random() * 5) + 1;

    for (var i = 0; i < 11; ++i) {
      if (i != hole && i != hole + 1 && i != hole + 2) {
        this.add_one_pipe(400, i * 45);
      }
    }
    this.label_score.content = score;
    score += 1;
  }
};