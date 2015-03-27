(function () {
  'use strict';
  if (typeof PetriDish === "undefined") {
    window.PetriDish = {};
  };

  var Util = PetriDish.Util = {};

  Util.inherits = function(ChildClass, ParentClass) {
    function Surrogate () {};
    Surrogate.prototype = ParentClass.prototype;
    ChildClass.prototype = new Surrogate();
  };

  Util.randomVec = function (length) {
    var x = (Math.random() * length);
      x = x * Util.randomDir()
    var y = (Math.sqrt((length * length) - (x * x)));
      y = y * Util.randomDir();
    return [x, y];
  };

  Util.randomDir = function () {
    var direction = (Math.random() >= 0.5) ? 1 : -1;
    return direction;
  };

  Util.distance = function (pos1, pos2) {
    var dx = Math.abs(pos1[0] - pos2[0]);
    var dy = Math.abs(pos1[1] - pos2[1]);
    return Math.sqrt(dx * dx + dy * dy);
  };

  Util.vNorm = function (vector) {
    return Util.distance([0,0], vector);
  };
})();
