import { NDArray } from './';
import { array } from './array';
import { NDIter } from '../iterators';

const { ceil: f } = Math;

/**
 * @static
 * @memberof vectorious
 * @function ceil
 * @description Returns smallest integer greater than or equal to of each element of `x`.
 * @param {NDArray} x
 * @returns {NDArray}
 * @example
 * import { ceil } from 'vectorious/core/ceil';
 *
 * ceil([0.5, 1.5, 2.5]); // => array([1, 2, 3])
 */
export const ceil = (x: NDArray | ArrayLike<any>): NDArray => array(x).ceil();

export default function (this: NDArray): NDArray {
  const { data: d1 } = this;
  const iter = new NDIter(this);

  for (const i of iter) {
    d1[i] = f(d1[i]);
  }

  return this;
}
