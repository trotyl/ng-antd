import { isDevMode } from '@angular/core'

/* istanbul ignore next */
export function assert(message: string, ...rules: boolean[]): void {
  if (/*@__PURE__*/isDevMode() && /*@__PURE__*/rules.every(_ => _)) {
    /*@__PURE__*/throwError(message)
  }
}

/* istanbul ignore next */
export function empty(exp: any[] | { [key: string]: any }): boolean {
  return /*@__PURE__*/length(exp) === 0
}

/* istanbul ignore next */
export function length(exp: any[] | { [key: string]: any }): number {
  return Array.isArray(exp) ? exp.length : Object.keys(exp).length
}

/* istanbul ignore next */
export function notEmpty(exp: any[] | { [key: string]: any }): boolean {
  return !empty(exp)
}

/* istanbul ignore next */
export function throwError(message: string): never {
  throw new Error(message)
}
