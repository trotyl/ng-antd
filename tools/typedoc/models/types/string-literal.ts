import { AbstractType } from './abstract'

/**
 * Represents a string literal type.
 *
 * ~~~
 * let value: "DIV";
 * ~~~
 */
export interface StringLiteralType extends AbstractType {
  /**
   * The string literal value.
   */
  value: string

  /**
   * The type name identifier.
   */
  type: 'stringLiteral'
}
