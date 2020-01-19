import { generateTransform } from './index'

describe('transform', () => {
  it('generates a function with default parameters if no parameters are given', () => {
    const transform = generateTransform()
    expect(transform).toBeTruthy()
    expect(typeof transform).toBe('function')
  })

  it('', () => {})
})
