( function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  };

  var Bullet = Asteroids.Bullet = function () {

  }

  Asteroids.Util.inherits(Bullet, MovingObject);


})();
