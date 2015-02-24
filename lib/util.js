(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  };

  var Util = Asteroids.Util = {};

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
})();
