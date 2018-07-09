import { Type } from '../types/index'
import { Reflection, ReflectionKind } from './abstract'
import { VariableReflection } from './variable'

export interface ObjectLiteralReflection extends Reflection {
  kind: ReflectionKind.ObjectLiteral
  kindString: 'Object literal'
  children: VariableReflection[]
  type: Type
}
