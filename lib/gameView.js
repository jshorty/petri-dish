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
      ship.power([0, -1]);
    });
    key('down', function(){
      ship.power([0, 1]);
    });
    key('left', function(){
      ship.power([-1, 0]);
    });
    key('right', function(){
      ship.power([1, 0]);
    });

    key('space', function(){
      ship.fireBullet();
      console.log(ship.game.allObjects());
    });
  };


})();
