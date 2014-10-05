nanvariance
===
[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Coverage Status][coveralls-image]][coveralls-url] [![Dependencies][dependencies-image]][dependencies-url]

> Computes the sample variance over an array of values ignoring any values which are not numeric.


## Installation

``` bash
$ npm install compute-nanvariance
```

For use in the browser, use [browserify](https://github.com/substack/node-browserify).


## Usage

To use the module,

``` javascript
var nanvariance = require( 'compute-nanvariance' );
```

#### nanvariance( arr )

Computes the sample variance ignoring non-numeric values.

``` javascript
var data = [ 10, 2, 100, NaN, 34, NaN, 0 ];

var s2 = nanvariance( data );
```


## Examples

``` javascript
var nanvariance = require( 'compute-nanvariance' );

var data = new Array( 1000 );

for ( var i = 0; i < data.length; i++ ) {
	if ( i%5 === 0 ) {
		data[ i ] = NaN;
	} else {
		data[ i ] = Math.random() * 100;
	}
}

console.log( nanvariance( data ) );
```

To run the example code from the top-level application directory,

``` bash
$ node ./examples/index.js
```


## Notes

The sample variance of an array containing non-numeric values is equal to the sample variance of an equivalent array which contains only the numeric values. Hence,

``` javascript
var d1 = [ 1, NaN, 2, 3, NaN ],
    d2 = [ 1, 2, 3 ];

console.log( nanvariance( d1 ) === nanvariance( d2 ) );
// returns true
```



## Tests

### Unit

Unit tests use the [Mocha](http://visionmedia.github.io/mocha) test framework with [Chai](http://chaijs.com) assertions. To run the tests, execute the following command in the top-level application directory:

``` bash
$ make test
```

All new feature development should have corresponding unit tests to validate correct functionality.


### Test Coverage

This repository uses [Istanbul](https://github.com/gotwarlost/istanbul) as its code coverage tool. To generate a test coverage report, execute the following command in the top-level application directory:

``` bash
$ make test-cov
```

Istanbul creates a `./reports/coverage` directory. To access an HTML version of the report,

``` bash
$ make view-cov
```


## License

[MIT license](http://opensource.org/licenses/MIT). 


---
## Copyright

Copyright &copy; 2014. Athan Reines.


[npm-image]: http://img.shields.io/npm/v/compute-nanvariance.svg
[npm-url]: https://npmjs.org/package/compute-nanvariance

[travis-image]: http://img.shields.io/travis/compute-io/nanvariance/master.svg
[travis-url]: https://travis-ci.org/compute-io/nanvariance

[coveralls-image]: https://img.shields.io/coveralls/compute-io/nanvariance/master.svg
[coveralls-url]: https://coveralls.io/r/compute-io/nanvariance?branch=master

[dependencies-image]: http://img.shields.io/david/compute-io/nanvariance.svg
[dependencies-url]: https://david-dm.org/compute-io/nanvariance

[dev-dependencies-image]: http://img.shields.io/david/dev/compute-io/nanvariance.svg
[dev-dependencies-url]: https://david-dm.org/dev/compute-io/nanvariance

[github-issues-image]: http://img.shields.io/github/issues/compute-io/nanvariance.svg
[github-issues-url]: https://github.com/compute-io/nanvariance/issues