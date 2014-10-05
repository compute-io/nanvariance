/**
*
*	COMPUTE: nanvariance
*
*
*	DESCRIPTION:
*		- Computes the sample variance over an array of values ignoring any values which are not numeric.
*
*
*	NOTES:
*		[1] 
*
*
*	TODO:
*		[1] 
*
*
*	LICENSE:
*		MIT
*
*	Copyright (c) 2014. Athan Reines.
*
*
*	AUTHOR:
*		Athan Reines. kgryte@gmail.com. 2014.
*
*/

(function() {
	'use strict';

	// NANVARIANCE //

	/**
	* FUNCTION: nanvariance( arr )
	*	Computes the sample variance over an array of values ignoring non-numeric values.
	*
	* @param {Array} arr - array of values
	* @returns {Number} sample variance
	*/
	function nanvariance( arr ) {
		if ( !Array.isArray( arr ) ) {
			throw new TypeError( 'nanvariance()::invalid input argument. Must provide an array.' );
		}
		var len = arr.length,
			N = 0,
			mean = 0,
			M2 = 0,
			delta = 0,
			x;

		for ( var i = 0; i < len; i++ ) {
			x = arr[ i ];
			if ( typeof x !== 'number' || x !== x ) {
				continue;
			}
			N += 1;
			delta = x - mean;
			mean += delta / N;
			M2 += delta * ( x - mean );
		}
		if ( N < 2 ) {
			return 0;
		}
		return M2 / ( N-1 );
	} // end FUNCTION nanvariance()


	// EXPORTS //

	module.exports = nanvariance;

})();