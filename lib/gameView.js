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

    // Mousetrap.bind('up', function(){
    //   ship.power([0, -1]);
    // });
    // Mousetrap.bind('down', function(){
    //   ship.power([0, 1]);
    // });
    // Mousetrap.bind('left', function(){
    //   ship.power([-1, 0]);
    // });
    // Mousetrap.bind('right', function(){
    //   ship.power([1, 0]);
    // });

    Mousetrap.bind('up+left', function(){
      ship.power([-1, -1]);
    });
    Mousetrap.bind('down+left', function(){
      ship.power([-1, 1]);
    });
    Mousetrap.bind('up+right', function(){
      ship.power([1, -1]);
    });
    Mousetrap.bind('down+right', function(){
      ship.power([1, 1]);
    });

    Mousetrap.bind('space', function(){
      ship.fireBullet();
    });
  };


})();
