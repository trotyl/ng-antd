import { Type } from '../typedoc/models/types/index'

export function tokenizeType(type: Type): Array<TokenNode> {
  const tokens: CodeBlock['tokens'] = []

  switch (type.type) {
    case 'intrinsic':
      tokens.push([TokenType.none, type.name])
      break
    case 'stringLiteral':
      tokens.push([TokenType.string, `"${type.value}"`])
      break
    case 'union':
      for (let i = 0; i < type.types.length; i++) {
        const elementType = type.types[i]
        tokens.push(...tokenizeType(elementType))
        if (i !== type.types.length - 1) {
          tokens.push([TokenType.none, ' '])
          tokens.push([TokenType.punctuation, '|'])
          tokens.push([TokenType.none, ' '])
        }
      }
      break
    case 'array':
      // TODO: use `type[]` format for simple types
      tokens.push([TokenType.none, 'Array'])
      tokens.push([TokenType.punctuation, '<'])
      tokens.push(...tokenizeType(type.elementType))
      tokens.push([TokenType.punctuation, '>'])
      break
    case 'reference':
      tokens.push([TokenType.none, type.name])
      if (type.typeArguments) {
        tokens.push([TokenType.punctuation, '<'])
        for (let i = 0; i < type.typeArguments.length; i++) {
          const argumentType = type.typeArguments[i]
          tokens.push(...tokenizeType(argumentType))
          if (i !== type.typeArguments.length - 1) {
            tokens.push([TokenType.punctuation, ','])
            tokens.push([TokenType.none, ' '])
          }
        }
        tokens.push([TokenType.punctuation, '>'])
      }
      break
    default:
      tokens.push([TokenType.none, `TODO(type): ${type.type}`])
  }

  return tokens
}

export function serializeType(type: Type): CodeBlock {
  return {
    tokens: tokenizeType(type),
  }
}

export function stripQuote(source: string): string {
  return source.replace(/["']/g, '')
}
