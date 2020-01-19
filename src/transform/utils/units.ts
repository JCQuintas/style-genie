export type TransformLengthUnit =
  | 'px'
  | 'em'
  | 'rem'
  | 'vh'
  | 'vw'
  | 'vmax'
  | 'vmin'
  | 'pt'
  | 'ch'
  | 'cm'
  | 'ex'
  | 'in'
  | 'mm'
  | 'pc'
  | (string & {})

export type TransformAngleUnit = 'deg' | 'grad' | 'rad' | 'turn'

export type TransformPercentageUnit = '%'
