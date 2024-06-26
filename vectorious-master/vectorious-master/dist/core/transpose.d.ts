import { NDArray } from './';
/**
 * @static
 * @memberof vectorious
 * @function transpose
 * @description Transposes `x` (mirror across the diagonal).
 * @param {NDArray} x
 * @returns {NDArray}
 * @example
 * import { transpose } from 'vectorious/core/transpose';
 *
 * transpose([[1, 2, 3], [4, 5, 6], [7, 8, 9]]); // => array([[1, 4, 7], [2, 5, 8], [3, 6, 9]])
 */
export declare const transpose: (x: NDArray | ArrayLike<any>) => NDArray;
export default function (this: NDArray): NDArray;
