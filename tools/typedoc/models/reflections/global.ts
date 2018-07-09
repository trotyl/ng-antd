import { ReflectionBase, ReflectionKind } from './abstract'
import { ExternalModuleReflection } from './external-module'

export interface GlobalReflection extends ReflectionBase {
  kind: ReflectionKind.Global
  flags: {}
  children: ExternalModuleReflection[]
}
