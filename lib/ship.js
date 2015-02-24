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
    console.log(this);
  };

  Asteroids.Util.inherits(Ship, Asteroids.MovingObject);

  Ship.RADIUS = 20;
  Ship.COLOR = "red";
  Ship.ACCELERATION = 1;

  Ship.prototype.relocate = function() {
    this.pos = this.game.randomPosition();
    this.vel = [0,0];
  };

  Ship.prototype.power = function(impulse) {
    this.vel[0] += impulse[0] * Asteroids.Ship.ACCELERATION;
    this.vel[1] += impulse[1] * Asteroids.Ship.ACCELERATION;
  };

  Ship.prototype.fireBullet = function () {
    console.log("BEFORE:" + this.vel);
    this.game.add(new Asteroids.Bullet(this.pos, this.game));
    console.log("AFTER:" + this.vel);
  };

})();
