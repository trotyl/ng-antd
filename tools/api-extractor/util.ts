import * as Prism from 'prismjs'
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

export function mapTokenType(type: string): TokenType {
  switch (type) {
    case 'attr-name':
      return TokenType.attrName
    case 'attr-value':
      return TokenType.attrValue
    case 'boolean':
      return TokenType.boolean
    case 'class-name':
      return TokenType.className
    case 'comment':
      return TokenType.comment
    case 'function':
      return TokenType.function
    case 'interpolation':
      return TokenType.interpolation
    case 'interpolation-punctuation':
      return TokenType.interpolationPunctuation
    case 'keyword':
      return TokenType.keyword
    case 'number':
      return TokenType.number
    case 'operator':
      return TokenType.operator
    case 'parameter':
      return TokenType.parameter
    case 'property':
      return TokenType.property
    case 'punctuation':
      return TokenType.punctuation
    case 'string':
      return TokenType.string
    case 'style-attr':
      return TokenType.styleAttr
    case 'tag':
      return TokenType.tag
    case 'template-string':
      return TokenType.templateString
    case 'template-punctuation':
      return TokenType.templatePunctuation
    default:
      throw new Error(`Unexpected type ${type}`)
  }
}

export function normalizeToken(token: string | Prism.Token): TokenNode {
  if (typeof token === 'string') {
    return [TokenType.none, token]
  }
  if (typeof token.content === 'string') {
    return [mapTokenType(token.type), token.content]
  }
  if (!Array.isArray(token.content)) {
    return [mapTokenType(token.type), undefined, [normalizeToken(token.content)]]
  }
  return [mapTokenType(token.type), undefined, token.content.map(normalizeToken)]
}
