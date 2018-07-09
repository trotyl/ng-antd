import { ReferenceType } from '../types/index'
import { Reflection, ReflectionKind } from './abstract'
import { AccessorReflection } from './accessor'
import { ConstructorReflection } from './constructor'
import { MethodReflection } from './method'
import { PropertyReflection } from './property'

export interface InterfaceReflection extends Reflection {
  kind: ReflectionKind.Interface
  kindString: 'Interface'
  flags: { isExported: boolean }
  children?: Array<ConstructorReflection | PropertyReflection | AccessorReflection | MethodReflection>
  implementedBy?: ReferenceType[]
}
