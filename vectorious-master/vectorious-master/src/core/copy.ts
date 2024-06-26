import { NDArray } from './';
import { array } from './array';
import { zeros } from './zeros';
import { NDMultiIter } from '../iterators';

/**
 * @static
 * @memberof vectorious
 * @function copy
 * @description Makes a copy of `x`
 * @param {NDArray} x
 * @returns {NDArray}
 * @example
 * import { copy } from 'vectorious/core/copy';
 *
 * copy([1, 2, 3]); // => array([1, 2, 3])
 */
export const copy = (x: NDArray | ArrayLike<any>): NDArray => array(x).copy();

export default function (this: NDArray): NDArray {
  const x = zeros(...this.shape);

  const { data: d1 } = this;
  const { data: d2 } = x;

  const iter = new NDMultiIter(this, x);
  for (const [i, j] of iter) {
    d2[j] = d1[i];
  }

  return x;
}
