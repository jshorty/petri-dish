(function () {
  'use strict';
  if (typeof ZenPetriDish === "undefined") {
    window.ZenPetriDish = {};
  };

  var Sprite = ZenPetriDish.Sprite = function (options) {
    this.context = options.context;
    this.width = options.width;
    this.height = options.height;
    this.image = options.image;
    this.pos = options.pos;
    this.posOffsetX = options.posOffsetX;
    this.posOffsetY = options.posOffsetY;
    this.numberOfFrames = options.numberOfFrames || 1;
    this.loop = options.loop;
    this.frameIndex = 0;
    this.tickCount = 0;
    this.ticksPerFrame = options.ticksPerFrame || 0;
  };

  ZenPetriDish.Sprite.prototype.update = function () {
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

  ZenPetriDish.Sprite.prototype.render = function () {
    this.context.drawImage(
      this.image,
      this.frameIndex * 880 / this.numberOfFrames,
      0,
      88,
      88,
      this.pos[0] + this.posOffsetX,
      this.pos[1] + this.posOffsetY,
      this.width,
      this.height);
  };

})();
