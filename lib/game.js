(function () {
  'use strict';
  if (typeof PetriDish === "undefined") {
    window.PetriDish = {};
  };

  var Game = PetriDish.Game = function() {
    this.gameOver = false;
    this.germs = [];
    this.bullets = [];
    this.player = new PetriDish.Player(this.randomPosition(), this);
    this.addGerms();
    this.score = 0;
    this.timer = 0;
    this.startTimer();
    this.lives = Game.NUM_LIVES;
  };

  Game.DIM_X = window.innerWidth;
  Game.DIM_Y = window.innerHeight;
  Game.STEP_RATE = 20;
  Game.INITIAL_GERMS = 5;
  Game.ADD_INTERVAL = 10;
  Game.NUM_LIVES = 3;
  Game.FPS = 50;

  Game.prototype.addGerms = function(){
    for (var i = 0; i < Game.INITIAL_GERMS; i++) {
      this.add(new PetriDish.Germ(this.randomPosition(), this));
    }
  };

  Game.prototype.addGerm = function(){
    this.add(new PetriDish.Germ(this.edgePosition(), this));
  };

  Game.prototype.randomPosition = function() {
    var x = (PetriDish.Game.DIM_X * Math.random());
    var y = (PetriDish.Game.DIM_Y * Math.random());
    return [x,y];
  };

  Game.prototype.edgePosition = function() {
    var xOrY = Math.floor(Math.random() * 2);
    if (xOrY === 0) {
      var x = Math.floor(Math.random() * (Game.DIM_X + 1));
      var y = Math.floor(Math.random () * 2) * Game.DIM_Y;
    }
    else {
      var x = Math.floor(Math.random () * 2) * Game.DIM_X;
      var y = Math.floor(Math.random() * (Game.DIM_Y + 1));
    }
    return [x, y];
  }

  Game.prototype.draw = function(ctx) {
    ctx.canvas.width  = Game.DIM_X;
    ctx.canvas.height = Game.DIM_Y;

    ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);

    this.allObjects().forEach(function (object) {
      object.draw(ctx);
    });

    ctx.font = "24px System"
    ctx.fillStyle = "white"

    this.printTime(ctx);
    this.printScore(ctx);
    this.printLives(ctx);
  };

  Game.prototype.moveObjects = function () {
    this.allObjects().forEach(function (object) {
      object.move();
    });
  };

  Game.wrapOrRemove = function(obj) {
    var pos = obj.pos;
    var result = pos;
    var limit = obj.radius;

    function destroyIfUnwrappable () {
      if (!obj.isWrappable) {
        obj.remove();
      }
    };

    if(pos[0] < 0 - limit) {
      result[0] = PetriDish.Game.DIM_X + obj.radius - 0.0001;
      destroyIfUnwrappable();
    }
    else if (pos[0] > PetriDish.Game.DIM_X + limit) {
      result[0] = 0 - obj.radius + 0.0001;
      destroyIfUnwrappable();
    }

    if(pos[1] < 0 - limit) {
      result[1] = PetriDish.Game.DIM_Y + obj.radius - 0.0001;
      destroyIfUnwrappable();
    }
    else if (pos[1] > PetriDish.Game.DIM_Y + limit) {
      result[1] = 0 - obj.radius + 0.0001;
      destroyIfUnwrappable();
    }
    return result;
  };

  Game.prototype.checkCollisions = function () {
    for (var i = 0; i < this.allObjects().length - 1; i++) {
      for (var j = i + 1; j < this.allObjects().length; j++) {
        if (this.allObjects()[j].isCollidedWith(this.allObjects()[i])) {
          this.allObjects()[j].collideWith(this.allObjects()[i]);
        }
      }
    }
  };

  Game.prototype.step = function() {
    while (this.germs.length < this.totalGerms()) {
      this.addGerm();
    }
    this.moveObjects();
    this.checkCollisions();
  };

  Game.prototype.add = function (object) {
    if (object instanceof PetriDish.Germ) {
      this.germs.push(object);
    }
    else if (object instanceof PetriDish.Bullet) {
      this.bullets.push(object);
    }
  };

  Game.prototype.remove = function (object) {
    if (object instanceof PetriDish.Germ) {
      for (var i = 0; i < this.germs.length; i++) {
        if(this.germs[i].pos === object.pos) {
          this.germs.splice(i, 1);
        }
      }
    }
    else if (object instanceof PetriDish.Bullet) {
      for (var i = 0; i < this.bullets.length; i++) {
        if(this.bullets[i].pos === object.pos) {
          this.bullets.splice(i, 1);
        }
      }
    }
  };

  Game.prototype.allObjects = function () {
    return (this.germs.concat(this.bullets).concat([this.player]));
  };

  Game.prototype.addPoints = function (points) {
    this.score += points;
  };

  Game.prototype.printScore = function (ctx) {
    ctx.fillText(this.score + "pts", Game.DIM_X - 100, 30);
  };

  Game.prototype.printTime = function (ctx) {
    var minutes = Math.floor(this.timer / 60).toString();
    var seconds = (this.timer % 60).toString();

    if (minutes.length == 1) {
      minutes = "0" + minutes;
    }
    if (seconds.length == 1) {
      seconds = "0" + seconds;
    }

    ctx.fillText((minutes + ":" + seconds), Game.DIM_X - 180, 30)
  };

  Game.prototype.printLives = function (ctx) {
    ctx.fillText("Lives: " + this.lives, Game.DIM_X - 280, 30);
  }

  Game.prototype.startTimer = function () {
    setInterval(function () {
      this.timer += 1
    }.bind(this), 1000);
  };

  Game.prototype.totalGerms = function () {
    return Math.floor(this.timer / Game.ADD_INTERVAL) + Game.INITIAL_GERMS
  };
})();
