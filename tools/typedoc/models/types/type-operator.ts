import { AbstractType } from './abstract'
import { Type } from './index'

/**
 * Represents a type operator type.
 *
 * ~~~
 * class A {}
 * class B<T extends keyof A> {}
 * ~~~
 */
export interface TypeOperatorType extends AbstractType {
  /**
   * The type name identifier.
   */
  readonly type: 'typeOperator'

  target: Type

  // currently, there is only one type operator, this is always "keyof"
  // but, if more types will be added in the future we are ready.
  operator: 'keyof'
}
