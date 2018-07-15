/* SystemJS module definition */
declare var module: NodeModule
interface NodeModule {
  id: string
}

declare const enum TokenType {
  none = 0,
  boolean,
  className,
  function,
  keyword,
  number,
  operator,
  punctuation,
  string,
}

type TokenNode = [TokenType, string]

interface CodeBlock {
  tokens: Array<TokenNode>
}
