import { getSizeToken } from './size'

describe('Size', () => {
  it('should get sm for small', () => {
    expect(getSizeToken('small')).toBe('sm')
  })

  it('should get lg for large', () => {
    expect(getSizeToken('large')).toBe('lg')
  })

  it('should get noop for null', () => {
    expect(getSizeToken(null)).toBe('noop')
  })

  it('should throw for invalid value', () => {
    expect(() => getSizeToken('foo' as any)).toThrowError(/Invalid size value: foo/)
  })
})
