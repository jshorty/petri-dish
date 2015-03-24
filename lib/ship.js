(function () {
  'use strict';
  if (typeof ZenPetriDish === "undefined") {
    window.ZenPetriDish = {};
  };

  var Ship = ZenPetriDish.Ship = function (pos, game) {
    ZenPetriDish.MovingObject.call(this,
      {pos: pos,
       vel: [0,0],
       color: Ship.COLOR,
       radius: Ship.RADIUS,
       game: game})
  };

  ZenPetriDish.Util.inherits(Ship, ZenPetriDish.MovingObject);

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
    var shipSpeed = ZenPetriDish.Util.vNorm(this.vel);
    if (shipSpeed === 0) {
      return;
    }

    var relVel = [this.vel[0] * (ZenPetriDish.Bullet.SPEED / shipSpeed),
                  this.vel[1] * (ZenPetriDish.Bullet.SPEED / shipSpeed)]

    var bulletVel = [relVel[0] + this.vel[0], relVel[1] + this.vel[1]];

    var bullet = new ZenPetriDish.Bullet(this.pos.slice(), bulletVel, this.game);
    this.game.add(bullet);
  };

  Ship.prototype.collideWith = function(otherObject) {
    if (otherObject instanceof ZenPetriDish.Germ) {
      otherObject.collideWith(this);
    }
  };

})();
