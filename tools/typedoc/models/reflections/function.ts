import { Reflection, ReflectionKind } from './abstract'
import { CallSignatureReflection } from './call-signature'

export interface FunctionReflection extends Reflection {
  kind: ReflectionKind.Function
  kindString: 'Function'
  flags: { isExported?: boolean }
  signatures: CallSignatureReflection[]
}
