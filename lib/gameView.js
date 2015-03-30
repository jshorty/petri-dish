(function () {
  'use strict';
  if (typeof PetriDish === "undefined") {
    window.PetriDish = {};
  };

  var GameView = PetriDish.GameView = function (canvasEl) {
    this.game = new PetriDish.Game();
    this.gameOver = false;
    this.ctx = canvasEl.getContext("2d");
    this.player = this.game.player;
  };

  GameView.prototype.start = function () {
    var gameView = this;

    var callback = function (ctx) {
      gameView.checkForGameOver();
      gameView.checkIfFiring();
      gameView.checkIfMoving();
      this.step();
      this.draw(ctx);
    }

    this.gameLoop = setInterval(
      callback.bind(this.game, this.ctx),
      PetriDish.Game.STEP_RATE
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

  GameView.prototype.checkForGameOver = function () {
    if (this.game.gameOver) {
      clearInterval(this.gameLoop);
      this.gameOverWindow();
    }
  };

  GameView.prototype.gameOverWindow = function () {
    document.getElementById("game-over-window").style.display = "block"

    document.getElementById("replay-button").addEventListener("click",
      function () {
        var canvasEl = document.getElementById("game-canvas")
        this.game = new PetriDish.Game();
        this.gameOver = false;
        this.player = this.game.player;
        document.getElementById("game-over-window").style.display = "none";
      }
    );

    document.getElementById("home-link").addEventListener("click",
      function () {
        window.location.replace("http://jshorty.com");
      }
    );

    this.showFinalScore();
  };

  GameView.prototype.showFinalScore = function () {
    document.getElementById("score-points")
            .innerHTML = "POINTS: " + this.game.score.toString();
    document.getElementById("score-time")
            .innerHTML = "TIME: " + this.game.timer.toString();
    document.getElementById("score-final")
            .innerHTML = "FINAL SCORE: " +
              (this.game.score + this.game.timer).toString();
  };
})();
