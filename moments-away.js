(function() {
  var mmt = 'undefined' !== typeof window ? window.moment : require('moment');

  //***** String-based API *****

  String.prototype.before = function before(ref) {
    return adjust(ref, 'subtract', this);
  };

  String.prototype.after = function after(ref) {
    return adjust(ref, 'add', this);
  };

  String.prototype.ago = function ago() {
    return this.before(new Date());
  };

  String.prototype.fromNow = function fromNow() {
    return this.after(new Date());
  };

  //***** Number-based API *****

  var units = ['milliseconds', 'seconds', 'minutes', 'hours', 'days', 'weeks', 'months', 'years'];
  for (var index = 0, len = units.length; index < len; ++index) {
    /* jshint loopfunc: true */
    (function(units) {
      var unit = units.slice(0, -1);
      Number.prototype[units] = Number.prototype[unit] = function toDuration() {
        return mmt.duration(+this, unit);
      };
    })(units[index]);
  }

  //***** Moment::Duration-based API *****

  var target = mmt.duration().constructor.prototype;

  target.before = function before(ref) {
    return mmt(ref).subtract(this).toDate();
  };

  target.after = function after(ref) {
    return mmt(ref).add(this).toDate();
  };

  target.ago = function ago() {
    return mmt().subtract(this).toDate();
  };

  target.fromNow = function fromNow() {
    return mmt().add(this).toDate();
  };

  //***** Internal utilities *****

  var MOMENT_DOC = 'http://momentjs.com/docs/#/manipulating/add/';

  function adjust(ref, op, str) {
    var m = str.match(/^\s*(\d+|\d*\.\d+)\s*([a-z]+)\s*$/i);
    if (!m) {
      throw 'Invalid descriptor: ' + str + '.  Must be of the "NUMBER UNITS" form. See ' + MOMENT_DOC;
    }
    return mmt(ref)[op](m[2], m[1]).toDate();
  }

})();
