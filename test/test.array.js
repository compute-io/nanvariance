/* global describe, it, require */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Module to be tested:
	nanvariance = require( './../lib/array.js' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'array nanvariance', function tests() {

	it( 'should export a function', function test() {
		expect( nanvariance ).to.be.a( 'function' );
	});

	it( 'should compute the variance ignoring non-numeric / missing values', function test() {
		var data, expected;

		data = [ 2, 4, 5, 3, 8, 2, null, NaN, true, function(){}, {}, 'string', 999, 999 ];
		expected = 5.2;

		assert.strictEqual( nanvariance( data, [ 999 ] ), expected );
	});

	it( 'should compute the (biased) variance  ignoring non-numeric / missing values', function test() {
		var data, expected;

		data = [ 2, 4, 5, 3, 8, 2, null, NaN, true, function(){}, {}, 'string', 999, 999 ];
		expected = 4.333333333333333;

		assert.strictEqual( nanvariance( data, [ 999 ], true ), expected );
	});

	it( 'should return 0 for a single element array', function test() {
		var data, expected;

		data = [ 2 ];
		expected = 0;

		assert.strictEqual( nanvariance( data, [] ), expected );
	});

	it( 'should return null if provided an empty array', function test() {
		assert.isNull( nanvariance( [], [] ) );
	});

});
