import { Type } from '../types/index'
import { InheritableReflection, ReflectionKind } from './abstract'
import { ParameterReflection } from './parameter'

export interface SetSignatureReflection extends InheritableReflection {
  kind: ReflectionKind.SetSignature
  kindString: 'Set signature'
  name: '__set'
  parameters: [ParameterReflection]
  type: Type
}
