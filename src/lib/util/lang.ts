export type OnChangeFn<T> = (value: T | null) => void
export type OnTouchedFn = () => void

export function noop(): void { }

export function range(start: number, end: number): number[] {
  const length = end - start + 1
  return new Array(length).fill(0).map((_, i) => start + i)
}
