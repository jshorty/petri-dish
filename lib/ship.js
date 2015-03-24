(function () {
  'use strict';
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  };

  var Ship = Asteroids.Ship = function (pos, game) {
    Asteroids.MovingObject.call(this,
      {pos: pos,
       vel: [0,0],
       color: Ship.COLOR,
       radius: Ship.RADIUS,
       game: game})
  };

  Asteroids.Util.inherits(Ship, Asteroids.MovingObject);

  Ship.RADIUS = 12;
  Ship.COLOR = "white";

  Ship.prototype.relocate = function() {
    this.pos = this.game.randomPosition();
    this.vel = [0,0];
  };

  Ship.prototype.power = function(impulse) {
    this.vel[0] += impulse[0] * 0.2;
    this.vel[1] += impulse[1] * 0.2;
  };

  Ship.prototype.fireBullet = function() {
    var shipSpeed = Asteroids.Util.vNorm(this.vel);
    if (shipSpeed === 0) {
      return;
    }

    var relVel = [this.vel[0] * (Asteroids.Bullet.SPEED / shipSpeed),
                  this.vel[1] * (Asteroids.Bullet.SPEED / shipSpeed)]

    var bulletVel = [relVel[0] + this.vel[0], relVel[1] + this.vel[1]];

    var bullet = new Asteroids.Bullet(this.pos.slice(), bulletVel, this.game);
    this.game.add(bullet);
  };

  Ship.prototype.collideWith = function(otherObject) {
    if (otherObject instanceof Asteroids.Asteroid) {
      otherObject.collideWith(this);
    }
  };

})();
