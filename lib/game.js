(function () {
  'use strict';
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  };

  var Game = Asteroids.Game = function() {
    this.asteroids = [];
    this.bullets = [];
    this.ship = new Asteroids.Ship(this.randomPosition(), this);
    this.addAsteroids();
    this.score = 0
  };

  Game.DIM_X = 900;
  Game.DIM_Y = 500;
  Game.NUM_ASTEROIDS = 15;
  Game.FPS = 75;

  Game.prototype.addAsteroids = function(){
    for (var i = 0; i < Game.NUM_ASTEROIDS; i++) {
      this.add(new Asteroids.Asteroid(this.randomPosition(), this));
    }
  };

  Game.prototype.addAsteroid = function(){
    this.add(new Asteroids.Asteroid(this.edgePosition(), this));
  };

  Game.prototype.randomPosition = function() {
    var x = (Asteroids.Game.DIM_X * Math.random());
    var y = (Asteroids.Game.DIM_Y * Math.random());
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
    ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
    this.printScore(ctx);

    this.allObjects().forEach(function (object) {
      object.draw(ctx);
    });
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
      result[0] = Asteroids.Game.DIM_X + obj.radius - 0.0001;
      destroyIfUnwrappable();
    }
    else if (pos[0] > Asteroids.Game.DIM_X + limit) {
      result[0] = 0 - obj.radius + 0.0001;
      destroyIfUnwrappable();
    }

    if(pos[1] < 0 - limit) {
      result[1] = Asteroids.Game.DIM_Y + obj.radius - 0.0001;
      destroyIfUnwrappable();
    }
    else if (pos[1] > Asteroids.Game.DIM_Y + limit) {
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
    while (this.asteroids.length < 10) {
      this.addAsteroid();
    }
    this.moveObjects();
    this.checkCollisions();
  };

  Game.prototype.add = function (object) {
    if (object instanceof Asteroids.Asteroid) {
      this.asteroids.push(object);
    }
    else if (object instanceof Asteroids.Bullet) {
      this.bullets.push(object);
    }
  };

  Game.prototype.remove = function (object) {
    if (object instanceof Asteroids.Asteroid) {
      for (var i = 0; i < this.asteroids.length; i++) {
        if(this.asteroids[i].pos === object.pos) {
          this.asteroids.splice(i, 1);
        }
      }
    }
    else if (object instanceof Asteroids.Bullet) {
      for (var i = 0; i < this.bullets.length; i++) {
        if(this.bullets[i].pos === object.pos) {
          this.bullets.splice(i, 1);
        }
      }
    }
  };

  Game.prototype.allObjects = function () {
    return (this.asteroids.concat(this.bullets).concat([this.ship]));
  };

  Game.prototype.addPoints = function (points) {
    this.score += points;
  };

  Game.prototype.printScore = function (ctx) {
    ctx.font="20px System";
    ctx.fillText(this.score, Game.DIM_X - 50, Game.DIM_Y - 20);
  };

})();
