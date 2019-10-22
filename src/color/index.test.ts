import { createColor } from './index'

describe('breakpoint', () => {
  it('generates black from invalid input', () => {
    const color = createColor('255')

    expect(color).toMatchObject({
      color: 'rgba(0, 0, 0, 1)',
      hex: '#000000',
    })
  })

  it('generates a color object from number input', () => {
    const color = createColor(255)

    expect(color).toMatchObject({
      color: 'rgba(255, 255, 255, 1)',
      hex: '#ffffff',
    })
  })

  it('generates a color object from number array input', () => {
    const color = createColor([0, 0, 255])

    expect(color).toMatchObject({
      color: 'rgba(0, 0, 255, 1)',
      hex: '#0000ff',
    })
  })

  it('generates a color object from hex color input', () => {
    const color = createColor('#00FF00')

    expect(color).toMatchObject({
      color: 'rgba(0, 255, 0, 1)',
      hex: '#00ff00',
    })
  })

  it('generates a color object from short hex color input', () => {
    const color = createColor('#505')

    expect(color).toMatchObject({
      color: 'rgba(85, 0, 85, 1)',
      hex: '#550055',
    })
  })

  it('generates a color object from rgb color input', () => {
    const color = createColor('rgb(255, 0, 0)')

    expect(color).toMatchObject({
      color: 'rgba(255, 0, 0, 1)',
      hex: '#ff0000',
    })
  })

  it('generates a color object from rgba color input', () => {
    const color = createColor('rgba(255,255,0,1)')

    expect(color).toMatchObject({
      color: 'rgba(255, 255, 0, 1)',
      hex: '#ffff00',
    })
  })

  it('generates a color object from hsl color input', () => {
    const color = createColor('hsl(255,50%,50%)')

    expect(color).toMatchObject({
      color: 'rgba(96, 64, 191, 1)',
      hex: '#6040bf',
    })
  })

  it('generates a color object from hsla color input', () => {
    const color = createColor('hsla(10, 50%, 50%, 1)')

    expect(color).toMatchObject({
      color: 'rgba(191, 85, 64, 1)',
      hex: '#bf5540',
    })
  })

  it('generates a color object from achromatic hsla color input', () => {
    const color = createColor('hsla(10, 0%, 50%, 1)')

    expect(color).toMatchObject({
      color: 'rgba(128, 128, 128, 1)',
      hex: '#808080',
    })
  })

  it('manipulate function works correctly when hueShift is used', () => {
    const color = createColor('#ff9988')

    expect(color).toMatchObject({
      color: 'rgba(255, 153, 136, 1)',
      hex: '#ff9988',
    })
    expect(color.manipulate({ hueShift: 10 })).toBe('hsla(19, 100%, 77%, 1)')
    expect(color.manipulate({ hueShift: -10 })).toBe('hsla(359, 100%, 77%, 1)')
    expect(color.manipulate({ hueShift: 355 })).toBe('hsla(4, 100%, 77%, 1)')
    expect(color.manipulate({ hueShift: 800 })).toBe('hsla(89, 100%, 77%, 1)')
  })

  it('manipulate function works correctly when opacity is used', () => {
    const color = createColor('#9988dd')

    expect(color).toMatchObject({
      color: 'rgba(153, 136, 221, 1)',
      hex: '#9988dd',
    })
    expect(color.manipulate({ opacity: 0.5 })).toBe('hsla(252, 56%, 70%, 0.5)')
    expect(color.manipulate({ opacity: 50 })).toBe('hsla(252, 56%, 70%, 1)')
    expect(color.manipulate({ opacity: -10 })).toBe('hsla(252, 56%, 70%, 0)')
  })

  it('manipulate function works correctly when illuminate is used', () => {
    const color = createColor('#7dc1e8')

    expect(color).toMatchObject({
      color: 'rgba(125, 193, 232, 1)',
      hex: '#7dc1e8',
    })
    expect(color.manipulate({ illuminate: 0.1 })).toBe('hsla(202, 70%, 77%, 1)')
    expect(color.manipulate({ illuminate: 0.2 })).toBe('hsla(202, 70%, 84%, 1)')
    expect(color.manipulate({ illuminate: 1 })).toBe('hsla(202, 70%, 100%, 1)')
    expect(color.manipulate({ illuminate: -0.1 })).toBe('hsla(202, 70%, 63%, 1)')
    expect(color.manipulate({ illuminate: -0.5 })).toBe('hsla(202, 70%, 35%, 1)')
    expect(color.manipulate({ illuminate: -1 })).toBe('hsla(202, 70%, 0%, 1)')
    expect(color.manipulate({ illuminate: -100 })).toBe('hsla(202, 70%, 0%, 1)')
    expect(color.manipulate({ illuminate: 100 })).toBe('hsla(202, 70%, 100%, 1)')
  })

  it('manipulate function works correctly when saturate is used', () => {
    const color = createColor('#40bf5e')

    expect(color).toMatchObject({
      color: 'rgba(64, 191, 94, 1)',
      hex: '#40bf5e',
    })
    expect(color.manipulate({ saturate: 0.1 })).toBe('hsla(134, 55%, 50%, 1)')
    expect(color.manipulate({ saturate: 0.2 })).toBe('hsla(134, 60%, 50%, 1)')
    expect(color.manipulate({ saturate: 1 })).toBe('hsla(134, 100%, 50%, 1)')
    expect(color.manipulate({ saturate: -0.1 })).toBe('hsla(134, 45%, 50%, 1)')
    expect(color.manipulate({ saturate: -0.5 })).toBe('hsla(134, 25%, 50%, 1)')
    expect(color.manipulate({ saturate: -1 })).toBe('hsla(134, 0%, 50%, 1)')
    expect(color.manipulate({ saturate: -100 })).toBe('hsla(134, 0%, 50%, 1)')
    expect(color.manipulate({ saturate: 100 })).toBe('hsla(134, 100%, 50%, 1)')
  })

  it('manipulate function works correctly when saturate illuminate and hueShift are used', () => {
    const color = createColor('#bf40bf')

    expect(color).toMatchObject({
      color: 'rgba(191, 64, 191, 1)',
      hex: '#bf40bf',
    })
    expect(color.manipulate({ saturate: 0.1, illuminate: 0.1 })).toBe('hsla(300, 55%, 55%, 1)')
    expect(color.manipulate({ saturate: -0.1, illuminate: -0.1 })).toBe('hsla(300, 45%, 45%, 1)')
    expect(color.manipulate({ saturate: 1, illuminate: 1 })).toBe('hsla(300, 100%, 100%, 1)')
    expect(color.manipulate({ saturate: -1, illuminate: -1 })).toBe('hsla(300, 0%, 0%, 1)')
    expect(color.manipulate({ saturate: 1, illuminate: 1, hueShift: 60 })).toBe('hsla(360, 100%, 100%, 1)')
    expect(color.manipulate({ saturate: -1, illuminate: -1, hueShift: -300 })).toBe('hsla(0, 0%, 0%, 1)')
  })

  it('manipulate can work on white and black', () => {
    const white = createColor('hsl(0, 0%, 100%)')
    const black = createColor('hsl(0, 0%, 0%)')

    expect(white).toMatchObject({
      color: 'rgba(255, 255, 255, 1)',
      hex: '#ffffff',
    })
    expect(white.manipulate({ saturate: 0.1, illuminate: 0.1 })).toBe('hsla(0, 10%, 100%, 1)')
    expect(white.manipulate({ saturate: -0.1, illuminate: -0.1 })).toBe('hsla(0, 0%, 90%, 1)')
    expect(black).toMatchObject({
      color: 'rgba(0, 0, 0, 1)',
      hex: '#000000',
    })
    expect(black.manipulate({ saturate: 0.1, illuminate: 0.1 })).toBe('hsla(0, 10%, 10%, 1)')
    expect(black.manipulate({ saturate: -0.1, illuminate: -0.1 })).toBe('hsla(0, 0%, 0%, 1)')
  })

  it('test hsb warm gray variations', () => {
    const lightWarmGray = createColor('hsl(0, 10%, 75%)')
    const darkWarmGray = createColor('hsl(0, 10%, 25%)')

    expect(lightWarmGray).toMatchObject({
      color: 'rgba(198, 185, 185, 1)',
      hex: '#c6b9b9',
    })
    expect(lightWarmGray.manipulate({ saturate: 0.1, illuminate: 0.1 })).toBe('hsla(0, 11%, 83%, 1)')
    expect(lightWarmGray.manipulate({ saturate: -0.1, illuminate: -0.1 })).toBe('hsla(0, 9%, 68%, 1)')
    expect(darkWarmGray).toMatchObject({
      color: 'rgba(70, 57, 57, 1)',
      hex: '#463939',
    })
    expect(darkWarmGray.manipulate({ saturate: 0.1, illuminate: 0.1 })).toBe('hsla(0, 11%, 27%, 1)')
    expect(darkWarmGray.manipulate({ saturate: -0.1, illuminate: -0.1 })).toBe('hsla(0, 9%, 22%, 1)')
  })

  it('test hsb hue variations', () => {
    expect(createColor('hsl(0, 50%, 50%)').manipulate({ opacity: 0.1 })).toBe('hsla(0, 50%, 50%, 0.1)')
    expect(createColor('hsl(10, 50%, 50%)').manipulate({ opacity: 0.1 })).toBe('hsla(10, 50%, 50%, 0.1)')
    expect(createColor('hsl(20, 50%, 50%)').manipulate({ opacity: 0.1 })).toBe('hsla(20, 50%, 50%, 0.1)')
    expect(createColor('hsl(30, 50%, 50%)').manipulate({ opacity: 0.1 })).toBe('hsla(30, 50%, 50%, 0.1)')
    expect(createColor('hsl(40, 50%, 50%)').manipulate({ opacity: 0.1 })).toBe('hsla(40, 50%, 50%, 0.1)')
    expect(createColor('hsl(50, 50%, 50%)').manipulate({ opacity: 0.1 })).toBe('hsla(50, 50%, 50%, 0.1)')
    expect(createColor('hsl(60, 50%, 50%)').manipulate({ opacity: 0.1 })).toBe('hsla(60, 50%, 50%, 0.1)')
    expect(createColor('hsl(70, 50%, 50%)').manipulate({ opacity: 0.1 })).toBe('hsla(70, 50%, 50%, 0.1)')
    expect(createColor('hsl(80, 50%, 50%)').manipulate({ opacity: 0.1 })).toBe('hsla(80, 50%, 50%, 0.1)')
    expect(createColor('hsl(90, 50%, 50%)').manipulate({ opacity: 0.1 })).toBe('hsla(90, 50%, 50%, 0.1)')
    expect(createColor('hsl(100, 50%, 50%)').manipulate({ opacity: 0.1 })).toBe('hsla(100, 50%, 50%, 0.1)')
    expect(createColor('hsl(110, 50%, 50%)').manipulate({ opacity: 0.1 })).toBe('hsla(110, 50%, 50%, 0.1)')
    expect(createColor('hsl(120, 50%, 50%)').manipulate({ opacity: 0.1 })).toBe('hsla(120, 50%, 50%, 0.1)')
    expect(createColor('hsl(130, 50%, 50%)').manipulate({ opacity: 0.1 })).toBe('hsla(130, 50%, 50%, 0.1)')
    expect(createColor('hsl(130, 50%, 50%)').manipulate({ opacity: 0.1 })).toBe('hsla(130, 50%, 50%, 0.1)')
    expect(createColor('hsl(140, 50%, 50%)').manipulate({ opacity: 0.1 })).toBe('hsla(140, 50%, 50%, 0.1)')
    expect(createColor('hsl(150, 50%, 50%)').manipulate({ opacity: 0.1 })).toBe('hsla(150, 50%, 50%, 0.1)')
    expect(createColor('hsl(160, 50%, 50%)').manipulate({ opacity: 0.1 })).toBe('hsla(160, 50%, 50%, 0.1)')
    expect(createColor('hsl(170, 50%, 50%)').manipulate({ opacity: 0.1 })).toBe('hsla(170, 50%, 50%, 0.1)')
    expect(createColor('hsl(180, 50%, 50%)').manipulate({ opacity: 0.1 })).toBe('hsla(180, 50%, 50%, 0.1)')
    expect(createColor('hsl(190, 50%, 50%)').manipulate({ opacity: 0.1 })).toBe('hsla(190, 50%, 50%, 0.1)')
    expect(createColor('hsl(200, 50%, 50%)').manipulate({ opacity: 0.1 })).toBe('hsla(200, 50%, 50%, 0.1)')
    expect(createColor('hsl(210, 50%, 50%)').manipulate({ opacity: 0.1 })).toBe('hsla(210, 50%, 50%, 0.1)')
    expect(createColor('hsl(220, 50%, 50%)').manipulate({ opacity: 0.1 })).toBe('hsla(220, 50%, 50%, 0.1)')
    expect(createColor('hsl(230, 50%, 50%)').manipulate({ opacity: 0.1 })).toBe('hsla(230, 50%, 50%, 0.1)')
    expect(createColor('hsl(240, 50%, 50%)').manipulate({ opacity: 0.1 })).toBe('hsla(240, 50%, 50%, 0.1)')
    expect(createColor('hsl(250, 50%, 50%)').manipulate({ opacity: 0.1 })).toBe('hsla(250, 50%, 50%, 0.1)')
    expect(createColor('hsl(260, 50%, 50%)').manipulate({ opacity: 0.1 })).toBe('hsla(260, 50%, 50%, 0.1)')
    expect(createColor('hsl(270, 50%, 50%)').manipulate({ opacity: 0.1 })).toBe('hsla(270, 50%, 50%, 0.1)')
    expect(createColor('hsl(280, 50%, 50%)').manipulate({ opacity: 0.1 })).toBe('hsla(280, 50%, 50%, 0.1)')
    expect(createColor('hsl(290, 50%, 50%)').manipulate({ opacity: 0.1 })).toBe('hsla(290, 50%, 50%, 0.1)')
    expect(createColor('hsl(300, 50%, 50%)').manipulate({ opacity: 0.1 })).toBe('hsla(300, 50%, 50%, 0.1)')
    expect(createColor('hsl(310, 50%, 50%)').manipulate({ opacity: 0.1 })).toBe('hsla(310, 50%, 50%, 0.1)')
    expect(createColor('hsl(320, 50%, 50%)').manipulate({ opacity: 0.1 })).toBe('hsla(320, 50%, 50%, 0.1)')
    expect(createColor('hsl(330, 50%, 50%)').manipulate({ opacity: 0.1 })).toBe('hsla(330, 50%, 50%, 0.1)')
    expect(createColor('hsl(330, 50%, 50%)').manipulate({ opacity: 0.1 })).toBe('hsla(330, 50%, 50%, 0.1)')
    expect(createColor('hsl(340, 50%, 50%)').manipulate({ opacity: 0.1 })).toBe('hsla(340, 50%, 50%, 0.1)')
    expect(createColor('hsl(350, 50%, 50%)').manipulate({ opacity: 0.1 })).toBe('hsla(350, 50%, 50%, 0.1)')
    expect(createColor('hsl(360, 50%, 50%)').manipulate({ opacity: 0.1 })).toBe('hsla(0, 50%, 50%, 0.1)')
  })
})
