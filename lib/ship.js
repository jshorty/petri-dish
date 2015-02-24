(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  };

  var Ship = Asteroids.Ship = function (pos, game) {
    Asteroids.MovingObject.call(this,
      {pos: pos,
       vel: [0,0],
       color: Ship.COLOR,
       radius: Ship.RADIUS,
       game: game})
  };

  Asteroids.Util.inherits(Ship, Asteroids.MovingObject);

  Ship.RADIUS = 20
  Ship.COLOR = "red"

  Ship.prototype.relocate = function() {
    this.pos = this.game.randomPosition();
    this.vel = [0,0];
  };

  Ship.prototype.power = function(impulse) {
    this.vel[0] += impulse[0];
    this.vel[1] += impulse[1];
  };













})();
