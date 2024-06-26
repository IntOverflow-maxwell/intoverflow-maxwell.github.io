import { NDArray } from './';
/**
 * @static
 * @memberof vectorious
 * @function eig
 * @description
 * Gets eigenvalues and eigenvectors of `x` using the Jacobi method.
 * Accelerated with LAPACK `?geev`.
 * @param {NDArray} x
 * @returns {Array<NDArray>}
 * @example
 * import { eig } from 'vectorious/core/eig';
 *
 * eig([[1, 0, 0], [0, 2, 0], [0, 0, 3]]); // => [array([1, 2, 3]), array([[1, 0, 0], [0, 1, 0], [0, 0, 1]])]
 */
export declare const eig: (x: NDArray | ArrayLike<any>) => [NDArray, NDArray];
export default function (this: NDArray): [NDArray, NDArray];
