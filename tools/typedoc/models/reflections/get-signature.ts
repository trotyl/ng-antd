import { Type } from '../types/index'
import { InheritableReflection, ReflectionKind } from './abstract'

export interface GetSignatureReflection extends InheritableReflection {
  kind: ReflectionKind.GetSignature
  kindString: 'Get signature'
  name: '__get'
  type: Type
}
