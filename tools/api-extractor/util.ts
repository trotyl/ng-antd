import { Type } from '../typedoc/models/types/index'

export function stringifyType(type: Type): string {
  switch (type.type) {
    case 'intrinsic':
      return type.name
    case 'stringLiteral':
      return `"${type.value}"`
    case 'union':
      return type.types.map(stringifyType).join(' | ')
    case 'array':
      return `Array<${stringifyType(type.elementType)}>`
    case 'reference':
      if (type.typeArguments) {
        return `${type.name}<${type.typeArguments.map(stringifyType).join(',')}>`
      }
      return type.name
    default:
      return `TODO(type): ${type.type}`
  }
}

export function stripQuote(source: string): string {
  return source.replace(/["']/g, '')
}
