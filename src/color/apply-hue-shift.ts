export const applyHueShift = (hue: number, shift?: number) => {
  if (!shift) return hue
  const total = hue + shift
  return total < 360 ? total : total % 360
}
