(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  };

  var GameView = Asteroids.GameView = function (canvasEl) {
    this.game = new Asteroids.Game();
    this.ctx = canvasEl.getContext("2d");
    this.ship = this.game.ship;
  };

  GameView.prototype.start = function () {
    this.bindKeyHandlers()
    var callback = function (ctx) {
      this.step();
      this.draw(ctx);
    }
    setInterval(callback.bind(this.game, this.ctx), 20);
  };


  GameView.prototype.bindKeyHandlers = function() {
    var ship = this.ship
    key('up', function(){
      console.log(ship);
      console.log(ship.power([0, -1]));
    });
    key('down', function(){
      console.log("DOWN PRESSED!");
      ship.power([0, 1]);
    });
    key('left', function(){
      console.log("LEFT PRESSED!");
      ship.power([-1, 0]);
    });
    key('right', function(){
      console.log("RIGHT PRESSED!")
      ship.power([1, 0]);
    });
  };


})();
