(function () {
  'use strict';
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var Asteroid = Asteroids.Asteroid = function (pos, game) {
    Asteroids.MovingObject.call(this,
      {pos: pos,
       vel: Asteroids.Util.randomVec(2),
       color: Asteroid.COLOR,
       radius: Asteroid.RADIUS,
       game: game})
  };

  Asteroid.COLOR = "green";
  Asteroid.RADIUS = 50;

  Asteroids.Util.inherits(Asteroid, Asteroids.MovingObject);

})();
