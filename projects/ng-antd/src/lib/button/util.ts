export function toButtonSize(input: string | null): string {
  switch (input) {
    case 'large': return 'lg'
    case 'small': return 'sm'
    case null: return 'sizenoop'
    default: return 'sizeinvalid'
  }
}
