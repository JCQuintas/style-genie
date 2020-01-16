import { generateBreakpoint } from './index'

const breakpointShape = {
  xs: expect.any(String),
  sm: expect.any(String),
  md: expect.any(String),
  lg: expect.any(String),
  xl: expect.any(String),
}

const customShape = {
  s: expect.any(String),
  m: expect.any(String),
  g: expect.any(String),
}

describe('breakpoint', () => {
  it('generates an object with default properties if no parameters are given', () => {
    const breakpoint = generateBreakpoint()
    expect(breakpoint).toBeTruthy()
    expect(typeof breakpoint).toBe('object')
    expect(breakpoint).toStrictEqual(
      expect.objectContaining({
        up: breakpointShape,
        down: breakpointShape,
        only: breakpointShape,
        between: expect.any(Function),
      })
    )
  })

  it('generates an object with the given properties if options does contain "breakpoints"', () => {
    const breakpoint = generateBreakpoint({ breakpoints: { s: 100, m: 200, g: 300 } })
    expect(breakpoint).toBeTruthy()
    expect(typeof breakpoint).toBe('object')
    expect(breakpoint).toStrictEqual(
      expect.objectContaining({
        up: customShape,
        down: customShape,
        only: customShape,
        between: expect.any(Function),
      })
    )
  })

  it('correctly build the default strings', () => {
    const breakpoint = generateBreakpoint()

    expect(breakpoint.up.xs).toBe('@media (min-width: 0px)')
    expect(breakpoint.up.sm).toBe('@media (min-width: 600px)')
    expect(breakpoint.up.md).toBe('@media (min-width: 960px)')
    expect(breakpoint.up.lg).toBe('@media (min-width: 1280px)')
    expect(breakpoint.up.xl).toBe('@media (min-width: 1920px)')

    // Value is index + 1 - step(5) / 100
    expect(breakpoint.down.xs).toBe('@media (max-width: 599.95px)')
    expect(breakpoint.down.sm).toBe('@media (max-width: 959.95px)')
    expect(breakpoint.down.md).toBe('@media (max-width: 1279.95px)')
    expect(breakpoint.down.lg).toBe('@media (max-width: 1919.95px)')
    expect(breakpoint.down.xl).toBe('@media (min-width: 0px)')

    expect(breakpoint.only.xs).toBe('@media (min-width: 0px) and (max-width: 599.95px)')
    expect(breakpoint.only.sm).toBe('@media (min-width: 600px) and (max-width: 959.95px)')
    expect(breakpoint.only.md).toBe('@media (min-width: 960px) and (max-width: 1279.95px)')
    expect(breakpoint.only.lg).toBe('@media (min-width: 1280px) and (max-width: 1919.95px)')
    expect(breakpoint.only.xl).toBe('@media (min-width: 1920px)')

    expect(breakpoint.between('xs', 'sm')).toBe('@media (min-width: 0px) and (max-width: 599.95px)')
    expect(breakpoint.between('sm', 'md')).toBe('@media (min-width: 600px) and (max-width: 959.95px)')
    expect(breakpoint.between('md', 'lg')).toBe('@media (min-width: 960px) and (max-width: 1279.95px)')
    expect(breakpoint.between('lg', 'xl')).toBe('@media (min-width: 1280px) and (max-width: 1919.95px)')

    expect(breakpoint.between('xs', 'xl')).toBe('@media (min-width: 0px) and (max-width: 1919.95px)')
    expect(breakpoint.between('sm', 'lg')).toBe('@media (min-width: 600px) and (max-width: 1279.95px)')
    expect(breakpoint.between('md', 'sm')).toBe('@media (min-width: 600px) and (max-width: 959.95px)')
    expect(breakpoint.between('lg', 'xs')).toBe('@media (min-width: 0px) and (max-width: 1279.95px)')
  })

  it('correctly build strings with custom breakpoints', () => {
    const breakpoint = generateBreakpoint({ breakpoints: { s: 100, m: 200, g: 300 } })
    expect(breakpoint.up.s).toBe('@media (min-width: 100px)')
    expect(breakpoint.up.m).toBe('@media (min-width: 200px)')
    expect(breakpoint.up.g).toBe('@media (min-width: 300px)')

    expect(breakpoint.down.s).toBe('@media (max-width: 199.95px)')
    expect(breakpoint.down.m).toBe('@media (max-width: 299.95px)')
    expect(breakpoint.down.g).toBe('@media (min-width: 100px)')

    expect(breakpoint.only.s).toBe('@media (min-width: 100px) and (max-width: 199.95px)')
    expect(breakpoint.only.m).toBe('@media (min-width: 200px) and (max-width: 299.95px)')
    expect(breakpoint.only.g).toBe('@media (min-width: 300px)')

    expect(breakpoint.between('s', 'm')).toBe('@media (min-width: 100px) and (max-width: 199.95px)')
    expect(breakpoint.between('m', 'g')).toBe('@media (min-width: 200px) and (max-width: 299.95px)')

    expect(breakpoint.between('s', 'g')).toBe('@media (min-width: 100px) and (max-width: 299.95px)')
    expect(breakpoint.between('g', 'm')).toBe('@media (min-width: 200px) and (max-width: 299.95px)')
  })
})
