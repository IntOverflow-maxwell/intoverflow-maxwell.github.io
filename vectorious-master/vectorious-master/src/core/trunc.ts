import { NDArray } from './';
import { array } from './array';
import { NDIter } from '../iterators';

const { trunc: f } = Math;

/**
 * @static
 * @memberof vectorious
 * @function trunc
 * @description
 * Returns the integer part of each element of `x`,
 * removing any fractional digits.
 * @param {NDArray} x
 * @returns {NDArray}
 * @example
 * import { trunc } from 'vectorious/core/trunc';
 *
 * trunc([1.2, 2.8, 3.5]); // => array([1, 2, 3])
 */
export const trunc = (x: NDArray | ArrayLike<any>): NDArray => array(x).trunc();

export default function (this: NDArray): NDArray {
  const { data: d1 } = this;
  const iter = new NDIter(this);

  for (const i of iter) {
    d1[i] = f(d1[i]);
  }

  return this;
}
