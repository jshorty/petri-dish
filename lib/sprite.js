(function () {
  'use strict';
  if (typeof PetriDish === "undefined") {
    window.PetriDish = {};
  };

  var Sprite = PetriDish.Sprite = function (options) {
    this.context = options.context;
    this.object = options.object;
    this.width = options.width;
    this.height = options.height;
    this.image = options.image
    this.pos = options.pos;
    this.posOffsetX = options.posOffsetX;
    this.posOffsetY = options.posOffsetY;
    this.numberOfFrames = options.numberOfFrames || 1;
    this.loop = options.loop;
    this.frameIndex = 0;
    this.tickCount = 0;
    this.ticksPerFrame = options.ticksPerFrame || 0;
  };

  Sprite.DIMS = {
    player: ["200", "200"],
    germ: ["88", "88"]
  }

  PetriDish.Sprite.prototype.update = function () {
    this.tickCount += 1;
    if (this.tickCount > this.ticksPerFrame) {
      this.tickCount = 0;

      if (this.frameIndex < this.numberOfFrames - 1) {
        this.frameIndex += 1;
      }
      else if (this.loop) {
        this.frameIndex = 0;
      }
    }
  };

  PetriDish.Sprite.prototype.render = function () {
    if (this.object === PetriDish.Player) {
      var sampleX = Sprite.DIMS.player[0]
      var sampleY = Sprite.DIMS.player[1]
    } else {
      var sampleX = Sprite.DIMS.germ[0]
      var sampleY = Sprite.DIMS.germ[1]
    }

    this.context.drawImage(
      this.image,
      this.frameIndex * 880 / this.numberOfFrames,
      0,
      sampleX,
      sampleY,
      this.pos[0] + this.posOffsetX,
      this.pos[1] + this.posOffsetY,
      this.width,
      this.height
    );
  };

})();
