import { DebugElement } from '@angular/core'
import { Observable } from 'rxjs/Observable'

declare var expect: any
declare var jasmine: any

export function keys(obj: { [key: string]: any }): string[] {
  return Object.keys(obj).filter(key => obj[key])
}

export function assertClass(el: DebugElement, includes: string[], excludes: string[] = []): void {
  const classes = keys(el.classes)

  for (const className of includes) {
    expect(classes).toContain(className)
  }

  for (const className of excludes) {
    expect(classes).not.toContain(className)
  }
}

export function assertStyle(el: DebugElement, partial: { [style: string]: string | null }): void {
  expect(el.styles).toEqual(jasmine.objectContaining(partial))
}

export function values<T>(observable: Observable<T>): T[] {
  const res: T[] = []
  observable.subscribe(x => res.push(x)).unsubscribe()
  return res
}
