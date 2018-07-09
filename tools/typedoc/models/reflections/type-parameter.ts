import { Reflection, ReflectionKind } from './abstract'

export interface TypeParameterReflection extends Reflection {
  kind: ReflectionKind.TypeParameter
  kindString: 'Type parameter'
}
