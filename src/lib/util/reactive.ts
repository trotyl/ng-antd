import { Observable } from 'rxjs'
import { map, tap } from 'rxjs/operators'
import { Governor } from '../extension/governor'

export type Transforms<T> = {
  [P in keyof T]?: Function
}

export function coerce<T, R>(transforms: Transforms<T>): (source: Observable<R>) => Observable<R> {
  return (source: Observable<R>) => source.pipe(
    map(inputs => {
      const res: R = {} as any
      for (const key of Object.keys(inputs) as Array<keyof T & keyof R>) {
        const transform = transforms[key]
        if (transform) {
          res[key] = transform(inputs[key])
        } else {
          res[key] = inputs[key]
        }
      }
      return res
    }),
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
