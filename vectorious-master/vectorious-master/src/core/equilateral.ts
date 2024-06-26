import { NDArray } from './';
import { array } from './array';

/**
 * @deprecated
 * @static
 * @memberof vectorious
 * @function equilateral
 * @description Asserts if `x` and `y` have the same length
 * @param {NDArray} x
 * @param {NDArray} y
 * @throws {Error} lengths x and y do not match
 * @example
 * import { equilateral } from 'vectorious/core/equilateral';
 *
 * equilateral([1, 2, 3], [1, 2]); // Error: lengths 3 and 2 do not match
 */
export const equilateral = (x: NDArray | ArrayLike<any>, y: NDArray | ArrayLike<any>): void => {
  array(x).equilateral(array(y));
};

export default function (this: NDArray, x: NDArray): void {
  const { length: l1 } = this;
  const { length: l2 } = x;

  if (l1 !== l2) {
    throw new Error(`lengths ${l1} and ${l2} do not match`);
  }
}
