(function () {
  'use strict';
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var Asteroid = Asteroids.Asteroid = function (pos, game) {
    Asteroids.MovingObject.call(this,
      {pos: pos,
       vel: Asteroids.Util.randomVec(Asteroid.SPEED),
       color: Asteroid.COLOR,
       radius: Asteroid.RADIUS,
       game: game});
  };

  Asteroid.COLOR = "gray";
  Asteroid.RADIUS = 40;
  Asteroid.SPEED = 1;
  Asteroid.SPRITE_IMG = new Image();

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
      width: 88,
      height: 88,
      image: this.randomSprite(),
      pos: this.pos,
      posOffsetX: -44,
      posOffsetY: -44,
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
      console.log("COLLISION!");
    }
  };

})();
