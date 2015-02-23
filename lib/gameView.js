(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  };

  var GameView = Asteroids.GameView = function (canvasEl) {
    this.game = new Asteroids.Game();
    this.ctx = canvasEl.getContext("2d");
  };

  GameView.prototype.start = function () {
    var callback = function (ctx) {
      this.moveObjects();
      this.draw(ctx);
    }
    setInterval(callback.bind(this.game, this.ctx), 20);
  };

})();
