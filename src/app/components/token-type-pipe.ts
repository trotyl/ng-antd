import { Pipe, PipeTransform } from '@angular/core'

@Pipe({
  name: 'tokenType',
})
export class DocsTokenTypePipe implements PipeTransform {
  transform(value: TokenType): string {
    switch (value) {
      case TokenType.attrName:
        return 'attr-name'
      case TokenType.attrValue:
        return 'attr-value'
      case TokenType.boolean:
        return 'boolean'
      case TokenType.className:
        return 'class-name'
      case TokenType.comment:
        return 'comment'
      case TokenType.function:
        return 'function'
      case TokenType.interpolation:
        return 'interpolation'
      case TokenType.interpolationPunctuation:
        return 'interpolation-punctuation'
      case TokenType.keyword:
        return 'keyword'
      case TokenType.number:
        return 'number'
      case TokenType.operator:
        return 'operator'
      case TokenType.property:
        return 'property'
      case TokenType.punctuation:
        return 'punctuation'
      case TokenType.string:
        return 'string'
      case TokenType.styleAttr:
        return 'style-attr'
      case TokenType.tag:
        return 'tag'
      case TokenType.templateString:
        return 'template-string'
      default:
        throw new Error(`Unexpected token type ${value}`)
    }
  }
}
