import { DebugElement } from '@angular/core'

export function getClassName(element: DebugElement | null | undefined): string {
  if (!element || !element.nativeElement) { return '' }
  return Array.from(element.nativeElement.classList).sort().join(' ')
}

export function getStyle(element: DebugElement | null | undefined): { [style: string]: string } {
  if (!element || !element.nativeElement) { return {} }
  const rawStyles = element.nativeElement.style
  const styleNames = Object.keys(rawStyles).filter(name => rawStyles[name] && Number.isNaN(Number.parseInt(name)))
  const res: { [style: string]: string } = {}
  for (const name of styleNames) {
    res[name] = rawStyles[name]
  }
  return res
}
