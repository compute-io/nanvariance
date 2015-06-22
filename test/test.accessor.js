/* global describe, it, require */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Module to be tested:
	nanvariance = require( './../lib/accessor.js' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'accessor nanvariance', function tests() {

	it( 'should export a function', function test() {
		expect( nanvariance ).to.be.a( 'function' );
	});

	it( 'should compute the variance using an accessor ignoring non-numeric / missing values', function test() {
		var data, expected;

		data = [
			{'x':2},
			{'x':4},
			{'x':5},
			{'x':3},
			{'x':8},
			{'x':2},
			{'x':true},
			{'x':NaN},
			{'x':{}},
			{'x':function(){}},
			// encode missing values as 999
			{'x':999},
			{'x':999}
		];
		expected = 5.2;

		assert.strictEqual( nanvariance( data, [ 999 ], getValue ), expected );

		function getValue( d ) {
			return d.x;
		}
	});

	it( 'should compute the (biased) variance using an accessor ignoring non-numeric / missing values', function test() {
		var data, expected;

		data = [
			{'x':2},
			{'x':4},
			{'x':5},
			{'x':3},
			{'x':8},
			{'x':2},
			{'x':true},
			{'x':NaN},
			{'x':{}},
			{'x':function(){}},
			{'x':'string'},
			// encode missing values as 999
			{'x':999},
			{'x':999}
		];
		expected = 4.333333333333333;

		assert.strictEqual( nanvariance( data, [ 999 ], getValue, true ), expected );

		function getValue( d ) {
			return d.x;
		}
	});

	it( 'should return 0 for a single element array', function test() {
		var data, expected;

		data = [ {'x':2} ];
		expected = 0;

		assert.strictEqual( nanvariance( data, [], getValue ), expected );

		function getValue( d ) {
			return d.x;
		}
	});

	it( 'should return null if provided an empty array', function test() {
		assert.isNull( nanvariance( [], [], getValue ) );

		function getValue( d ) {
			return d.x;
		}
	});

});
