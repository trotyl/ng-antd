import { getSizeToken } from './size'

describe('Size', () => {
  it('should get sm for small', () => {
    expect(getSizeToken('small', 'antTest')).toBe('sm')
  })

  it('should get lg for large', () => {
    expect(getSizeToken('large', 'antTest')).toBe('lg')
  })

  it('should get noop for null', () => {
    expect(getSizeToken(null, 'antTest')).toBe('noop')
  })

  it('should throw for invalid value', () => {
    expect(() => getSizeToken('foo' as any, 'antTest')).toThrowError(/antTest: invalid size value 'foo'/)
  })
})
