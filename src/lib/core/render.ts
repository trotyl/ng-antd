interface DominoImpl {
  Text: Text
}

declare var domino: { impl: DominoImpl } | undefined

export const DomTypes = {
  Text: Text || (domino && domino.impl.Text)
}
