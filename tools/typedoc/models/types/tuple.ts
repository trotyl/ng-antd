import { AbstractType } from './abstract'
import { Type } from './index'

/**
 * Represents a tuple type.
 *
 * ~~~
 * let value: [string,boolean];
 * ~~~
 */
export interface TupleType extends AbstractType {
  /**
   * The ordered type elements of the tuple type.
   */
  elements: Type[]

  /**
   * The type name identifier.
   */
  type: 'tuple'
}
