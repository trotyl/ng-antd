import { Reflection, ReflectionKind } from './abstract'
import { ExportableReflection } from './exportable'

export interface ExternalModuleReflection extends Reflection {
  kind: ReflectionKind.ExternalModule
  kindString: 'External module'
  flags: { isExported: boolean }

  /**
   * The original name of the TypeScript declaration.
   */
  originalName: string

  children?: ExportableReflection[]
}
