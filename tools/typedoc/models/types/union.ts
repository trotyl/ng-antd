import { AbstractType } from './abstract'
import { Type } from './index'

/**
 * Represents an union type.
 *
 * ~~~
 * let value: string | string[];
 * ~~~
 */
export interface UnionType extends AbstractType {
  /**
   * The types this union consists of.
   */
  types: Type[]

  /**
   * The type name identifier.
   */
  readonly type: 'union'
}
