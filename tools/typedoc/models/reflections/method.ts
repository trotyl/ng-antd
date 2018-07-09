import { Decorator, InheritableReflection, ReflectionKind } from './abstract'
import { CallSignatureReflection } from './call-signature'

export interface MethodReflection extends InheritableReflection {
  kind: ReflectionKind.Method
  kindString: 'Method'
  flags: { isExported: boolean, isAbstract: boolean, isPrivate: boolean }
  signatures: CallSignatureReflection[]
  decorators?: Decorator[]
}
