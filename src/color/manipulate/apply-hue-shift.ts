export const applyHueShift = (hue: number, shift?: number) => {
  if (!shift) return hue
  const total = hue + shift

  if (total > 360) return total % 360
  if (total < 0) return total + 360
  return total
}
