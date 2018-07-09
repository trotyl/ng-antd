import { Type } from '../types/index'
import { Reflection, ReflectionKind } from './abstract'
import { TypeParameterReflection } from './type-parameter'

export interface TypeAliasReflection extends Reflection {
  kind: ReflectionKind.TypeAlias
  kindString: 'Type parameter'
  type: Type
  typeParameters: TypeParameterReflection[]
}
