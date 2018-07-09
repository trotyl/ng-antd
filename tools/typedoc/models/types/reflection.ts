import { Reflection } from '../reflections/index'
import { AbstractType } from './abstract'

/**
 * Represents a type which has it's own reflection like literal types.
 *
 * ~~~
 * let value: {subValueA;subValueB;subValueC;};
 * ~~~
 */
export interface ReflectionType extends AbstractType {
  /**
   * The reflection of the type.
   */
  declaration: Reflection

  /**
   * The type name identifier.
   */
  type: 'reflection'
}
