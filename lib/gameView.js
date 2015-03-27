(function () {
  'use strict';
  if (typeof ZenPetriDish === "undefined") {
    window.ZenPetriDish = {};
  };

  var GameView = ZenPetriDish.GameView = function (canvasEl) {
    this.game = new ZenPetriDish.Game();
    this.ctx = canvasEl.getContext("2d");
    this.ctx.font = "24px System"
    this.ctx.fillStyle = "white"
    this.player = this.game.player;
  };

  GameView.prototype.start = function () {
    var gameView = this;
    var callback = function (ctx) {
      gameView.checkIfFiring();
      gameView.checkIfMoving();
      this.step();
      this.draw(ctx);
    }
    
    setInterval(
      callback.bind(this.game, this.ctx),
      ZenPetriDish.Game.STEP_RATE
    );
  };

  GameView.prototype.checkIfFiring = function () {
    if (!this.player.firing && key.isPressed('space')) {
      this.player.firing = true;
      this.player.fireBullet()
      this.firingCoolDown();
    }
  };

  GameView.prototype.checkIfMoving = function () {
    if (key.isPressed('up')) {
      this.player.power([0, -1]);
    }
    if (key.isPressed('down')) {
      this.player.power([0, 1]);
    }
    if (key.isPressed('left')) {
      this.player.power([-1, 0]);
    }
    if (key.isPressed('right')) {
      this.player.power([1, 0]);
    }
  };

  GameView.prototype.firingCoolDown = function () {
    setTimeout(function () {
      this.player.firing = false;
    }.bind(this), 300)
  };
})();
