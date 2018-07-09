import { Type } from '../types/index'
import { ReflectionKind, InheritableReflection } from './abstract'
import { ParameterReflection } from './parameter'

export interface CallSignatureReflection extends InheritableReflection {
  kind: ReflectionKind.CallSignature
  kindString: 'Call signature'
  flags: {}
  parameters?: ParameterReflection[]
  type: Type
}
