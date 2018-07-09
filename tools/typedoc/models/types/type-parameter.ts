import { AbstractType } from './abstract'
import { Type } from './index'

/**
 * Represents a type parameter type.
 *
 * ~~~
 * let value: T;
 * ~~~
 */
export interface TypeParameterType extends AbstractType {
  /**
   *
   */
  name: string

  constraint: Type

  /**
   * The type name identifier.
   */
  readonly type: 'typeParameter'
}
