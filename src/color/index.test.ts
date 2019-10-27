import { generateColor } from './index'

describe('breakpoint', () => {
  it('generates black from invalid input', () => {
    const color = generateColor('255')

    expect(color).toMatchObject({
      color: 'rgba(0, 0, 0, 1)',
    })
  })

  it('generates a color object from an object input', () => {
    const color = generateColor({ color: '#ff00ff' })

    expect(color).toMatchObject({
      color: 'rgba(255, 0, 255, 1)',
    })
  })

  it('generates a color object from number input', () => {
    const color = generateColor(255)

    expect(color).toMatchObject({
      color: 'rgba(255, 255, 255, 1)',
    })
  })

  it('generates a color object from number array input', () => {
    const color = generateColor([0, 0, 255])

    expect(color).toMatchObject({
      color: 'rgba(0, 0, 255, 1)',
    })
  })

  it('generates a color object from hex color input', () => {
    const color = generateColor('#00FF00')

    expect(color).toMatchObject({
      color: 'rgba(0, 255, 0, 1)',
    })
  })

  it('generates a color object from short hex color input', () => {
    const color = generateColor('#505')

    expect(color).toMatchObject({
      color: 'rgba(85, 0, 85, 1)',
    })
  })

  it('generates a color object from hex with alpha color input', () => {
    const color = generateColor('#505017DD')

    expect(color).toMatchObject({
      color: 'rgba(80, 80, 23, 0.87)',
    })
  })

  it('generates a color object from rgb color input', () => {
    const color = generateColor('rgb(255, 0, 0)')

    expect(color).toMatchObject({
      color: 'rgba(255, 0, 0, 1)',
    })
  })

  it('generates a color object from rgba color input', () => {
    const color = generateColor('rgba(255,255,0,1)')

    expect(color).toMatchObject({
      color: 'rgba(255, 255, 0, 1)',
    })
  })

  it('generates a color object from hsl color input', () => {
    const color = generateColor('hsl(255,50%,50%)')

    expect(color).toMatchObject({
      color: 'rgba(96, 64, 191, 1)',
    })
  })

  it('generates a color object from hsla color input', () => {
    const color = generateColor('hsla(10, 50%, 50%, 1)')

    expect(color).toMatchObject({
      color: 'rgba(191, 85, 64, 1)',
    })
  })

  it('generates a color object from achromatic hsla color input', () => {
    const color = generateColor('hsla(10, 0%, 50%, 1)')

    expect(color).toMatchObject({
      color: 'rgba(128, 128, 128, 1)',
    })
  })

  it('manipulate function works correctly when hueShift is used', () => {
    const color = generateColor('#ff9988', 'hsla')

    expect(color).toMatchObject({
      color: 'hsla(9, 100%, 77%, 1)',
    })

    expect(color.manipulate({ hueShift: 10 })).toBe('hsla(19, 100%, 77%, 1)')
    expect(color.manipulate({ hueShift: -10 })).toBe('hsla(359, 100%, 77%, 1)')
    expect(color.manipulate({ hueShift: 355 })).toBe('hsla(4, 100%, 77%, 1)')
    expect(color.manipulate({ hueShift: 800 })).toBe('hsla(89, 100%, 77%, 1)')
  })

  it('manipulate function works correctly when opacity is used', () => {
    const color = generateColor('#9988dd', 'hsla')

    expect(color).toMatchObject({
      color: 'hsla(252, 56%, 70%, 1)',
    })
    expect(color.manipulate({ opacity: 0.5 })).toBe('hsla(252, 56%, 70%, 0.5)')
    expect(color.manipulate({ opacity: 50 })).toBe('hsla(252, 56%, 70%, 1)')
    expect(color.manipulate({ opacity: -10 })).toBe('hsla(252, 56%, 70%, 0)')
  })

  it('manipulate function works correctly when illuminate is used', () => {
    const color = generateColor('#7dc1e8', 'hsla')

    expect(color).toMatchObject({
      color: 'hsla(202, 70%, 70%, 1)',
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
    const color = generateColor('#40bf5e', 'hsla')

    expect(color).toMatchObject({
      color: 'hsla(134, 50%, 50%, 1)',
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
    const color = generateColor('#bf40bf', 'hsla')

    expect(color).toMatchObject({
      color: 'hsla(300, 50%, 50%, 1)',
    })
    expect(color.manipulate({ saturate: 0.1, illuminate: 0.1 })).toBe('hsla(300, 55%, 55%, 1)')
    expect(color.manipulate({ saturate: -0.1, illuminate: -0.1 })).toBe('hsla(300, 45%, 45%, 1)')
    expect(color.manipulate({ saturate: 1, illuminate: 1 })).toBe('hsla(300, 100%, 100%, 1)')
    expect(color.manipulate({ saturate: -1, illuminate: -1 })).toBe('hsla(300, 0%, 0%, 1)')
    expect(color.manipulate({ saturate: 1, illuminate: 1, hueShift: 60 })).toBe('hsla(360, 100%, 100%, 1)')
    expect(color.manipulate({ saturate: -1, illuminate: -1, hueShift: -300 })).toBe('hsla(0, 0%, 0%, 1)')
  })

  it('manipulate can work on white and black', () => {
    const white = generateColor('hsl(0, 0%, 100%)', 'hsla')
    const black = generateColor('hsl(0, 0%, 0%)', 'hsla')

    expect(white).toMatchObject({
      color: 'hsla(0, 0%, 100%, 1)',
    })
    expect(white.manipulate({ saturate: 0.1, illuminate: 0.1 })).toBe('hsla(0, 10%, 100%, 1)')
    expect(white.manipulate({ saturate: -0.1, illuminate: -0.1 })).toBe('hsla(0, 0%, 90%, 1)')
    expect(black).toMatchObject({
      color: 'hsla(0, 0%, 0%, 1)',
    })
    expect(black.manipulate({ saturate: 0.1, illuminate: 0.1 })).toBe('hsla(0, 10%, 10%, 1)')
    expect(black.manipulate({ saturate: -0.1, illuminate: -0.1 })).toBe('hsla(0, 0%, 0%, 1)')
  })

  it('test hsb warm gray variations', () => {
    const lightWarmGray = generateColor('hsl(0, 10%, 75%)', 'hsla')
    const darkWarmGray = generateColor('hsl(0, 10%, 25%)', 'hsla')

    expect(lightWarmGray).toMatchObject({
      color: 'hsla(0, 10%, 75%, 1)',
    })
    expect(lightWarmGray.manipulate({ saturate: 0.1, illuminate: 0.1 })).toBe('hsla(0, 11%, 83%, 1)')
    expect(lightWarmGray.manipulate({ saturate: -0.1, illuminate: -0.1 })).toBe('hsla(0, 9%, 68%, 1)')
    expect(darkWarmGray).toMatchObject({
      color: 'hsla(0, 10%, 25%, 1)',
    })
    expect(darkWarmGray.manipulate({ saturate: 0.1, illuminate: 0.1 })).toBe('hsla(0, 11%, 28%, 1)')
    expect(darkWarmGray.manipulate({ saturate: -0.1, illuminate: -0.1 })).toBe('hsla(0, 9%, 23%, 1)')
  })

  it('test hsb hue variations', () => {
    expect(generateColor('hsl(0, 50%, 50%)', 'hsla').manipulate({ opacity: 0.1 })).toBe('hsla(0, 50%, 50%, 0.1)')
    expect(generateColor('hsl(10, 50%, 50%)', 'hsla').manipulate({ opacity: 0.1 })).toBe('hsla(10, 50%, 50%, 0.1)')
    expect(generateColor('hsl(20, 50%, 50%)', 'hsla').manipulate({ opacity: 0.1 })).toBe('hsla(20, 50%, 50%, 0.1)')
    expect(generateColor('hsl(30, 50%, 50%)', 'hsla').manipulate({ opacity: 0.1 })).toBe('hsla(30, 50%, 50%, 0.1)')
    expect(generateColor('hsl(40, 50%, 50%)', 'hsla').manipulate({ opacity: 0.1 })).toBe('hsla(40, 50%, 50%, 0.1)')
    expect(generateColor('hsl(50, 50%, 50%)', 'hsla').manipulate({ opacity: 0.1 })).toBe('hsla(50, 50%, 50%, 0.1)')
    expect(generateColor('hsl(60, 50%, 50%)', 'hsla').manipulate({ opacity: 0.1 })).toBe('hsla(60, 50%, 50%, 0.1)')
    expect(generateColor('hsl(70, 50%, 50%)', 'hsla').manipulate({ opacity: 0.1 })).toBe('hsla(70, 50%, 50%, 0.1)')
    expect(generateColor('hsl(80, 50%, 50%)', 'hsla').manipulate({ opacity: 0.1 })).toBe('hsla(80, 50%, 50%, 0.1)')
    expect(generateColor('hsl(90, 50%, 50%)', 'hsla').manipulate({ opacity: 0.1 })).toBe('hsla(90, 50%, 50%, 0.1)')
    expect(generateColor('hsl(100, 50%, 50%)', 'hsla').manipulate({ opacity: 0.1 })).toBe('hsla(100, 50%, 50%, 0.1)')
    expect(generateColor('hsl(110, 50%, 50%)', 'hsla').manipulate({ opacity: 0.1 })).toBe('hsla(110, 50%, 50%, 0.1)')
    expect(generateColor('hsl(120, 50%, 50%)', 'hsla').manipulate({ opacity: 0.1 })).toBe('hsla(120, 50%, 50%, 0.1)')
    expect(generateColor('hsl(130, 50%, 50%)', 'hsla').manipulate({ opacity: 0.1 })).toBe('hsla(130, 50%, 50%, 0.1)')
    expect(generateColor('hsl(130, 50%, 50%)', 'hsla').manipulate({ opacity: 0.1 })).toBe('hsla(130, 50%, 50%, 0.1)')
    expect(generateColor('hsl(140, 50%, 50%)', 'hsla').manipulate({ opacity: 0.1 })).toBe('hsla(140, 50%, 50%, 0.1)')
    expect(generateColor('hsl(150, 50%, 50%)', 'hsla').manipulate({ opacity: 0.1 })).toBe('hsla(150, 50%, 50%, 0.1)')
    expect(generateColor('hsl(160, 50%, 50%)', 'hsla').manipulate({ opacity: 0.1 })).toBe('hsla(160, 50%, 50%, 0.1)')
    expect(generateColor('hsl(170, 50%, 50%)', 'hsla').manipulate({ opacity: 0.1 })).toBe('hsla(170, 50%, 50%, 0.1)')
    expect(generateColor('hsl(180, 50%, 50%)', 'hsla').manipulate({ opacity: 0.1 })).toBe('hsla(180, 50%, 50%, 0.1)')
    expect(generateColor('hsl(190, 50%, 50%)', 'hsla').manipulate({ opacity: 0.1 })).toBe('hsla(190, 50%, 50%, 0.1)')
    expect(generateColor('hsl(200, 50%, 50%)', 'hsla').manipulate({ opacity: 0.1 })).toBe('hsla(200, 50%, 50%, 0.1)')
    expect(generateColor('hsl(210, 50%, 50%)', 'hsla').manipulate({ opacity: 0.1 })).toBe('hsla(210, 50%, 50%, 0.1)')
    expect(generateColor('hsl(220, 50%, 50%)', 'hsla').manipulate({ opacity: 0.1 })).toBe('hsla(220, 50%, 50%, 0.1)')
    expect(generateColor('hsl(230, 50%, 50%)', 'hsla').manipulate({ opacity: 0.1 })).toBe('hsla(230, 50%, 50%, 0.1)')
    expect(generateColor('hsl(240, 50%, 50%)', 'hsla').manipulate({ opacity: 0.1 })).toBe('hsla(240, 50%, 50%, 0.1)')
    expect(generateColor('hsl(250, 50%, 50%)', 'hsla').manipulate({ opacity: 0.1 })).toBe('hsla(250, 50%, 50%, 0.1)')
    expect(generateColor('hsl(260, 50%, 50%)', 'hsla').manipulate({ opacity: 0.1 })).toBe('hsla(260, 50%, 50%, 0.1)')
    expect(generateColor('hsl(270, 50%, 50%)', 'hsla').manipulate({ opacity: 0.1 })).toBe('hsla(270, 50%, 50%, 0.1)')
    expect(generateColor('hsl(280, 50%, 50%)', 'hsla').manipulate({ opacity: 0.1 })).toBe('hsla(280, 50%, 50%, 0.1)')
    expect(generateColor('hsl(290, 50%, 50%)', 'hsla').manipulate({ opacity: 0.1 })).toBe('hsla(290, 50%, 50%, 0.1)')
    expect(generateColor('hsl(300, 50%, 50%)', 'hsla').manipulate({ opacity: 0.1 })).toBe('hsla(300, 50%, 50%, 0.1)')
    expect(generateColor('hsl(310, 50%, 50%)', 'hsla').manipulate({ opacity: 0.1 })).toBe('hsla(310, 50%, 50%, 0.1)')
    expect(generateColor('hsl(320, 50%, 50%)', 'hsla').manipulate({ opacity: 0.1 })).toBe('hsla(320, 50%, 50%, 0.1)')
    expect(generateColor('hsl(330, 50%, 50%)', 'hsla').manipulate({ opacity: 0.1 })).toBe('hsla(330, 50%, 50%, 0.1)')
    expect(generateColor('hsl(330, 50%, 50%)', 'hsla').manipulate({ opacity: 0.1 })).toBe('hsla(330, 50%, 50%, 0.1)')
    expect(generateColor('hsl(340, 50%, 50%)', 'hsla').manipulate({ opacity: 0.1 })).toBe('hsla(340, 50%, 50%, 0.1)')
    expect(generateColor('hsl(350, 50%, 50%)', 'hsla').manipulate({ opacity: 0.1 })).toBe('hsla(350, 50%, 50%, 0.1)')
    expect(generateColor('hsl(360, 50%, 50%)', 'hsla').manipulate({ opacity: 0.1 })).toBe('hsla(0, 50%, 50%, 0.1)')
  })

  it('returns the right value when format is hex', () => {
    const white = generateColor('hsl(0, 0%, 100%)', 'hex')
    expect(white).toMatchObject({
      color: '#ffffff',
    })
    expect(white.manipulate({ saturate: 0.1, illuminate: 0.1 })).toBe('#ffffff')
    expect(white.manipulate({ saturate: -0.1, illuminate: -0.1 })).toBe('#e6e6e6')

    const black = generateColor('hsl(0, 0%, 0%)', 'hex')
    expect(black).toMatchObject({
      color: '#000000',
    })
    expect(black.manipulate({ saturate: 0.1, illuminate: 0.1 })).toBe('#1c1717')
    expect(black.manipulate({ saturate: -0.1, illuminate: -0.1 })).toBe('#000000')

    const green = generateColor('hsl(120, 60%, 50%)', 'hex')
    expect(green).toMatchObject({
      color: '#33cc33',
    })
    expect(green.manipulate({ saturate: 0.1, illuminate: 0.1 })).toBe('#41d841')
    expect(green.manipulate({ saturate: -0.1, illuminate: -0.1 })).toBe('#35b135')
  })

  it('returns the right value when format is rgb', () => {
    const white = generateColor('hsl(0, 0%, 100%)', 'rgb')
    expect(white).toMatchObject({
      color: 'rgb(255, 255, 255)',
    })
    expect(white.manipulate({ saturate: 0.1, illuminate: 0.1 })).toBe('rgb(255, 255, 255)')
    expect(white.manipulate({ saturate: -0.1, illuminate: -0.1 })).toBe('rgb(230, 230, 230)')

    const black = generateColor('hsl(0, 0%, 0%)', 'rgb')
    expect(black).toMatchObject({
      color: 'rgb(0, 0, 0)',
    })
    expect(black.manipulate({ saturate: 0.1, illuminate: 0.1 })).toBe('rgb(28, 23, 23)')
    expect(black.manipulate({ saturate: -0.1, illuminate: -0.1 })).toBe('rgb(0, 0, 0)')

    const green = generateColor('hsl(120, 60%, 50%)', 'rgb')
    expect(green).toMatchObject({
      color: 'rgb(51, 204, 51)',
    })
    expect(green.manipulate({ saturate: 0.1, illuminate: 0.1 })).toBe('rgb(65, 216, 65)')
    expect(green.manipulate({ saturate: -0.1, illuminate: -0.1 })).toBe('rgb(53, 177, 53)')
  })

  it('returns the right value when format is rgba', () => {
    const white = generateColor('hsl(0, 0%, 100%)', 'rgba')
    expect(white).toMatchObject({
      color: 'rgba(255, 255, 255, 1)',
    })
    expect(white.manipulate({ saturate: 0.1, illuminate: 0.1 })).toBe('rgba(255, 255, 255, 1)')
    expect(white.manipulate({ saturate: -0.1, illuminate: -0.1 })).toBe('rgba(230, 230, 230, 1)')

    const black = generateColor('hsl(0, 0%, 0%, 1)', 'rgba')
    expect(black).toMatchObject({
      color: 'rgba(0, 0, 0, 1)',
    })
    expect(black.manipulate({ saturate: 0.1, illuminate: 0.1 })).toBe('rgba(28, 23, 23, 1)')
    expect(black.manipulate({ saturate: -0.1, illuminate: -0.1 })).toBe('rgba(0, 0, 0, 1)')

    const green = generateColor('hsl(120, 60%, 50%, 1)', 'rgba')
    expect(green).toMatchObject({
      color: 'rgba(51, 204, 51, 1)',
    })
    expect(green.manipulate({ saturate: 0.1, illuminate: 0.1 })).toBe('rgba(65, 216, 65, 1)')
    expect(green.manipulate({ saturate: -0.1, illuminate: -0.1 })).toBe('rgba(53, 177, 53, 1)')
  })

  it('returns the right value when format is hsl', () => {
    const white = generateColor('hsl(0, 0%, 100%)', 'hsl')
    expect(white).toMatchObject({
      color: 'hsl(0, 0%, 100%)',
    })
    expect(white.manipulate({ saturate: 0.1, illuminate: 0.1 })).toBe('hsl(0, 10%, 100%)')
    expect(white.manipulate({ saturate: -0.1, illuminate: -0.1 })).toBe('hsl(0, 0%, 90%)')

    const black = generateColor('hsl(0, 0%, 0%)', 'hsl')
    expect(black).toMatchObject({
      color: 'hsl(0, 0%, 0%)',
    })
    expect(black.manipulate({ saturate: 0.1, illuminate: 0.1 })).toBe('hsl(0, 10%, 10%)')
    expect(black.manipulate({ saturate: -0.1, illuminate: -0.1 })).toBe('hsl(0, 0%, 0%)')

    const green = generateColor('hsl(120, 60%, 50%)', 'hsl')
    expect(green).toMatchObject({
      color: 'hsl(120, 60%, 50%)',
    })
    expect(green.manipulate({ saturate: 0.1, illuminate: 0.1 })).toBe('hsl(120, 66%, 55%)')
    expect(green.manipulate({ saturate: -0.1, illuminate: -0.1 })).toBe('hsl(120, 54%, 45%)')
  })

  it('returns the right value when format is hsla', () => {
    const white = generateColor('hsla(0, 0%, 100%)', 'hsla')
    expect(white).toMatchObject({
      color: 'hsla(0, 0%, 100%, 1)',
    })
    expect(white.manipulate({ saturate: 0.1, illuminate: 0.1 })).toBe('hsla(0, 10%, 100%, 1)')
    expect(white.manipulate({ saturate: -0.1, illuminate: -0.1 })).toBe('hsla(0, 0%, 90%, 1)')

    const black = generateColor('hsla(0, 0%, 0%)', 'hsla')
    expect(black).toMatchObject({
      color: 'hsla(0, 0%, 0%, 1)',
    })
    expect(black.manipulate({ saturate: 0.1, illuminate: 0.1 })).toBe('hsla(0, 10%, 10%, 1)')
    expect(black.manipulate({ saturate: -0.1, illuminate: -0.1 })).toBe('hsla(0, 0%, 0%, 1)')

    const green = generateColor('hsla(120, 60%, 50%)', 'hsla')
    expect(green).toMatchObject({
      color: 'hsla(120, 60%, 50%, 1)',
    })
    expect(green.manipulate({ saturate: 0.1, illuminate: 0.1 })).toBe('hsla(120, 66%, 55%, 1)')
    expect(green.manipulate({ saturate: -0.1, illuminate: -0.1 })).toBe('hsla(120, 54%, 45%, 1)')
  })

  it('formats all types of color formats correctly', () => {
    const white = generateColor('hsla(0, 0%, 100%)', 'hex')
    const black = generateColor('#000', 'rgb')

    expect(white.format('hex')).toBe('#ffffff')
    expect(white.format('rgb')).toBe('rgb(255, 255, 255)')
    expect(white.format('rgba')).toBe('rgba(255, 255, 255, 1)')
    expect(white.format('hsl')).toBe('hsl(0, 0%, 100%)')
    expect(white.format('hsla')).toBe('hsla(0, 0%, 100%, 1)')

    expect(black.format('hex')).toBe('#000000')
    expect(black.format('rgb')).toBe('rgb(0, 0, 0)')
    expect(black.format('rgba')).toBe('rgba(0, 0, 0, 1)')
    expect(black.format('hsl')).toBe('hsl(0, 0%, 0%)')
    expect(black.format('hsla')).toBe('hsla(0, 0%, 0%, 1)')
  })
})
