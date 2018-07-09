import { Decorator, InheritableReflection, ReflectionKind } from './abstract'
import { GetSignatureReflection } from './get-signature'
import { SetSignatureReflection } from './set-signature'

export interface AccessorReflection extends InheritableReflection {
  kind: ReflectionKind.Accessor
  kindString: 'Accessor'
  flags: { isExported?: boolean }
  decorators?: Decorator[]
  setSignature?: SetSignatureReflection
  getSignature?: GetSignatureReflection
}
