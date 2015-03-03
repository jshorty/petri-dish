(function () {
  'use strict';
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  };

  var Sprite = Asteroids.Sprite = function (options) {
    this.context = options.context;
    this.width = options.width;
    this.height = options.height;
    this.image = options.image;
    this.pos = options.pos;
  };

  Asteroids.Sprite.prototype.render = function () {
    this.context.drawImage(
      this.image,
      0,
      0,
      this.width,
      this.height,
      this.pos[0],
      this.pos[1],
      this.width,
      this.height);
  };

})();
