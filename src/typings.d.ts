/* SystemJS module definition */
declare var module: NodeModule
interface NodeModule {
  id: string
}

declare const enum TokenType {
  none = 0,
  attrName,
  attrValue,
  boolean,
  className,
  comment,
  function,
  interpolation,
  interpolationPunctuation,
  keyword,
  number,
  operator,
  property,
  punctuation,
  string,
  styleAttr,
  tag,
  templateString,
}

interface TokenNode {
  0: TokenType
  1: string | undefined
  2?: TokenNode[]
}

interface CodeBlock {
  tokens: TokenNode[]
}
