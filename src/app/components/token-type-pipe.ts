import { Pipe, PipeTransform } from '@angular/core'

@Pipe({
  name: 'tokenType',
})
export class DocsTokenTypePipe implements PipeTransform {
  transform(value: TokenType): string {
    switch (value) {
      case TokenType.boolean:
        return 'boolean'
      case TokenType.className:
        return 'class-name'
      case TokenType.function:
        return 'function'
      case TokenType.keyword:
        return 'keyword'
      case TokenType.number:
        return 'number'
      case TokenType.operator:
        return 'operator'
      case TokenType.punctuation:
        return 'punctuation'
      case TokenType.string:
        return 'string'
      default:
        throw new Error(`Unexpected token type ${value}`)
    }
  }
}
