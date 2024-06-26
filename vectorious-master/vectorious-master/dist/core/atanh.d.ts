import { NDArray } from './';
/**
 * @static
 * @memberof vectorious
 * @function atanh
 * @description Returns the hyperbolic arctangent of each element of `x`.
 * @param {NDArray} x
 * @returns {NDArray}
 * @example
 * import { atanh } from 'vectorious/core/atanh';
 *
 * atanh([0, -0.5]); // => array([0, -0.5493061542510986])
 */
export declare const atanh: (x: NDArray | ArrayLike<any>) => NDArray;
export default function (this: NDArray): NDArray;
