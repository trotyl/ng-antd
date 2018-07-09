import { AbstractType } from './abstract'

/**
 * Represents an intrinsic type like `string` or `boolean`.
 *
 * ~~~
 * let value: number;
 * ~~~
 */
export interface IntrinsicType extends AbstractType {
  /**
   * The name of the intrinsic type like `string` or `boolean`.
   */
  name: string

  /**
   * The type name identifier.
   */
  type: 'intrinsic'
}
