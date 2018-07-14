import { Type } from '../typedoc/models/types/index'
import { CodeBlock, TokenType } from './definition'

export function tokenizeType(type: Type): CodeBlock['tokens'] {
  const tokens: CodeBlock['tokens'] = []

  switch (type.type) {
    case 'intrinsic':
      tokens.push(type.name)
      break
    case 'stringLiteral':
      tokens.push([TokenType.string, `"${type.value}"`])
      break
    case 'union':
      for (let i = 0; i < type.types.length; i++) {
        const elementType = type.types[i]
        tokens.push(...tokenizeType(elementType))
        if (i !== type.types.length - 1) {
          tokens.push(' ')
          tokens.push([TokenType.punctuation, '|'])
          tokens.push(' ')
        }
      }
      break
    case 'array':
      // TODO: use `type[]` format for simple types
      tokens.push('Array')
      tokens.push([TokenType.punctuation, '<'])
      tokens.push(...tokenizeType(type.elementType))
      tokens.push([TokenType.punctuation, '>'])
      break
    case 'reference':
      tokens.push(type.name)
      if (type.typeArguments) {
        tokens.push([TokenType.punctuation, '<'])
        for (let i = 0; i < type.typeArguments.length; i++) {
          const argumentType = type.typeArguments[i]
          tokens.push(...tokenizeType(argumentType))
          if (i !== type.typeArguments.length - 1) {
            tokens.push([TokenType.punctuation, ','])
            tokens.push(' ')
          }
        }
        tokens.push([TokenType.punctuation, '>'])
      }
      break
    default:
      tokens.push(`TODO(type): ${type.type}`)
  }

  return tokens
}

export function stringifyType(type: Type): string {
  const tokens = tokenizeType(type)
  return `\
<code>
${tokens.map(token => Array.isArray(token) ? `<span class="token ${token[0]}">${token[1]}</span>` : token).join('')}
</code>`
}

export function stripQuote(source: string): string {
  return source.replace(/["']/g, '')
}
