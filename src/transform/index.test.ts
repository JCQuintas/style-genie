import { generateTransform } from './index'

describe('transform', () => {
  it('correctly generates a function with default parameters if no parameters are given', () => {
    const transform = generateTransform()
    expect(transform).toBeTruthy()
    expect(typeof transform).toBe('function')
  })

  it('correctly generates a matrix function', () => {
    const transform = generateTransform()

    expect(transform({ matrix: [0, 0, 0, 0, 0, 0] })).toBe('matrix(0, 0, 0, 0, 0, 0)')
    expect(
      transform({
        matrix: {
          a: 0,
          b: 0,
          c: 0,
          d: 0,
          tx: 0,
          ty: 0,
        },
      })
    ).toBe('matrix(0, 0, 0, 0, 0, 0)')
  })

  it('correctly generates a matrix3d function', () => {
    const transform = generateTransform()

    expect(transform({ matrix3d: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] })).toBe(
      'matrix3d(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0)'
    )
    expect(
      transform({
        matrix3d: {
          a1: 0,
          a2: 0,
          a3: 0,
          a4: 0,
          b1: 0,
          b2: 0,
          b3: 0,
          b4: 0,
          c1: 0,
          c2: 0,
          c3: 0,
          c4: 0,
          d1: 0,
          d2: 0,
          d3: 0,
          d4: 0,
        },
      })
    ).toBe('matrix3d(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0)')
  })

  it('correctly generates a perspective function with default params', () => {
    const transform = generateTransform()

    expect(transform({ perspective: 10 })).toBe('perspective(10px)')
    expect(transform({ perspective: '10em' })).toBe('perspective(10em)')
  })

  it('correctly generates a perspective function with custom params', () => {
    const transform = generateTransform({ units: { perspective: 'rem' } })

    expect(transform({ perspective: 10 })).toBe('perspective(10rem)')
    expect(transform({ perspective: '10em' })).toBe('perspective(10em)')
  })

  it('correctly generates a rotate/X/Y/Z function with default params', () => {
    const transform = generateTransform()

    expect(transform({ rotate: 10 })).toBe('rotate(10deg)')
    expect(transform({ rotate: '10turn' })).toBe('rotate(10turn)')
    expect(transform({ rotateX: 10 })).toBe('rotateX(10deg)')
    expect(transform({ rotateX: '10turn' })).toBe('rotateX(10turn)')
    expect(transform({ rotateY: 10 })).toBe('rotateY(10deg)')
    expect(transform({ rotateY: '10turn' })).toBe('rotateY(10turn)')
    expect(transform({ rotateZ: 10 })).toBe('rotateZ(10deg)')
    expect(transform({ rotateZ: '10turn' })).toBe('rotateZ(10turn)')
  })

  it('correctly generates a rotate/X/Y/Z function with custom params', () => {
    const transform = generateTransform({ units: { rotate: 'grad' } })

    expect(transform({ rotate: 10 })).toBe('rotate(10grad)')
    expect(transform({ rotate: '10turn' })).toBe('rotate(10turn)')
    expect(transform({ rotateX: 10 })).toBe('rotateX(10grad)')
    expect(transform({ rotateX: '10turn' })).toBe('rotateX(10turn)')
    expect(transform({ rotateY: 10 })).toBe('rotateY(10grad)')
    expect(transform({ rotateY: '10turn' })).toBe('rotateY(10turn)')
    expect(transform({ rotateZ: 10 })).toBe('rotateZ(10grad)')
    expect(transform({ rotateZ: '10turn' })).toBe('rotateZ(10turn)')
  })

  it('correctly generates a rotate3d function with default params', () => {
    const transform = generateTransform()

    expect(transform({ rotate3d: [10, 10, 10, 10] })).toBe('rotate3d(10, 10, 10, 10deg)')
    expect(transform({ rotate3d: [10, 10, 10, '10rad'] })).toBe('rotate3d(10, 10, 10, 10rad)')
    expect(transform({ rotate3d: { x: 10, y: 10, z: 10, a: 10 } })).toBe('rotate3d(10, 10, 10, 10deg)')
    expect(transform({ rotate3d: { x: 10, y: 10, z: 10, a: '10rad' } })).toBe('rotate3d(10, 10, 10, 10rad)')
    expect(transform({ rotate3d: '10, 10, 10, 10turn' })).toBe('rotate3d(10, 10, 10, 10turn)')
  })

  it('correctly generates a rotate3d function with custom params', () => {
    const transform = generateTransform({ units: { rotate: 'grad' } })

    expect(transform({ rotate3d: [10, 10, 10, 10] })).toBe('rotate3d(10, 10, 10, 10grad)')
    expect(transform({ rotate3d: [10, 10, 10, '10rad'] })).toBe('rotate3d(10, 10, 10, 10rad)')
    expect(transform({ rotate3d: { x: 10, y: 10, z: 10, a: 10 } })).toBe('rotate3d(10, 10, 10, 10grad)')
    expect(transform({ rotate3d: { x: 10, y: 10, z: 10, a: '10rad' } })).toBe('rotate3d(10, 10, 10, 10rad)')
    expect(transform({ rotate3d: '10, 10, 10, 10turn' })).toBe('rotate3d(10, 10, 10, 10turn)')
  })

  it('correctly generates a scale function', () => {
    const transform = generateTransform()

    expect(transform({ scale: 10 })).toBe('scale(10)')
    expect(transform({ scale: [10] })).toBe('scale(10)')
    expect(transform({ scale: [10, 10] })).toBe('scale(10, 10)')
    expect(transform({ scale: { sx: 10 } })).toBe('scale(10)')
    expect(transform({ scale: { sx: 10, sy: 10 } })).toBe('scale(10, 10)')
  })

  it('correctly generates a scaleX/Y/Z function', () => {
    const transform = generateTransform()

    expect(transform({ scaleX: 10 })).toBe('scaleX(10)')
    expect(transform({ scaleY: 10 })).toBe('scaleY(10)')
    expect(transform({ scaleZ: 10 })).toBe('scaleZ(10)')
  })

  it('correctly generates a scale3d function', () => {
    const transform = generateTransform()

    expect(transform({ scale3d: [10, 10, 10] })).toBe('scale3d(10, 10, 10)')
    expect(transform({ scale3d: { sx: 10, sy: 10, sz: 10 } })).toBe('scale3d(10, 10, 10)')
  })

  it('correctly generates a skew/X/Y function with default params', () => {
    const transform = generateTransform()

    expect(transform({ skew: 10 })).toBe('skew(10deg)')
    expect(transform({ skew: '10rad' })).toBe('skew(10rad)')
    expect(transform({ skew: [10] })).toBe('skew(10deg)')
    expect(transform({ skew: [10, 10] })).toBe('skew(10deg, 10deg)')
    expect(transform({ skew: ['10rad', '10rad'] })).toBe('skew(10rad, 10rad)')
    expect(transform({ skew: { ax: 10 } })).toBe('skew(10deg)')
    expect(transform({ skew: { ax: 10, ay: 10 } })).toBe('skew(10deg, 10deg)')
    expect(transform({ skew: { ax: '10rad', ay: '10rad' } })).toBe('skew(10rad, 10rad)')

    expect(transform({ skewX: 10 })).toBe('skewX(10deg)')
    expect(transform({ skewY: 10 })).toBe('skewY(10deg)')
  })

  it('correctly generates a skew/X/Y function with custom params', () => {
    const transform = generateTransform({ units: { skew: 'grad' } })

    expect(transform({ skew: 10 })).toBe('skew(10grad)')
    expect(transform({ skew: '10rad' })).toBe('skew(10rad)')
    expect(transform({ skew: [10] })).toBe('skew(10grad)')
    expect(transform({ skew: [10, 10] })).toBe('skew(10grad, 10grad)')
    expect(transform({ skew: ['10rad', '10rad'] })).toBe('skew(10rad, 10rad)')
    expect(transform({ skew: { ax: 10 } })).toBe('skew(10grad)')
    expect(transform({ skew: { ax: 10, ay: 10 } })).toBe('skew(10grad, 10grad)')
    expect(transform({ skew: { ax: '10rad', ay: '10rad' } })).toBe('skew(10rad, 10rad)')

    expect(transform({ skewX: 10 })).toBe('skewX(10grad)')
    expect(transform({ skewY: 10 })).toBe('skewY(10grad)')
  })

  it('correctly generates a translate/X/Y function with default params', () => {
    const transform = generateTransform()

    expect(transform({ translate: 10 })).toBe('translate(10%)')
    expect(transform({ translate: '10em' })).toBe('translate(10em)')
    expect(transform({ translate: [10] })).toBe('translate(10%)')
    expect(transform({ translate: [10, 10] })).toBe('translate(10%, 10%)')
    expect(transform({ translate: ['10em', '10em'] })).toBe('translate(10em, 10em)')
    expect(transform({ translate: { tx: 10 } })).toBe('translate(10%)')
    expect(transform({ translate: { tx: 10, ty: 10 } })).toBe('translate(10%, 10%)')
    expect(transform({ translate: { tx: '10em', ty: '10em' } })).toBe('translate(10em, 10em)')

    expect(transform({ translateX: 10 })).toBe('translateX(10%)')
    expect(transform({ translateY: 10 })).toBe('translateY(10%)')
  })

  it('correctly generates a translate/X/Y function with custom params', () => {
    const transform = generateTransform({ units: { translate: { xy: 'px' } } })

    expect(transform({ translate: 10 })).toBe('translate(10px)')
    expect(transform({ translate: '10em' })).toBe('translate(10em)')
    expect(transform({ translate: [10] })).toBe('translate(10px)')
    expect(transform({ translate: [10, 10] })).toBe('translate(10px, 10px)')
    expect(transform({ translate: ['10em', '10em'] })).toBe('translate(10em, 10em)')
    expect(transform({ translate: { tx: 10 } })).toBe('translate(10px)')
    expect(transform({ translate: { tx: 10, ty: 10 } })).toBe('translate(10px, 10px)')
    expect(transform({ translate: { tx: '10em', ty: '10em' } })).toBe('translate(10em, 10em)')

    expect(transform({ translateX: 10 })).toBe('translateX(10px)')
    expect(transform({ translateY: 10 })).toBe('translateY(10px)')
  })

  it('correctly generates a translateZ function with default params', () => {
    const transform = generateTransform()

    expect(transform({ translateZ: 10 })).toBe('translateZ(10px)')
    expect(transform({ translateZ: '10em' })).toBe('translateZ(10em)')
  })

  it('correctly generates a translateZ function with custom params', () => {
    const transform = generateTransform({ units: { translate: { z: 'rem' } } })

    expect(transform({ translateZ: 10 })).toBe('translateZ(10rem)')
    expect(transform({ translateZ: '10em' })).toBe('translateZ(10em)')
  })

  it('correctly generates a translate3d function with default params', () => {
    const transform = generateTransform()

    expect(transform({ translate3d: '10em' })).toBe('translate3d(10em)')
    expect(transform({ translate3d: [10, 10, 10] })).toBe('translate3d(10%, 10%, 10px)')
    expect(transform({ translate3d: ['10em', '10em', '10em'] })).toBe('translate3d(10em, 10em, 10em)')
    expect(transform({ translate3d: { tx: 10, ty: 10, tz: 10 } })).toBe('translate3d(10%, 10%, 10px)')
    expect(transform({ translate3d: { tx: '10em', ty: '10em', tz: '10em' } })).toBe('translate3d(10em, 10em, 10em)')
  })

  it('correctly generates a translate3d function with custom params', () => {
    const transform = generateTransform({ units: { translate: { xy: 'px', z: 'rem' } } })

    expect(transform({ translate3d: '10em' })).toBe('translate3d(10em)')
    expect(transform({ translate3d: [10, 10, 10] })).toBe('translate3d(10px, 10px, 10rem)')
    expect(transform({ translate3d: ['10em', '10em', '10em'] })).toBe('translate3d(10em, 10em, 10em)')
    expect(transform({ translate3d: { tx: 10, ty: 10, tz: 10 } })).toBe('translate3d(10px, 10px, 10rem)')
    expect(transform({ translate3d: { tx: '10em', ty: '10em', tz: '10em' } })).toBe('translate3d(10em, 10em, 10em)')
  })

  it('correctly ignores unknown props', () => {
    const transform = generateTransform()

    //@ts-ignore
    expect(transform({ aha: 10 })).toBe('')
  })

  it('returns the functions in the correct order if array is provided', () => {
    const transform = generateTransform()

    expect(transform([{ perspective: 10 }, { rotate: 10, scale: 1.5 }])).toBe(
      'perspective(10px) rotate(10deg) scale(1.5)'
    )
  })

  it('allows repeating functions', () => {
    const transform = generateTransform()

    expect(transform([{ rotate: 15 }, { rotate: 10, scale: 1.5 }])).toBe('rotate(15deg) rotate(10deg) scale(1.5)')
  })
})
