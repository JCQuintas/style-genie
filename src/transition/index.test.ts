import { createTransition } from './index'

describe('transition', () => {
  it('generates a function with default parameters if no parameters are given', () => {
    const transition = createTransition()
    expect(transition).toBeTruthy()
    expect(typeof transition).toBe('function')
  })

  it('correctly uses the default parameters', () => {
    const transition = createTransition()

    expect(transition()).toBe('all 250ms cubic-bezier(0.4, 0, 0.2, 1)')
    expect(transition('opacity')).toBe('opacity 250ms cubic-bezier(0.4, 0, 0.2, 1)')
    expect(transition('opacity', 100)).toBe('opacity 100ms cubic-bezier(0.4, 0, 0.2, 1)')
    expect(transition('opacity', 'ease-in')).toBe('opacity 250ms ease-in')
    expect(transition(['opacity', 'color'])).toBe(
      'opacity 250ms cubic-bezier(0.4, 0, 0.2, 1), color 250ms cubic-bezier(0.4, 0, 0.2, 1)'
    )
  })

  it('generates a function with the given options', () => {
    const duration = createTransition({ duration: 500 })
    const easing = createTransition({ easing: 'ease-out' })
    const both = createTransition({ duration: 1000, easing: 'linear' })
    expect(duration).toBeTruthy()
    expect(easing).toBeTruthy()
    expect(both).toBeTruthy()
    expect(typeof duration).toBe('function')
    expect(typeof easing).toBe('function')
    expect(typeof both).toBe('function')
  })

  it('correctly uses the given duration parameter', () => {
    const transition = createTransition({ duration: 500 })

    expect(transition()).toBe('all 500ms cubic-bezier(0.4, 0, 0.2, 1)')
    expect(transition('opacity')).toBe('opacity 500ms cubic-bezier(0.4, 0, 0.2, 1)')
    expect(transition('opacity', 100)).toBe('opacity 100ms cubic-bezier(0.4, 0, 0.2, 1)')
    expect(transition('opacity', 'ease-in')).toBe('opacity 500ms ease-in')
    expect(transition(['opacity', 'color'])).toBe(
      'opacity 500ms cubic-bezier(0.4, 0, 0.2, 1), color 500ms cubic-bezier(0.4, 0, 0.2, 1)'
    )
  })

  it('correctly uses the given easing parameter', () => {
    const transition = createTransition({ easing: 'ease-out' })

    expect(transition()).toBe('all 250ms ease-out')
    expect(transition('opacity')).toBe('opacity 250ms ease-out')
    expect(transition('opacity', 100)).toBe('opacity 100ms ease-out')
    expect(transition('opacity', 'ease-in')).toBe('opacity 250ms ease-in')
    expect(transition(['opacity', 'color'])).toBe('opacity 250ms ease-out, color 250ms ease-out')
  })

  it('correctly uses both given easing parameter', () => {
    const transition = createTransition({ duration: 1000, easing: 'linear' })

    expect(transition()).toBe('all 1000ms linear')
    expect(transition('opacity')).toBe('opacity 1000ms linear')
    expect(transition('opacity', 100)).toBe('opacity 100ms linear')
    expect(transition('opacity', 'ease-in')).toBe('opacity 1000ms ease-in')
    expect(transition(['opacity', 'color'])).toBe('opacity 1000ms linear, color 1000ms linear')
  })
})
