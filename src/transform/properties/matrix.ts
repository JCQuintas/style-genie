interface MatrixObject {
  a: number
  b: number
  c: number
  d: number
  tx: number
  ty: number
}

type MatrixArray = [number, number, number, number, number, number]

interface Matrix3dObject {
  a1: number
  b1: number
  c1: number
  d1: number
  a2: number
  b2: number
  c2: number
  d2: number
  a3: number
  b3: number
  c3: number
  d3: number
  a4: number
  b4: number
  c4: number
  d4: number
}

type Matrix3dArray = [
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number
]

export type MatrixProp = MatrixObject | MatrixArray | string
export type Matrix3dProp = Matrix3dObject | Matrix3dArray | string

export const matrixToString = (matrix: MatrixProp) => {
  if (typeof matrix === 'string') return matrix
  if (Array.isArray(matrix)) return matrix.join(', ')
  return `${matrix.a}, ${matrix.b}, ${matrix.c}, ${matrix.d}, ${matrix.tx}, ${matrix.ty}`
}

export const matrix3dToString = (matrix3d: Matrix3dProp) => {
  if (typeof matrix3d === 'string') return matrix3d
  if (Array.isArray(matrix3d)) return matrix3d.join(', ')
  return `${matrix3d.a1}, ${matrix3d.b1}, ${matrix3d.c1}, ${matrix3d.d1}, ${matrix3d.a2}, ${matrix3d.b2}, ${matrix3d.c2}, ${matrix3d.d2}, ${matrix3d.a3}, ${matrix3d.b3}, ${matrix3d.c3}, ${matrix3d.d3}, ${matrix3d.a4}, ${matrix3d.b4}, ${matrix3d.c4}, ${matrix3d.d4}`
}
