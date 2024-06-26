import { NDArray } from './';
import { array } from './array';
import { NDIter } from '../iterators';

const { asin: f } = Math;

/**
 * @static
 * @memberof vectorious
 * @function asin
 * @description Returns the arcsine of each element of `x`.
 * @param {NDArray} x
 * @returns {NDArray}
 * @example
 * import { asin } from 'vectorious/core/asin';
 *
 * asin([-1, 0, 1]) // => array([-1.5707963705062866, 0, 1.5707963705062866])
 */
export const asin = (x: NDArray | ArrayLike<any>): NDArray => array(x).asin();

export default function (this: NDArray): NDArray {
  const { data: d1 } = this;
  const iter = new NDIter(this);

  for (const i of iter) {
    d1[i] = f(d1[i]);
  }

  return this;
}
