import { Type } from '../types/index'
import { Reflection, ReflectionKind } from './abstract'

export interface VariableReflection extends Reflection {
  kind: ReflectionKind.Variable
  kindString: 'Variable'
  flags: { isExported?: boolean, isConst?: boolean }
  defaultValue?: string
  type: Type
}
