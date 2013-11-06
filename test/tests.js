var assert = require('assert');
var mmt = require('moment');
var sinon = require('sinon');
require('../moments-away');

describe('String extensions', function() {
  it('should handle milliseconds', function() {
    var d = new Date();
    checkOffset('10 milliseconds'.after(d), d, 10);
    checkOffset('10milliseconds'.after(d), d, 10);
    checkOffset('10ms'.after(d), d, 10);
  });

  it('should handle seconds', function() {
    var d = new Date();
    checkOffset('10 seconds'.after(d), d, 10 * 1000);
    checkOffset('0.5s'.after(d), d, 500);
  });

  it('should handle minutes', function() {
    var d = new Date();
    checkOffset('10 minutes'.after(d), d, 10 * 60 * 1000);
    checkOffset('0.25m'.after(d), d, 15 * 1000);
  });

  it('should handle hours', function() {
    var d = new Date();
    checkOffset('3 hours'.after(d), d, 3 * 60 * 60 * 1000);
    checkOffset('0.05h'.after(d), d, 3 * 60 * 1000);
  });

  it('should handle days', function() {
    var d = new Date();
    checkOffset('10 days'.after(d), d, 10 * 24 * 60 * 60 * 1000);
    checkOffset('10d'.after(d), d, 10 * 24 * 60 * 60 * 1000);
    // moment.js rounds to the biggest lower integer amount of days from days up, so
    // 0.25 is 0, 1.5 is 1, etc.  No point testing floats, then!
  });

  it('should handle weeks', function() {
    var d = new Date();
    checkOffset('2 weeks'.after(d), d, 2 * 7 * 24 * 60 * 60 * 1000);
    checkOffset('2w'.after(d), d, 2 * 7 * 24 * 60 * 60 * 1000);
  });

  it('should handle months', function() {
    var d = new Date(2012, 0, 15), d2 = new Date(2012, 3, 15);
    checkOffset('3 months'.after(d), d2);
    checkOffset('3M'.after(d), d2);
  });

  it('should handle years', function() {
    var d = new Date(2012, 1, 15), d2 = new Date(2014, 1, 15);
    checkOffset('2 years'.after(d), d2);
    checkOffset('2y'.after(d), d2);
  });

  it('should provide .before', function() {
    var d = new Date(Date.now() + 5 * 1000);
    checkOffset('10 seconds'.before(d), d, -10 * 1000);
    checkOffset('5 seconds'.before(d), d, -5 * 1000);
  });

  it('should provide .after', function() {
    var d = new Date(Date.now() - 5 * 1000);
    checkOffset('10 seconds'.after(d), d, 10 * 1000);
    checkOffset('5 seconds'.after(d), d, 5 * 1000);
  });

  it('should provide .ago', function() {
    var clock = sinon.useFakeTimers();
    checkOffset('10 seconds'.ago(), new Date(), -10 * 1000);
    checkOffset('5 seconds'.ago(), new Date(), -5 * 1000);
    clock.restore();
  });

  it('should provide .fromNow', function() {
    var clock = sinon.useFakeTimers();
    checkOffset('10 seconds'.fromNow(), new Date(), 10 * 1000);
    checkOffset('5 seconds'.fromNow(), new Date(), 5 * 1000);
    clock.restore();
  });
});

describe('Number extensions', function() {
  describe('should provide Moment durations', function() {
    it('for milliseconds', function() {
      checkDuration((10).milliseconds(), 10, 'milliseconds');
      checkDuration((1).millisecond(), 1, 'milliseconds');
    });

    it('for seconds', function() {
      checkDuration((5).seconds(), 5, 'seconds');
      checkDuration((1).second(), 1, 'seconds');
    });

    it('for minutes', function() {
      checkDuration((42).minutes(), 42, 'minutes');
      checkDuration((1).minute(), 1, 'minutes');
    });

    it('for hours', function() {
      checkDuration((3).hours(), 3, 'hours');
      checkDuration((1).hour(), 1, 'hours');
    });

    it('for days', function() {
      checkDuration((7).days(), 7, 'days');
      checkDuration((1).day(), 1, 'days');
    });

    it('for weeks', function() {
      checkDuration((9).weeks(), 9, 'weeks');
      checkDuration((1).week(), 1, 'weeks');
    });

    it('for months', function() {
      checkDuration((11).months(), 11, 'months');
      checkDuration((1).month(), 1, 'months');
    });

    it('for years', function() {
      checkDuration((51).years(), 51, 'years');
      checkDuration((1).year(), 1, 'years');
    });

  });

  describe('should provide offset accessors', function() {
    it('.before', function() {
      var d = new Date(Date.now() + 5 * 1000);
      checkDurationOffset(10, 'seconds', 'before', d, -10000);
      checkDurationOffset(5, 'seconds', 'before', d, -5000);
    });

    it('.after', function() {
      var d = new Date(Date.now() - 5 * 1000);
      checkDurationOffset(10, 'seconds', 'after', d, 10000);
      checkDurationOffset(5, 'seconds', 'after', d, 5000);
    });

    it('.ago', function() {
      var clock = sinon.useFakeTimers();
      checkDurationOffset(10, 'seconds', 'ago', new Date(), -10000);
      checkDurationOffset(5, 'seconds', 'ago', new Date(), -5000);
      clock.restore();
    });

    it('.fromNow', function() {
      var clock = sinon.useFakeTimers();
      checkDurationOffset(10, 'seconds', 'fromNow', new Date(), 10000);
      checkDurationOffset(5, 'seconds', 'fromNow', new Date(), 5000);
      clock.restore();
    });

  });
});

function checkDuration(d, count, units) {
  var expected = mmt.duration(count, units);
  assert.equal(d.as('milliseconds'), expected.as('milliseconds'));
}

function checkDurationOffset(count, units, op, d, offset) {
  var actual = mmt.duration(count, units)[op](d);
  checkOffset(actual, d, offset);
}

function checkOffset(d1, d2, offset) {
  offset = offset || 0;
  var a = d1.getTime(), b = d2.getTime() + offset;
  assert.equal(a, b);
}
