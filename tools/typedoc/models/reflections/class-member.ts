import { AccessorReflection } from './accessor'
import { ConstructorReflection } from './constructor'
import { MethodReflection } from './method'
import { PropertyReflection } from './property'

export type ClassMemberReflection =
  | ConstructorReflection
  | PropertyReflection
  | AccessorReflection
  | MethodReflection
