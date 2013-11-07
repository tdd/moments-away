moments-away
============

[![Build Status](https://travis-ci.org/tdd/moments-away.png?branch=master)](https://travis-ci.org/tdd/moments-away)
[![Coverage Status](https://s3.amazonaws.com/assets.coveralls.io/badges/coveralls_100.png)](https://coveralls.io/r/tdd/moments-away)
[![Code Climate](https://codeclimate.com/github/tdd/moments-away.png)](https://codeclimate.com/github/tdd/moments-away)
[![Dependency Status](https://gemnasium.com/tdd/moments-away.png)](https://gemnasium.com/tdd/moments-away)

Moment.js durations made easier, ActiveSupport-style.

Wut?
====

[Moment.js](http://momentjs.com/) is a great JS library for manipulating dates and times in just about every way possible.  If you do this kind of stuff, you should absolutely use Moment.

It provides a system of *durations* (e.g. “1 month”) that allow reliable offsets between dates.  For instance, a month is a contextual notion: this could end up being anywhere from 28 to 31 days, not to mention the leap second thing we sometimes get at the end of the year.

However, I favor another reading style when manipulating such things, mostly because I'm used to the ActiveSupport way of doing things (in Ruby/Rails).  In Moment, you'd so something like :

```js
// The Moment way

// Based on a specific date:
var d = new Date(2013, 10, 6);
moment(d).add(3, 'months').toDate() // "3 months after d"
moment(d).subtract(1, 'year').toDate() // "1 year before d"

// Based on now:
moment().add(1, 'month').toDate()  // "1 month from now"
moment().subtract(2, 'weeks').toDate()  // "2 weeks ago"
```

This is functionally great, but I like how ActiveSupport reads better, so I created this little library that builds on Moment (which you should have available, then) and adds some stuff.  Mirroring that exact Ruby syntax in JS is fairly convoluted and bulky memory-wise, so I went with something slightly different, but here it is.

```js
// The Moments-Away way

// Based on a specific date:
var d = new Date(2013, 10, 6);
'3 months'.after(d)
'1 year'.before(d)

// Based on now:
'1 month'.fromNow()
'2 weeks'.ago()

// Based on Numbers instead of strings:
(3).months().after(d)
(1).year().before(d)

var om = 1, ow = 2;
om.months().fromNow()
ow.weeks().ago()
```

Installation
============

If you're using this in Node or installing through npm, just go with it:

```
npm install --save moments-away
```

[Bower](http://bower.io/) more your cup of tea?  Here you go:

```
bower install moments-away
```

Perhaps you favor TJ's [Component](http://component.io/)?  Not a problem:

```
component install tdd/moments-away
```

Otherwise you can just pick up the [library source file](https://raw.github.com/tdd/moments-away/master/moments-away.js) (only 1.7KB uncompressed).

ZOMG! :scream: You're extending native prototypes!
==================================================

Yes, I am.  This is necessary to achieve the level of expressiveness I was shooting for, and this does work across browsers.

If that looks too irksome for you, feel free to fork this and provide an alternative that uses, say, a global wrapper function over `String`s or `Number`s that returns the appropriate objects.

The API
=======

`String`- or `Number`-based
---------------------------

Depending on what you're working with, it'll be smoother to use either a `String`- or `Number`-based API.

You’ll usually work with strings for one-off duration specifications.  Loading the library automagically equips `String` with four new methods:

* `before(date)` returns a `Date` the precedes the `date` argument by the duration defined in the string.
* `after(date)` returns a `Date` the follows the `date` argument by the duration defined in the string.
* `ago()` returns a past `Date` with a distance defined in the string.
* `fromNow()` returns a future `Date` with a distance defined in the string.

The string should start with a number, followed possibly by whitespace, followed by one of the duration units recognized by `moment.duration` (this is every `Date` sub-unit from `milliseconds` to `years`, singular or plural, along with a few abbreviated forms, such as `ms`, `s` or `y`, for instance).  Surrounding whitespace is ignored.

If you have an existing number (variable, argument, etc.) that defines your base duration, using the `Number`-based API will feel smoother:

```js
function setAuthCookie(sessionId) {
  // var expiry = (AUTH_EXPIRY_MONTHS + ' months').fromNow(); // Ugh
  var expiry = AUTH_EXPIRY_MONTHS.months().fromNow();         // Better
  document.cookie = "authId=" + sessionId + "; expires=" + expiry;
}
```

Loading the library automagically equips `Number` with new methods for every duration unit supported by `moment.duration`, using the long forms, singular or plural:

* `milliseconds()`, `millisecond()`
* …
* `years()`, `year()`

The abbreviated forms are not used: less readable, more prone to naming conflicts.

These do not return numbers or strings, but actual Moment durations (which you could then use in regular Moment API calls), which remain contextual and will work at any later time, including on long-lived web pages.

In order to make the API homogeneous, we also extend Moment durations with the same four methods as on `String`: `before(date)`, `after(date)`, `ago()` and `fromNow()`.

Contributing
============

You can report any issues or feature requests [on GitHub](https://github.com/tdd/moments-away/issues).

Feel free to fork the repo, contribute and submit pull requests.  These must always come with updated tests.

Licence
=======

This work is MIT licence.  Read the licence [here](https://github.com/tdd/moments-away/blob/master/LICENSE).
