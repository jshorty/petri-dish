(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var Asteroid = Asteroids.Asteroid = function (pos) {
    COLOR = "green";
    RADIUS = 10;
    MovingObject.call(this, {pos: pos,
                             vel: /**/,
                             color: this.COLOR,
                             radius: this.RADIUS})
  };

  Asteroids.Util.inherits(Asteroid, MovingObject);







}();
