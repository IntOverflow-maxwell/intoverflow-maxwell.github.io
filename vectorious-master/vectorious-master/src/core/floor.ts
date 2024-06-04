import { NDArray } from './';
import { array } from './array';
import { NDIter } from '../iterators';

const { floor: f } = Math;

/**
 * @static
 * @memberof vectorious
 * @function floor
 * @description Returns the largest integer less than or equal to a number of each element of `x`.
 * @param {NDArray} x
 * @returns {NDArray}
 * @example
 * import { floor } from 'vectorious/core/floor';
 *
 * floor([1.5, 2.5, 3.5]); // => array([1, 2, 3])
 */
export const floor = (x: NDArray | ArrayLike<any>): NDArray => array(x).floor();

export default function (this: NDArray): NDArray {
  const { data: d1 } = this;
  const iter = new NDIter(this);

  for (const i of iter) {
    d1[i] = f(d1[i]);
  }

  return this;
}
