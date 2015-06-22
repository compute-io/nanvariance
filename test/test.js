/* global describe, it, require */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Matrix data structure:
	matrix = require( 'dstructs-matrix' ),

	// Module to be tested:
	nanvariance = require( './../lib' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'compute-nanvariance', function tests() {

	it( 'should export a function', function test() {
		expect( nanvariance ).to.be.a( 'function' );
	});

	it( 'should throw an error if the first argument is neither array-like or matrix-like', function test() {
		var values = [
			// '5', // valid as is array-like (length)
			5,
			true,
			undefined,
			null,
			NaN,
			function(){},
			{}
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( TypeError );
		}
		function badValue( value ) {
			return function() {
				nanvariance( value );
			};
		}
	});

	it( 'should throw an error if provided an unrecognized/unsupported data type option', function test() {
		var values = [
			'beep',
			'boop'
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( Error );
		}
		function badValue( value ) {
			return function() {
				nanvariance( matrix( [2,2] ), {
					'dtype': value
				});
			};
		}
	});

	it( 'should throw an error if provided a dim option which is not a positive integer', function test() {
		var data, values;

		values = [
			'5',
			-5,
			2.2,
			true,
			undefined,
			null,
			NaN,
			[],
			{}
		];

		data = matrix( new Int32Array([1,2,3,4]), [2,2] );

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[ i ] ) ).to.throw( Error );
		}
		function badValue( value ) {
			return function() {
				nanvariance( data, {
					'dim': value
				});
			};
		}
	});

	it( 'should throw an error if provided a dim option which exceeds the number of matrix dimensions (2)', function test() {
		var data, values;

		values = [
			3,
			4,
			5
		];

		data = matrix( new Int32Array([1,2,3,4]), [2,2] );

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[ i ] ) ).to.throw( RangeError );
		}
		function badValue( value ) {
			return function() {
				nanvariance( data, {
					'dim': value
				});
			};
		}
	});

	it( 'should compute the sample variance ignoring non-numeric values', function test() {
		var data, expected;

		data = [ 2, 4, 5, 3, 8, 2, null, {}, function(){}, true ];
		expected = 5.2;

		assert.strictEqual( nanvariance( data ), expected );
	});

	it( 'should compute the sample variance ignoring missing values', function test() {
		var data, expected;

		data = [ 2, 999, 4, 5, 3, 8, 2, 999, 981 ];
		expected = 5.2;

		assert.strictEqual( nanvariance( data, {'encoding': [981, 999] } ), expected );
	});

	it( 'should compute the sample variance of a typed array ignoring non-numeric / missing values', function test() {
		var data, expected;

		data = new Int32Array( [ 2, 4, 5, 3, 8, 2, 981, 999 ] );
		expected = 5.2;

		assert.strictEqual( nanvariance( data, {'encoding': [981, 999] }  ), expected );
	});

	it( 'should compute the (biased) sample variance ignoring non-numeric values', function test() {
		var data, expected, actual;

		data = [ 2, 4, 5, 3, 8, 2, null, {}, function(){}, true ];
		expected = 5.2 * (6-1) / 6;

		actual =  nanvariance( data, {
			'bias': true
		});

		assert.strictEqual( actual, expected );
	});

	it( 'should compute the sample variance using an accessor function ignoring non-numeric values', function test() {
		var data, expected, actual;

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
			{'x':'string'}
		];
		actual = nanvariance( data, {
			'accessor': getValue
		});
		expected = 5.2;

		assert.strictEqual( actual, expected );

		function getValue( d ) {
			return d.x;
		}
	});

	it( 'should return `null` when provided an empty array', function test() {
		assert.isNull( nanvariance( [] ) );
	});

	it( 'should calculate the column variances of a matrix', function test() {
		var data, expected, s2;

		data = matrix( new Int32Array( [ 1, 2, 3, 4, 5, 6, 7, 8, 9 ] ), [3,3] );
		expected = matrix( new Float64Array( [ 1, 1, 1 ] ), [3,1] );

		s2 = nanvariance( data, {
			'dim': 2
		});

		assert.deepEqual( s2.data, expected.data );
	});

	it( 'should calculate the row variances of a matrix', function test() {
		var data, expected, s2;

		data = matrix( new Int32Array( [ 1, 2, 3, 4, 5, 6, 7, 8, 9 ] ), [3,3] );
		expected = matrix( new Float64Array( [ 9, 9, 9 ] ), [1, 3] );

		s2 = nanvariance( data, {
			'dim': 1
		});

		assert.deepEqual( s2.data, expected.data );
	});

	it( 'should calculate the variances of a matrix and output a matrix having a specified data type', function test() {
		var data, expected, s2;

		data = matrix( new Int32Array( [ 1, 2, 3, 4, 5, 6, 7, 8, 9 ] ), [3,3] );
		expected = matrix( new Int32Array( [ 1, 1, 1 ] ), [3,1] );

		s2 = nanvariance( data, {
			'dtype': 'int32'
		});

		assert.strictEqual( s2.dtype, 'int32' );
		assert.deepEqual( s2.data, expected.data );
	});

	it( 'should compute the variance for a vector (matrix with one column or row)', function test() {
		var data, expected;

		expected = 5.2;
		data = matrix( new Int32Array( [ 2, 4, 5, 3, 8, 2 ] ), [6,1] );

		assert.strictEqual( nanvariance( data ), expected );
	});

});
