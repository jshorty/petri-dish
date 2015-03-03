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
  Asteroid.SPEED = 2;
  Asteroid.SPRITE_IMG = new Image();
  Asteroid.SPRITE_IMG.src = "sprites/coin.png";

  Asteroids.Util.inherits(Asteroid, Asteroids.MovingObject);

  Asteroid.prototype.draw = function (ctx) {
    var sprite = new Asteroids.Sprite({
      context: ctx,
      width: Asteroid.RADIUS * 2,
      height: Asteroid.RADIUS * 2,
      image: Asteroid.SPRITE_IMG,
      pos: this.pos
    });

    sprite.render();
  };

  Asteroid.prototype.collideWith = function(otherObject) {
    if (otherObject instanceof Asteroids.Ship) {
      otherObject.relocate();
    }
  };

})();
