export type OnChangeFn<T> = (value: T | null) => void
export type OnTouchedFn = () => void

export function noop(): void { }

const sizeMap = {
  'large': 'lg',
  'small': 'sm',
}

export function getSizeToken(value: 'large' | 'small' | null): 'lg' | 'sm' | 'noop' {
  if (value && !sizeMap.hasOwnProperty(value)) {
    throw new Error(`Invalid size value: ${value}`)
  }
  return (value && sizeMap[value] as 'lg' | 'sm') || 'noop'
}

export function range(start: number, end: number): number[] {
  const length = end - start + 1
  return new Array(length).fill(0).map((_, i) => start + i)
}
