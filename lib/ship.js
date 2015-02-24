(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  };

  var Ship = Asteroids.Ship = function (pos, game) {
    this.pos = pos;
    this.color = Ship.COLOR;
    this.radius = Ship.RADIUS;
    this.vel = [0,0];
    this.game = game;
  }

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
