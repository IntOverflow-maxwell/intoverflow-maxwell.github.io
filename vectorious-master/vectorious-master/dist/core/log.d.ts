import { NDArray } from './';
/**
 * @static
 * @memberof vectorious
 * @function log
 * @description Returns the natural logarithm (log_e, also ln) of each element of `x`.
 * @param {NDArray} x
 * @returns {NDArray}
 * @example
 * import { log } from 'vectorious/core/log';
 *
 * log([1, 2, 3]); // => array([0, 0.6931471824645996, 1.0986123085021973])
 */
export declare const log: (x: NDArray | ArrayLike<any>) => NDArray;
export default function (this: NDArray): NDArray;
