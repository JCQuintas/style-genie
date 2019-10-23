import { generateSpacing } from './index'

describe('spacing', () => {
  it('generates a function with default parameters if no parameters are given', () => {
    const spacing = generateSpacing()
    expect(spacing).toBeTruthy()
    expect(typeof spacing).toBe('function')
  })

  it('correctly uses the default parameters', () => {
    const spacing = generateSpacing()

    expect(spacing()).toBe('8px')
    expect(spacing(true)).toBe(8)
    expect(spacing(2)).toBe('16px')
    expect(spacing(2, true)).toBe(16)
    expect(spacing(2, 3)).toBe('16px 24px')
    expect(spacing(2, 3, 4)).toBe('16px 24px 32px')
    expect(spacing(2, 3, 4, 5)).toBe('16px 24px 32px 40px')
  })

  it('generates a function with the given options', () => {
    const spacing = generateSpacing({ increment: 10 })
    expect(spacing).toBeTruthy()
    expect(typeof spacing).toBe('function')
  })

  it('correctly uses the given options', () => {
    const spacing = generateSpacing({ increment: 10 })

    expect(spacing()).toBe('10px')
    expect(spacing(true)).toBe(10)
    expect(spacing(2)).toBe('20px')
    expect(spacing(2, true)).toBe(20)
    expect(spacing(2, 3)).toBe('20px 30px')
    expect(spacing(2, 3, 4)).toBe('20px 30px 40px')
    expect(spacing(2, 3, 4, 5)).toBe('20px 30px 40px 50px')
  })
})
