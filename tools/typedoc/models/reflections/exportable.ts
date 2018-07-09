import { ClassReflection } from './class'
import { FunctionReflection } from './function'
import { InterfaceReflection } from './interface'
import { ObjectLiteralReflection } from './object-literal'
import { TypeAliasReflection } from './type-alias'
import { VariableReflection } from './variable'

export type ExportableReflection =
  | ClassReflection
  | VariableReflection
  | FunctionReflection
  | ObjectLiteralReflection
  | InterfaceReflection
  | TypeAliasReflection
