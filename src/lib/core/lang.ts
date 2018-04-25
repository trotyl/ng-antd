export function getSizeToken(value: string | null): 'lg' | 'sm' | 'nosize' {
  return value === 'large' ? 'lg' :
    value === 'small' ? 'sm' :
    'nosize'
}
