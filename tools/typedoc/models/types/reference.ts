import { AbstractType } from './abstract'
import { Type } from './index'

/**
 * Represents a type that refers to another reflection like a class, interface or enum.
 *
 * ~~~
 * let value: MyClass;
 * ~~~
 */
export interface ReferenceType extends AbstractType {
  /**
   * The type name identifier.
   */
  type: 'reference'

  /**
   * The name of the referenced type.
   *
   * If the symbol cannot be found cause it's not part of the documentation this
   * can be used to represent the type.
   */
  name: string

  /**
   * The type arguments of this reference.
   */
  typeArguments?: Type[]

  /**
   * Reflection id.
   */
  id?: number
}
