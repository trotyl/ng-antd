import { DebugElement } from '@angular/core'

export function getClassName(element: DebugElement | null | undefined): string {
  if (!element || !element.nativeElement) { return '' }
  return Array.from(element.nativeElement.classList).sort().join(' ')
}
