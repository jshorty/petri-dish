(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var Asteroid = Asteroids.Asteroid = function (pos) {
    COLOR = "green";
    RADIUS = 50;
    MovingObject.call(this, {pos: pos,
                             vel: Asteroids.Util.randomVec(100),
                             color: this.COLOR,
                             radius: this.RADIUS})
  };

  Asteroids.Util.inherits(Asteroid, MovingObject);







}();
