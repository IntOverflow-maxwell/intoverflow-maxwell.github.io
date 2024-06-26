import { NDArray } from './';
import { array } from './array';

/**
 * @static
 * @memberof vectorious
 * @function project
 * @description Projects the `y` onto `x` using the projection formula `(y * (x * y / y * y))`.
 * @param {NDArray} x
 * @param {NDArray} y
 * @returns {NDArray}
 * @example
 * import { project } from 'vectorious/core/project';
 *
 * project([1, 2, 3], [4, 5, 6]); // => array([1.6623376607894897, 2.0779221057891846, 2.49350643157959])
 */
export const project = (x: NDArray | ArrayLike<any>, y: NDArray | ArrayLike<any>): NDArray =>
  array(x).project(array(y));

export default function (this: NDArray, x: NDArray): NDArray {
  return x.scale(this.dot(x) / x.dot(x));
}
