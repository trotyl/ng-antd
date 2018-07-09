import { AbstractType } from './abstract'
import { Type } from './index'

/**
 * Represents an intersection type.
 *
 * ~~~
 * let value: A & B;
 * ~~~
 */
export interface IntersectionType extends AbstractType {
  /**
   * The types this union consists of.
   */
  types: Type[]

  /**
   * The type name identifier.
   */
  type: 'intersection'
}
