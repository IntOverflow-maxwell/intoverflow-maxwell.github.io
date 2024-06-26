import { NDArray } from './';
import { array } from './array';

/**
 * @deprecated
 * @static
 * @memberof vectorious
 * @function equidimensional
 * @description Asserts if `x` and `y` have the same shape
 * @param {NDArray} x
 * @param {NDArray} y
 * @throws {Error} shapes x and y do not match
 * @example
 * import { equidimensional } from 'vectorious/core/equidimensional';
 *
 * equidimensional([1, 2, 3], [1, 2]); // Error: shapes 3 and 2 do not match
 */
export const equidimensional = (x: NDArray | ArrayLike<any>, y: NDArray | ArrayLike<any>): void => {
  array(x).equidimensional(array(y));
};

export default function (this: NDArray, x: NDArray): void {
  const { shape: s1 } = this;
  const { shape: s2 } = x;

  if (!s1.every((dim: number, i: number) => dim === s2[i])) {
    throw new Error(`shapes ${s1} and ${s2} do not match`);
  }
}
