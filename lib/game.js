(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  };

  var Game = Asteroids.Game = function() {
      this.addAsteroids();
  };

  Game.DIM_X = 800;
  Game.DIM_Y = 800;
  Game.NUM_ASTEROIDS = 10;

  Game.prototype.addAsteroids = function(){
      this.asteroids = [];

      var i = 0;
      while(i < Asteroids.Game.NUM_ASTEROIDS) {
          i += 1;
          var asteroid = new Asteroids.Asteroid(this.randomPosition(), this);
          this.asteroids.push(asteroid);
      }
      console.log(this.asteroids);
  };

  Game.prototype.randomPosition = function() {
    var x = Math.floor(Asteroids.Game.DIM_X * Math.random());
    var y = Math.floor(Asteroids.Game.DIM_Y * Math.random());
    return [x,y];
  };

  Game.prototype.draw = function(ctx) {
    ctx.clearRect(0, 0, Asteroids.Game.DIM_X, Asteroids.Game.DIM_Y);

    this.asteroids.forEach(function (asteroid) {
      asteroid.draw(ctx);
    });
  };

  Game.prototype.moveObjects = function () {
    this.asteroids.forEach(function (asteroid) {
      asteroid.move();
    });
  };

  Game.wrap = function(pos) {
    console.log("about to wrap: " + pos);
    console.log(this.DIM_Y);
    var result = pos;
    var limit = Asteroids.Asteroid.RADIUS
    var justBelowLimit = Asteroids.Asteroid.RADIUS - 0.0001
    var justAboveLimit = Asteroids.Asteroid.RADIUS + 0.0001

    if(pos[0] < 0 - limit) {
      result[0] = Asteroids.Game.DIM_X + justBelowLimit;
    }
    else if (pos[0] > Asteroids.Game.DIM_X + limit) {
      result[0] = 0 - justAboveLimit;
    }

    if(pos[1] < 0 - limit) {
      result[1] = Asteroids.Game.DIM_Y + justBelowLimit;
    }
    else if (pos[1] > Asteroids.Game.DIM_Y + limit) {
      result[1] = 0 - justAboveLimit;
    }
    console.log("wrapped:" + result);
    return result;
  };

  Game.prototype.checkCollisions = function () {
    for (var i = 0; i < this.asteroids.length - 1; i++) {
      for (var j = i + 1; j < this.asteroids.length; j++) {
        if (this.asteroids[i].isCollidedWith(this.asteroids[j])) {
          console.log("COLLISION!");
          this.asteroids[i].collideWith(this.asteroids[j]);
        }
      }
    }
  };

  Game.prototype.step = function() {
    this.moveObjects();
    this.checkCollisions();
  };

  Game.prototype.remove = function (asteroid) {
    for (var i = 0; i < this.asteroids.length; i++) {
      if(this.asteroids[i].pos === asteroid.pos) {
        this.asteroids.splice(i, 1);
      }
    }
  };


})();
