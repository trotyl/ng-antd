import { AbstractType } from './abstract'
import { Type } from './index'

/**
 * Represents an array type.
 *
 * ~~~
 * let value: string[];
 * ~~~
 */
export interface ArrayType extends AbstractType {
  /**
   * The type of the array elements.
   */
  elementType: Type

  /**
   * The type name identifier.
   */
  type: 'array'
}
