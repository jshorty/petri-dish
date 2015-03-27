(function () {
  'use strict';
  if (typeof ZenPetriDish === "undefined") {
    window.ZenPetriDish = {};
  };

  var Player = ZenPetriDish.Player = function (pos, game) {
    ZenPetriDish.MovingObject.call(this,
      {pos: pos,
       vel: [0,0],
       color: Player.COLOR,
       radius: Player.RADIUS,
       game: game});

    this.spawnProtection();
    this.firing = false;
  };

  ZenPetriDish.Util.inherits(Player, ZenPetriDish.MovingObject);

  Player.RADIUS = 12;
  Player.COLOR = "white";
  Player.SPRITE = new Image();
  Player.SPRITE.src = "sprites/player.png"
  Player.SPAWN_PROTECTION_TIME = 4000;

  Player.prototype.relocate = function() {
    this.spawnProtection();
    this.pos = this.game.randomPosition();
    this.vel = [0,0];
  };

  Player.prototype.power = function(impulse) {
    this.vel[0] += impulse[0] * 0.2;
    this.vel[1] += impulse[1] * 0.2;
  };

  Player.prototype.fireBullet = function() {
    var playerSpeed = ZenPetriDish.Util.vNorm(this.vel);
    if (playerSpeed === 0) {
      return;
    }

    var relVel = [this.vel[0] * (ZenPetriDish.Bullet.SPEED / playerSpeed),
                  this.vel[1] * (ZenPetriDish.Bullet.SPEED / playerSpeed)]

    var bulletVel = [relVel[0] + this.vel[0], relVel[1] + this.vel[1]];

    var bullet = new ZenPetriDish.Bullet(this.pos.slice(), bulletVel, this.game);
    this.game.add(bullet);
  };

  Player.prototype.collideWith = function(otherObject) {
    if (otherObject instanceof ZenPetriDish.Germ && !this.spawning) {
      this.relocate();

      this.game.lives -= 1;
      if (this.game.lives < 1) {
        this.game.gameOver = true;
      }
    }
  };

  Player.prototype.draw = function (ctx) {
    this.sprite = this.sprite || new ZenPetriDish.Sprite({
      context: ctx,
      object: Player,
      width: this.radius * 2.2,
      height: this.radius * 2.2,
      image: Player.SPRITE,
      pos: this.pos,
      posOffsetX: this.radius * -1.1,
      posOffsetY: this.radius * -1.1,
    });
    this.sprite.render();
    this.sprite.update();
  };

  Player.prototype.spawnProtection = function () {
    this.spawning = true;

    setTimeout(function () {
      this.sprite.image.src = "sprites/player-spawning.png"
    }.bind(this), 50);

    setTimeout(function () {
      this.sprite.image.src = "sprites/player.png"
      this.spawning = false;
    }.bind(this), Player.SPAWN_PROTECTION_TIME)
  };
})();
