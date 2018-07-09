import { Type } from '../types/index'
import { Decorator, Reflection, ReflectionKind } from './abstract'

export interface PropertyReflection extends Reflection {
  kind: ReflectionKind.Property
  kindString: 'Property'
  flags: { isPrivate?: boolean, isPublic?: boolean, isConstructorProperty?: boolean, isExported?: boolean, isOptional?: boolean, isAbstract?: boolean }
  type: Type
  defaultValue?: string
  decorators?: Decorator[]
}
