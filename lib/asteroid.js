(function () {
  'use strict';
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var Asteroid = Asteroids.Asteroid = function (pos, game) {
    Asteroids.MovingObject.call(this,
      {pos: pos,
       vel: Asteroids.Util.randomVec(Asteroid.SPEED),
       radius: 10 * Math.floor(Math.random() * 6) + 20,
       game: game});
  };

  Asteroid.SPEED = 1;

  Asteroids.Util.inherits(Asteroid, Asteroids.MovingObject);

  Asteroid.prototype.randomSprite = function () {
    var num = Math.floor(Math.random() * 5);
    var image = new Image();
    image.src = "sprites/germ" + num + ".png";
    return image;
  };

  Asteroid.prototype.draw = function (ctx) {
    this.sprite = this.sprite || new Asteroids.Sprite({
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

  Asteroid.prototype.collideWith = function(otherObject) {
    if (otherObject instanceof Asteroids.Ship) {
      otherObject.relocate();
    }
  };

  Asteroid.prototype.remove = function () {
    if (this.radius <= 40) {
      this.game.remove(this);
    } else {
      this.radius -= 20;
      this.sprite.width = this.radius * 2.2;
      this.sprite.height = this.radius * 2.2;
      this.sprite.posOffsetX = this.radius * -1.1;
      this.sprite.posOffsetY = this.radius * -1.1;
    }
  }
})();
