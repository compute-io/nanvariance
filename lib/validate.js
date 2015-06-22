'use strict';

// MODULES //

var isArray = require( 'validate.io-array' ),
	isBoolean = require( 'validate.io-boolean-primitive'),
	isObject = require( 'validate.io-object' ),
	isFunction = require( 'validate.io-function' ),
	isString = require( 'validate.io-string-primitive' ),
	isPositiveInteger = require( 'validate.io-positive-integer' );


// VALIDATE //

/**
* FUNCTION: validate( opts, options )
*	Validates function options.
*
* @param {Object} opts - destination for validated options
* @param {Object} options - function options
* @param {Array} [options.encoding=[] ] - array whose elements encode missing values
* @param {Function} [options.accessor] - accessor function for accessing array values
* @param {Number} [options.dim] - dimension
* @param {String} [options.dtype] - output data type
* @returns {Null|Error} null or an error
*/
function validate( opts, options ) {
	if ( !isObject( options ) ) {
		return new TypeError( 'nanvariance()::invalid input argument. Options argument must be an object. Value: `' + options + '`.' );
	}
	if ( options.hasOwnProperty( 'bias' ) ) {
		opts.bias = options.bias;
		if ( !isBoolean( opts.bias ) ) {
			return new TypeError( 'nanvariance()::invalid option. Bias option must be a boolean primitive. Option: `' + opts.bias + '`.' );
		}
	}
	if ( options.hasOwnProperty( 'encoding' ) ) {
		opts.encoding = options.encoding;
		if ( !isArray( opts.encoding ) ) {
			return new TypeError( 'nanvariance()::invalid option. Encoding option must be an array. Option: `' + opts.encoding + '`.' );
		}
	}
	if ( options.hasOwnProperty( 'accessor' ) ) {
		opts.accessor = options.accessor;
		if ( !isFunction( opts.accessor ) ) {
			return new TypeError( 'nanvariance()::invalid option. Accessor must be a function. Option: `' + opts.accessor + '`.' );
		}
	}
	if ( options.hasOwnProperty( 'dim' ) ) {
		opts.dim = options.dim;
		if ( !isPositiveInteger( opts.dim ) ) {
			return new TypeError( 'nanvariance()::invalid option. Dimension option must be a positive integer. Option: `' + opts.dim + '`.' );
		}
	}
	if ( options.hasOwnProperty( 'dtype' ) ) {
		opts.dtype = options.dtype;
		if ( !isString( opts.dtype ) ) {
			return new TypeError( 'nanvariance()::invalid option. Data type option must be a string primitive. Option: `' + opts.dtype + '`.' );
		}
	}
	return null;
} // end FUNCTION validate()


// EXPORTS //

module.exports = validate;
