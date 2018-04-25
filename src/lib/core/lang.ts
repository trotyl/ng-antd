export function boolify(value: boolean | string): boolean {
  return typeof value === 'string' ? value === '' || value !== 'false' : value
}

export function getSizeToken(value: string | null): 'lg' | 'sm' | 'nosize' {
  return value === 'large' ? 'lg' :
    value === 'small' ? 'sm' :
    'nosize'
}
