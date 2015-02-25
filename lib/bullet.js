(function () {
  'use strict';
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  };

  var Bullet = Asteroids.Bullet = function (pos, vel, game) {
    this.pos = pos;
    this.vel = vel;
    this.color = Asteroids.Bullet.COLOR;
    this.radius = Asteroids.Bullet.RADIUS;
    this.game = game;
    this.isWrappable = false;
  };

  Bullet.COLOR = "black";
  Bullet.RADIUS = 3;
  Bullet.SPEED = 2;

  Asteroids.Util.inherits(Bullet, Asteroids.MovingObject);

  Bullet.prototype.collideWith = function(otherObject) {
    if (otherObject instanceof Asteroids.Asteroid) {
      otherObject.remove();
      this.remove();
    }
  };

})();
