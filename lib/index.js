'use strict';

// MODULES //

var isArrayLike = require( 'validate.io-array-like' ),
	isMatrixLike = require( 'validate.io-matrix-like' ),
	ctors = require( 'compute-array-constructors' ),
	matrix = require( 'dstructs-matrix' ).raw,
	validate = require( './validate.js' );


// FUNCTIONS //

var nanvariance1 = require( './array.js' ),
	nanvariance2 = require( './accessor.js' ),
	nanvariance3 = require( './matrix.js' );


// NANVARIANCE //

/**
* FUNCTION: nanvariance( x[, opts] )
*	Computes the sample variance ignoring non-numeric / missing values.
*
* @param {Number[]|Array|Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array|Matrix} x - input value
* @param {Object} [opts] - function options
* @param {Boolean} [opts.bias=false] - boolean indicating whether to calculate a biased or unbiased estimate of the variance
* @param {Function} [opts.accessor] - accessor function for accessing array values
* @param {Number} [opts.dim=2] - dimension along which to compute the harmonic mean.
* @param {String} [opts.dtype="float64"] - output data type
* @returns {Number|Matrix|Null} sample variance(s) or null
*/
function nanvariance( x, options ) {
	/* jshint newcap:false */
	var opts = {},
		shape,
		ctor,
		err,
		len,
		dim,
		dt,
		d,
		m,
		encoding;

	if ( arguments.length > 1 ) {
		err = validate( opts, options );
		if ( err ) {
			throw err;
		}
	}

	encoding = opts.encoding || [];

	if ( isMatrixLike( x ) ) {
		dt = opts.dtype || 'float64';
		dim = opts.dim;

		// Determine if provided a vector...
		if ( x.shape[ 0 ] === 1 || x.shape[ 1 ] === 1 ) {
			// Treat as an array-like object:
			return nanvariance1( x.data, encoding, opts.bias );
		}
		if ( dim > 2 ) {
			throw new RangeError( 'nanvariance()::invalid option. Dimension option exceeds number of matrix dimensions. Option: `' + dim + '`.' );
		}
		if ( dim === void 0 || dim === 2 ) {
			len = x.shape[ 0 ];
			shape = [ len, 1 ];
		} else {
			len = x.shape[ 1 ];
			shape = [ 1, len ];
		}
		ctor = ctors( dt );
		if ( ctor === null ) {
			throw new Error( 'nanvariance()::invalid option. Data type option does not have a corresponding array constructor. Option: `' + dt + '`.' );
		}
		// Create an output matrix and calculate the harmonic means:
		d = new ctor( len );
		m = matrix( d, shape, dt );
		return nanvariance3( m, x, encoding, opts.bias, dim );
	}
	if ( isArrayLike( x ) ) {
		if ( opts.accessor ) {
			return nanvariance2( x, encoding, opts.accessor, opts.bias );
		}
		return nanvariance1( x, encoding, opts.bias );
	}
	throw new TypeError( 'nanvariance()::invalid input argument. First argument must be either an array or a matrix. Value: `' + x + '`.' );
} // end FUNCTION nanvariance()


// EXPORTS //

module.exports = nanvariance;
