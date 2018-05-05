const sizeMap = {
  'large': 'lg',
  'small': 'sm',
}

export function getSizeToken(value: 'large' | 'small' | null, context: string): 'lg' | 'sm' | 'noop' {
  if (value && !sizeMap.hasOwnProperty(value)) {
    throw new Error(`${context}: invalid size value '${value}'`)
  }
  return (value && sizeMap[value] as 'lg' | 'sm') || 'noop'
}
