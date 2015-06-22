'use strict';

// MODULES //

var isNumber = require( 'validate.io-number-primitive' );

// FUNCTIONS //

var contains = require( './contains.js' );

// NANVARIANCE //

/**
* FUNCTION: nanvariance( out, mat, encoding[, bias[, dim ] ] )
*	Computes the variance along a matrix dimension ignoring non-numeric / missing values.
*
* @param {Matrix} out - output matrix
* @param {Matrix} mat - input matrix
* @param {Array} encoding - array whose elements encode missing values
* @param {Boolean} [bias=false] - boolean indicating whether to calculate a biased or unbiased estimate of the variance
* @param {Number} [dim=2] - matrix dimension along which to compute the variance. If `dim=1`, compute along matrix rows. If `dim=2`, compute along matrix columns.
* @returns {Matrix|Null} variance or null
*/
function nanvariance( out, mat, encoding, bias, dim ) {
	var delta,
		M2,
		mu,
		x,
		M, N, Nobs,
		s0, s1,
		o,
		i, j, k;

	if ( dim === 1 ) {
		// Compute along the rows...
		M = mat.shape[ 1 ];
		N = mat.shape[ 0 ];
		s0 = mat.strides[ 1 ];
		s1 = mat.strides[ 0 ];
	} else {
		// Compute along the columns...
		M = mat.shape[ 0 ];
		N = mat.shape[ 1 ];
		s0 = mat.strides[ 0 ];
		s1 = mat.strides[ 1 ];
	}
	if ( M === 0 || N === 0 ) {
		return null;
	}
	o = mat.offset;
	for ( i = 0; i < M; i++ ) {
		k = o + i*s0;
		Nobs = 0;
		M2 = 0;
		mu = 0;
		delta = 0;
		for ( j = 0; j < N; j++ ) {
			x = mat.data[ k + j*s1 ];
			if ( !isNumber( x ) || contains( encoding, x ) ) {
				continue;
			}
			Nobs += 1;
			delta = x - mu;
			mu += delta / Nobs;
			M2 += delta * ( x - mu );
		}

		if ( Nobs < 2 ) {
			out.data[ i ] = 0;
		} else {
			if ( bias ) {
				out.data[ i ] = M2 / ( Nobs );
			} else {
				out.data[ i ] = M2 / ( Nobs - 1 );
			}
		}
	}
	return out;
} // end FUNCTION nanvariance()


// EXPORTS //

module.exports = nanvariance;
