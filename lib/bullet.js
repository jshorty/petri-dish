(function () {
  'use strict';
  if (typeof PetriDish === "undefined") {
    window.PetriDish = {};
  };

  var Bullet = PetriDish.Bullet = function (pos, vel, game) {
    this.pos = pos;
    this.vel = vel;
    this.color = PetriDish.Bullet.COLOR;
    this.radius = PetriDish.Bullet.RADIUS;
    this.game = game;
    this.isWrappable = false;
  };

  Bullet.COLOR = "white";
  Bullet.RADIUS = 3;
  Bullet.SPEED = 4;

  PetriDish.Util.inherits(Bullet, PetriDish.MovingObject);

  Bullet.prototype.collideWith = function(otherObject) {
    if (otherObject instanceof PetriDish.Germ) {
      otherObject.remove();
      this.remove();
      this.game.addPoints(5);
    }
  };

})();
