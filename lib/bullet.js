( function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  };

  var Bullet = Asteroids.Bullet = function (pos, game) {
    this.pos = pos;
    console.log(this);
    this.vel = [2, 1]
    this.color = Bullet.COLOR;
    this.radius - Bullet.RADIUS;
    this.game = game;
  };

  Bullet.COLOR = "black";
  Bullet.Radius = 2;

  Asteroids.Util.inherits(Bullet, Asteroids.MovingObject);

  Bullet.prototype.collideWith = function(otherObject) {
    if (otherObject instanceof Asteroids.Asteroid) {
      this.game.remove(otherObject);
    }
  };

})();
