import { Type } from '../types/index'
import { Decorator, Reflection, ReflectionKind } from './abstract'
import { ClassMemberReflection } from './class-member'

export interface ClassReflection extends Reflection {
  kind: ReflectionKind.Class
  kindString: 'Class'
  flags: { isExported?: boolean, isAbstract?: boolean }

  children?: ClassMemberReflection[]

  /**
   * A list of all decorators attached to this reflection.
   */
  decorators?: Decorator[]

  implementedTypes?: Type[]
}
