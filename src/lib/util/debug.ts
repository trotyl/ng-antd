/* istanbul ignore next */
export function assertExist(exp: any, message: string): void {
  if (exp == null) throwError(message)
}

/* istanbul ignore next */
export function assertFalse(exp: boolean, message: string): void {
  if (exp) throwError(message)
}

/* istanbul ignore next */
export function assertTrue(exp: boolean, message: string): void {
  if (!exp) throwError(message)
}

/* istanbul ignore next */
export function length(exp: any[] | { [key: string]: any }): number {
  return Array.isArray(exp) ? exp.length : Object.keys(exp).length
}

/* istanbul ignore next */
export function throwError(message: string): never {
  throw new Error(message)
}
