import { Decorator, Reflection, ReflectionKind } from './abstract'

export interface ParameterReflection extends Reflection {
  kind: ReflectionKind.Parameter
  kindString: 'Parameter'
  flags: { isRest?: boolean }
  decorators?: Decorator[]
}
