import { ReferenceType } from '../types/index'
import { InheritableReflection, ReflectionKind } from './abstract'
import { ParameterReflection } from './parameter'

export interface ConstructorSignatureReflection extends InheritableReflection {
  kind: ReflectionKind.ConstructorSignature
  kindString: 'Constructor signature'
  flags: {}
  parameters?: ParameterReflection[]
  type: ReferenceType
}
