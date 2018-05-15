import { coerceBooleanProperty, coerceNumberProperty } from '@angular/cdk/coercion'
import { SimpleChanges } from '@angular/core'
import { Observable } from 'rxjs'
import { map, shareReplay, startWith, tap } from 'rxjs/operators'
import { Governor } from '../extension/governor'

function coerceProperty(value: any, defaultValue: any): any {
  switch (typeof defaultValue) {
    case 'string':
      return `${value}`
    case 'number':
      return coerceNumberProperty(value)
    case 'boolean':
      return coerceBooleanProperty(value)
    default:
      return value != null && value !== '' ? value : null
  }
}

export function extractInputs<T>(config: T): (source: Observable<SimpleChanges>) => Observable<T> {
  const cache: { [P in keyof T]?: any } = {}
  return (source: Observable<SimpleChanges>) => source.pipe(
    map(changes => {
      const res: T = {} as any
      for (const key of Object.keys(config)) {
        const defaultValue = config[key as keyof T]
        if (changes.hasOwnProperty(key)) {
          res[key as keyof T] = cache[key as keyof T] = coerceProperty(changes[key as keyof T].currentValue, defaultValue)
        } else if (!cache.hasOwnProperty(key)) {
          res[key as keyof T] = cache[key as keyof T] = defaultValue
        } else {
          res[key as keyof T] = cache[key as keyof T]
        }
      }
      return res
    }),
    startWith(config),
    shareReplay(1),
  )
}

export function updateClass(governor: Governor): (source: Observable<{ [name: string]: boolean }>) => Observable<{ [name: string]: boolean }> {
  return (source: Observable<{ [name: string]: boolean }>) => source.pipe(
    tap(classes => {
      governor.configureClasses(classes)
    }),
  )
}

export function updateStyle(governor: Governor): (source: Observable<{ [name: string]: string }>) => Observable<{ [name: string]: string }> {
  return (source: Observable<{ [name: string]: string }>) => source.pipe(
    tap(styles => {
      governor.configureStyles(styles)
    }),
  )
}
