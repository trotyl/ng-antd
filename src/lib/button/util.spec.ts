import { toButtonSize } from './util'

describe('ButtonSizeUtil', () => {
  it('should get sm for small', () => {
    expect(toButtonSize('small')).toBe('sm')
  })

  it('should get lg for large', () => {
    expect(toButtonSize('large')).toBe('lg')
  })

  it('should get noop for null', () => {
    expect(toButtonSize(null)).toBe('sizenoop')
  })

  it('should get invalid for other value', () => {
    expect(toButtonSize('foo')).toBe('sizeinvalid')
  })
})
