import { Reflection, ReflectionKind } from './abstract'
import { ConstructorSignatureReflection } from './constructor-signature'

export interface ConstructorReflection extends Reflection {
  kind: ReflectionKind.Constructor
  kindString: 'Constructor'
  name: 'constructor'
  flags: { isExported: boolean }
  signatures: ConstructorSignatureReflection[]
}
