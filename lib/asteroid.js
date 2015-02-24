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

  Asteroids.Util.inherits(Asteroid, Asteroids.MovingObject);

  Asteroid.prototype.collideWith = function(otherObject) {
    if (otherObject instanceof Asteroids.Ship) {
      otherObject.relocate();
    }
  };

})();
