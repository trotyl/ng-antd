import { AbstractType } from './abstract'

/**
 * Represents all unknown types.
 */
export interface UnknownType extends AbstractType {
  /**
   * A string representation of the type as returned from TypeScript compiler.
   */
  name: string

  /**
   * The type name identifier.
   */
  type: 'unknown'
}
