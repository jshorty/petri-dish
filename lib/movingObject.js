(function () {
  'use strict';
  if (typeof ZenPetriDish === "undefined") {
    window.ZenPetriDish = {};
  };

  var MovingObject = ZenPetriDish.MovingObject = function (options) {
    this.pos = options.pos;
    this.vel = options.vel;
    this.radius = options.radius;
    this.color = options.color;
    this.game = options.game;
    this.isWrappable = true;
  };

  MovingObject.prototype.draw = function (ctx) {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(
      this.pos[0],
      this.pos[1],
      this.radius,
      0,
      2 * Math.PI,
      false
    );
    ctx.fill();
  };

  MovingObject.prototype.move = function() {
    this.pos[0] += this.vel[0];
    this.pos[1] += this.vel[1];
    this.pos = ZenPetriDish.Game.wrapOrRemove(this);
    if (this.sprite) {
      this.sprite.pos = this.pos;
    }
  };

  MovingObject.prototype.isCollidedWith = function (otherObject) {
    var distance = ZenPetriDish.Util.distance(this.pos, otherObject.pos)
    if (distance < this.radius + otherObject.radius) {
      return true;
    }
    else {
      return false;
    }
  };

  MovingObject.prototype.remove = function () {
    this.game.remove(this);
  };

  MovingObject.prototype.collideWith = function (otherObject) {
  };

})();
