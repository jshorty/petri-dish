(function () {
  'use strict';
  if (typeof ZenPetriDish === "undefined") {
    window.ZenPetriDish = {};
  };

  var GameView = ZenPetriDish.GameView = function (canvasEl) {
    this.game = new ZenPetriDish.Game();
    this.ctx = canvasEl.getContext("2d");
    this.ship = this.game.ship;
  };

  GameView.prototype.start = function () {
    var ship = this.ship
    key('space', function(){
      ship.fireBullet()
    });

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

      this.step();
      this.draw(ctx);
    }
    setInterval(callback.bind(this.game, this.ctx), 20);
  };


})();
