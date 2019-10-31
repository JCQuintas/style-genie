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

  it('generates a function with the given increment', () => {
    const spacing = generateSpacing({ increment: 10 })
    expect(spacing).toBeTruthy()
    expect(typeof spacing).toBe('function')
  })

  it('correctly uses the given increment', () => {
    const spacing = generateSpacing({ increment: 10 })

    expect(spacing()).toBe('10px')
    expect(spacing(true)).toBe(10)
    expect(spacing(2)).toBe('20px')
    expect(spacing(2, true)).toBe(20)
    expect(spacing(2, 3)).toBe('20px 30px')
    expect(spacing(2, 3, 4)).toBe('20px 30px 40px')
    expect(spacing(2, 3, 4, 5)).toBe('20px 30px 40px 50px')
  })

  it('generates a function with the given base', () => {
    const spacing = generateSpacing({ base: 10 })
    expect(spacing).toBeTruthy()
    expect(typeof spacing).toBe('function')
  })

  it('correctly uses the given base', () => {
    const spacing = generateSpacing({ base: 10 })

    expect(spacing()).toBe('18px')
    expect(spacing(true)).toBe(18)
    expect(spacing(2)).toBe('26px')
    expect(spacing(2, true)).toBe(26)
    expect(spacing(2, 3)).toBe('26px 34px')
    expect(spacing(2, 3, 4)).toBe('26px 34px 42px')
    expect(spacing(2, 3, 4, 5)).toBe('26px 34px 42px 50px')
  })

  it('generates a function with the given unit', () => {
    const spacing = generateSpacing({ unit: 'rem' })
    expect(spacing).toBeTruthy()
    expect(typeof spacing).toBe('function')
  })

  it('correctly uses the given unit', () => {
    const spacing = generateSpacing({ unit: 'rem' })

    expect(spacing()).toBe('8rem')
    expect(spacing(true)).toBe(8)
    expect(spacing(2)).toBe('16rem')
    expect(spacing(2, true)).toBe(16)
    expect(spacing(2, 3)).toBe('16rem 24rem')
    expect(spacing(2, 3, 4)).toBe('16rem 24rem 32rem')
    expect(spacing(2, 3, 4, 5)).toBe('16rem 24rem 32rem 40rem')
  })

  it('generates a function with all the given options', () => {
    const spacing = generateSpacing({ unit: 'rem', base: 1, increment: 0.125 })
    expect(spacing).toBeTruthy()
    expect(typeof spacing).toBe('function')
  })

  it('correctly uses all the given options', () => {
    const spacing = generateSpacing({ unit: 'rem', base: 1, increment: 0.125 })

    expect(spacing()).toBe('1.125rem')
    expect(spacing(true)).toBe(1.125)
    expect(spacing(2)).toBe('1.25rem')
    expect(spacing(2, true)).toBe(1.25)
    expect(spacing(2, 3)).toBe('1.25rem 1.375rem')
    expect(spacing(2, 3, 4)).toBe('1.25rem 1.375rem 1.5rem')
    expect(spacing(2, 3, 4, 5)).toBe('1.25rem 1.375rem 1.5rem 1.625rem')
  })

  it('correctly works when passing ZERO in', () => {
    const rem = generateSpacing({ unit: 'rem', base: 1, increment: 0.125 })
    const px = generateSpacing()

    expect(rem(0)).toBe('1rem')
    expect(rem(0, 0, 0, 0)).toBe('1rem 1rem 1rem 1rem')
    expect(px(0)).toBe('0px')
    expect(px(0, 0, 0, 0)).toBe('0px 0px 0px 0px')
  })

  it('correctly works when passing negative numbers', () => {
    const rem = generateSpacing({ unit: 'rem', base: 1, increment: 0.125 })
    const px = generateSpacing()

    expect(rem(-1)).toBe('0.875rem')
    expect(rem(-1, -2, -3, -4)).toBe('0.875rem 0.75rem 0.625rem 0.5rem')
    expect(px(-1)).toBe('-8px')
    expect(px(-1, -2, -3, -4)).toBe('-8px -16px -24px -32px')
  })

  it('correctly works when passing negative ZERO to allow values with base to return zero', () => {
    const rem = generateSpacing({ unit: 'rem', base: 1, increment: 0.125 })
    const px = generateSpacing()

    expect(rem(-0)).toBe('0rem')
    expect(rem(-0, -0, -0, -0)).toBe('0rem 0rem 0rem 0rem')
    expect(px(-0)).toBe('0px')
    expect(px(-0, -0, -0, -0)).toBe('0px 0px 0px 0px')
  })
})
