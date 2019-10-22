import { createBreakpoint } from './index'

describe('breakpoint', () => {
  it('generates an object with default properties if no parameters are given', () => {
    const breakpoint = createBreakpoint()
    expect(breakpoint).toBeTruthy()
    expect(typeof breakpoint).toBe('object')
    expect(breakpoint).toHaveProperty('up.xs')
    expect(breakpoint).toHaveProperty('up.sm')
    expect(breakpoint).toHaveProperty('up.md')
    expect(breakpoint).toHaveProperty('up.lg')
    expect(breakpoint).toHaveProperty('up.xl')
    expect(breakpoint).toHaveProperty('down.xs')
    expect(breakpoint).toHaveProperty('down.sm')
    expect(breakpoint).toHaveProperty('down.md')
    expect(breakpoint).toHaveProperty('down.lg')
    expect(breakpoint).toHaveProperty('down.xl')
  })

  it('generates an object with default properties if options does not contain "entries"', () => {
    const breakpoint = createBreakpoint({ unit: 'em', step: 10 })
    expect(breakpoint).toBeTruthy()
    expect(typeof breakpoint).toBe('object')
    expect(breakpoint).toHaveProperty('up.xs')
    expect(breakpoint).toHaveProperty('up.sm')
    expect(breakpoint).toHaveProperty('up.md')
    expect(breakpoint).toHaveProperty('up.lg')
    expect(breakpoint).toHaveProperty('up.xl')
    expect(breakpoint).toHaveProperty('down.xs')
    expect(breakpoint).toHaveProperty('down.sm')
    expect(breakpoint).toHaveProperty('down.md')
    expect(breakpoint).toHaveProperty('down.lg')
    expect(breakpoint).toHaveProperty('down.xl')
  })

  it('generates an object with the given properties if options does contain "entries"', () => {
    const breakpoint = createBreakpoint({ entries: { s: 100, m: 200, g: 300 } })
    expect(breakpoint).toBeTruthy()
    expect(typeof breakpoint).toBe('object')
    expect(breakpoint).toHaveProperty('up.s')
    expect(breakpoint).toHaveProperty('up.m')
    expect(breakpoint).toHaveProperty('up.g')
    expect(breakpoint).toHaveProperty('down.s')
    expect(breakpoint).toHaveProperty('down.m')
    expect(breakpoint).toHaveProperty('down.g')
  })

  it('correctly build the default strings', () => {
    const breakpoint = createBreakpoint()

    expect(breakpoint.up.xs).toBe('@media (min-width:0px)')
    expect(breakpoint.up.sm).toBe('@media (min-width:600px)')
    expect(breakpoint.up.md).toBe('@media (min-width:960px)')
    expect(breakpoint.up.lg).toBe('@media (min-width:1280px)')
    expect(breakpoint.up.xl).toBe('@media (min-width:1920px)')

    // Value is index + 1 - step(5) / 100
    expect(breakpoint.down.xs).toBe('@media (max-width:599.95px)')
    expect(breakpoint.down.sm).toBe('@media (max-width:959.95px)')
    expect(breakpoint.down.md).toBe('@media (max-width:1279.95px)')
    expect(breakpoint.down.lg).toBe('@media (max-width:1919.95px)')
    expect(breakpoint.down.xl).toBe('@media (min-width:0px)')
  })

  it('correctly build strings with custom entries', () => {
    const breakpoint = createBreakpoint({ entries: { s: 100, m: 200, g: 300 } })
    expect(breakpoint.up.s).toBe('@media (min-width:100px)')
    expect(breakpoint.up.m).toBe('@media (min-width:200px)')
    expect(breakpoint.up.g).toBe('@media (min-width:300px)')

    expect(breakpoint.down.s).toBe('@media (max-width:199.95px)')
    expect(breakpoint.down.m).toBe('@media (max-width:299.95px)')
    expect(breakpoint.down.g).toBe('@media (min-width:100px)')
  })

  it('correctly build strings with custom unit', () => {
    const breakpoint = createBreakpoint({ entries: { small: 100, big: 300 }, unit: 'em' })
    expect(breakpoint.up.small).toBe('@media (min-width:100em)')
    expect(breakpoint.up.big).toBe('@media (min-width:300em)')

    expect(breakpoint.down.small).toBe('@media (max-width:299.95em)')
    expect(breakpoint.down.big).toBe('@media (min-width:100em)')
  })

  it('correctly build strings with custom step', () => {
    const breakpoint = createBreakpoint({ entries: { small: 100, big: 300 }, step: 10 })
    expect(breakpoint.up.small).toBe('@media (min-width:100px)')
    expect(breakpoint.up.big).toBe('@media (min-width:300px)')

    expect(breakpoint.down.small).toBe('@media (max-width:299.9px)')
    expect(breakpoint.down.big).toBe('@media (min-width:100px)')
  })
})
