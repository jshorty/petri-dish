(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  };

  var Game = Asteroids.Game = function() {
      this.addAsteroids();
      this.ship = new Asteroids.Ship(this.randomPosition(), this);
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
  };

  Game.prototype.randomPosition = function() {
    var x = Math.floor(Asteroids.Game.DIM_X * Math.random());
    var y = Math.floor(Asteroids.Game.DIM_Y * Math.random());
    return [x,y];
  };

  Game.prototype.draw = function(ctx) {
    ctx.clearRect(0, 0, Asteroids.Game.DIM_X, Asteroids.Game.DIM_Y);

    this.allObjects().forEach(function (object) {
      object.draw(ctx);
    });
  };

  Game.prototype.moveObjects = function () {
    this.allObjects().forEach(function (object) {
      object.move();
    });
  };

  Game.wrap = function(pos) {
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
    return result;
  };

  Game.prototype.checkCollisions = function () {
    for (var i = 0; i < this.allObjects().length - 1; i++) {
      for (var j = i + 1; j < this.allObjects().length; j++) {
        if (this.allObjects()[i].isCollidedWith(this.allObjects()[j])) {
          this.allObjects()[i].collideWith(this.allObjects()[j]);
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

  Game.prototype.allObjects = function () {
    return (this.asteroids.concat([this.ship]));
  }


})();
