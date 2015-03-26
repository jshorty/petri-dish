(function () {
  'use strict';
  if (typeof ZenPetriDish === "undefined") {
    window.ZenPetriDish = {};
  };

  var GameView = ZenPetriDish.GameView = function (canvasEl) {
    this.game = new ZenPetriDish.Game();
    this.ctx = canvasEl.getContext("2d");
    this.ctx.font = "24px System"
    this.player = this.game.player;
  };

  GameView.prototype.start = function () {
    var player = this.player
    key('space', function(){
      player.fireBullet()
    });

    var callback = function (ctx) {

      if (key.isPressed('up')) {
        player.power([0, -1]);
      }
      if (key.isPressed('down')) {
        player.power([0, 1]);
      }
      if (key.isPressed('left')) {
        player.power([-1, 0]);
      }
      if (key.isPressed('right')) {
        player.power([1, 0]);
      }

      this.step();
      this.draw(ctx);
    }
    setInterval(callback.bind(this.game, this.ctx), 20);
  };
})();
