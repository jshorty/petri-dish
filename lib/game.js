(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  };

  var Game = Asteroids.Game = function() {
      this.DIM_X = 800;
      this.DIM_Y = 800;
      this.NUM_ASTEROIDS = 10;
      this.addAsteroids();
  };

  Game.prototype.addAsteroids = function(){
      this.asteroids = [];

      var i = 0;
      while(i < this.NUM_ASTEROIDS) {
          i += 1;
          var asteroid = new Asteroids.Asteroid(this.randomPosition());
          this.asteroids.push(asteroid);
      }
      console.log(this.asteroids);
  };

  Game.prototype.randomPosition = function() {
    var x = this.DIM_X * Math.random();
    var y = this.DIM_Y * Math.random();
    return [x,y];
  };

  Game.prototype.draw = function(ctx) {
    ctx.clearRect(0, 0, this.DIM_X, this.DIM_Y);

    this.asteroids.forEach(function (asteroid) {
      asteroid.draw(ctx);
    });
  };

  Game.prototype.moveObjects = function () {
    this.asteroids.forEach(function (asteroid) {
      asteroid.move();
    });
  };

})();
