(function () {
  'use strict';
  if (typeof PetriDish === "undefined") {
    window.PetriDish = {};
  }

  var Germ = PetriDish.Germ = function (pos, game) {
    PetriDish.MovingObject.call(this,
      {pos: pos,
       vel: PetriDish.Util.randomVec(Germ.SPEED),
       radius: Germ.MAX_RADIUS,
       game: game});
  };

  PetriDish.Util.inherits(Germ, PetriDish.MovingObject);

  Germ.SPEED = 1;
  Germ.MAX_RADIUS = 60;
  Germ.SPLIT_DECREMENT = 20;
  Germ.MIN_SIZE = 20;

  Germ.prototype.randomSprite = function () {
    var num = Math.floor(Math.random() * 5);
    var image = new Image();
    image.src = "sprites/germ" + num + ".png";
    return image;
  };

  Germ.prototype.draw = function (ctx) {
    this.sprite = this.sprite || new PetriDish.Sprite({
      context: ctx,
      object: Germ,
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

  Germ.prototype.remove = function () {
    if (this.radius === Germ.MIN_SIZE) {
      this.game.remove(this);
    } else {
      this.splitInTwo();
    }
  };

  Germ.prototype.splitInTwo = function () {
    this.shrink();
    this.vel = PetriDish.Util.randomVec(Germ.SPEED * 2);
    var newPos = [this.pos[0] + 1, this.pos[1] + 1]

    var newGerm = new Germ(newPos, this.game);
    newGerm.radius = this.radius;
    newGerm.vel = PetriDish.Util.randomVec(Germ.SPEED * 2);

    setTimeout(function () {
      newGerm.sprite.image = this.sprite.image;
    }.bind(this), 21);

    this.game.add(newGerm);
  };

  Germ.prototype.shrink = function () {
    this.radius = this.radius - Germ.SPLIT_DECREMENT;
    this.sprite.width = this.radius * 2.2;
    this.sprite.height = this.radius * 2.2;
    this.sprite.posOffsetX = this.radius * -1.1;
    this.sprite.posOffsetY = this.radius * -1.1;
  }
})();
