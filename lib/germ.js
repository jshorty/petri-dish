(function () {
  'use strict';
  if (typeof ZenPetriDish === "undefined") {
    window.ZenPetriDish = {};
  }

  var Germ = ZenPetriDish.Germ = function (pos, game) {
    ZenPetriDish.MovingObject.call(this,
      {pos: pos,
       vel: ZenPetriDish.Util.randomVec(Germ.SPEED),
       radius: 10 * Math.floor(Math.random() * 6) + 20,
       game: game});
  };

  ZenPetriDish.Util.inherits(Germ, ZenPetriDish.MovingObject);

  Germ.SPEED = 1;

  Germ.prototype.randomSprite = function () {
    var num = Math.floor(Math.random() * 5);
    var image = new Image();
    image.src = "sprites/germ" + num + ".png";
    return image;
  };

  Germ.prototype.draw = function (ctx) {
    this.sprite = this.sprite || new ZenPetriDish.Sprite({
      context: ctx,
      width: this.radius * 2.2,
      height: this.radius * 2.2,
      image: this.randomSprite(),
      pos: this.pos,
      posOffsetX: this.radius * -1.1,
      posOffsetY: this.radius * -1.1,
      numberOfFrames: 10,
      loop: true,
      ticksPerFrame: 10,
    });
    this.sprite.update();
    this.sprite.render();
  };

  Germ.prototype.collideWith = function(otherObject) {
    if (otherObject instanceof ZenPetriDish.Player) {
      otherObject.relocate();
    }
  };

  Germ.prototype.remove = function () {
    if (this.radius <= 40) {
      this.game.remove(this);
    } else {
      this.shrink();
    }
  };

  Germ.prototype.shrink = function () {
    this.radius -= 20;
    this.sprite.width = this.radius * 2.2;
    this.sprite.height = this.radius * 2.2;
    this.sprite.posOffsetX = this.radius * -1.1;
    this.sprite.posOffsetY = this.radius * -1.1;
  };
})();
