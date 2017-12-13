export function boolify(value: boolean | string): boolean {
  return typeof value === 'string' ? value === '' || value !== 'false' : value
}

export function exist(value: string | null | undefined): boolean {
  return typeof value === 'string' ? value !== 'default' : !!value
}

export interface TypedChange<T> {
  previousValue: T
  currentValue: T
  firstChange: boolean
  isFirstChange(): boolean
}

export type TypedChanges<C> = {
  [P in keyof C]?: TypedChange<C[P]>
}
