(function () {
  'use strict';
  if (typeof ZenPetriDish === "undefined") {
    window.ZenPetriDish = {};
  };

  var Bullet = ZenPetriDish.Bullet = function (pos, vel, game) {
    this.pos = pos;
    this.vel = vel;
    this.color = ZenPetriDish.Bullet.COLOR;
    this.radius = ZenPetriDish.Bullet.RADIUS;
    this.game = game;
    this.isWrappable = false;
  };

  Bullet.COLOR = "white";
  Bullet.RADIUS = 3;
  Bullet.SPEED = 4;

  ZenPetriDish.Util.inherits(Bullet, ZenPetriDish.MovingObject);

  Bullet.prototype.collideWith = function(otherObject) {
    if (otherObject instanceof ZenPetriDish.Germ) {
      otherObject.remove();
      this.remove();
      this.game.addPoints(5);
    }
  };

})();
