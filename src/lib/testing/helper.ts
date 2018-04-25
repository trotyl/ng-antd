import { DebugElement } from '@angular/core'

export function getClassName(element: DebugElement): string {
  return Object.keys(element.classes).filter((key) => element.classes[key]).sort().join(' ')
}

export function getStyle(element: DebugElement): { [style: string]: string | null } {
  return element.styles
}

export function noop() { }
