export function hasContent(element: HTMLElement): boolean {
  const childNodes = Array.from(element.childNodes)
  return childNodes.some(x => x.nodeType === 1 || (x.nodeType !== 8 && x.textContent!.trim().length > 0))
}
