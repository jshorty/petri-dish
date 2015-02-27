(function () {
  'use strict';
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  };

  var GameView = Asteroids.GameView = function (canvasEl) {
    this.game = new Asteroids.Game();
    this.ctx = canvasEl.getContext("2d");
    this.ship = this.game.ship;
  };

  GameView.prototype.start = function () {
    var ship = this.ship
    var callback = function (ctx) {

      if (key.isPressed('up')) {
        ship.power([0, -1]);
      }
      if (key.isPressed('down')) {
        ship.power([0, 1]);
      }
      if (key.isPressed('left')) {
        ship.power([-1, 0]);
      }
      if (key.isPressed('right')) {
        ship.power([1, 0]);
      }
      if (key.isPressed('space')) {
        ship.fireBullet();
      }

      this.step();
      this.draw(ctx);
    }
    setInterval(callback.bind(this.game, this.ctx), 20);
  };


})();
