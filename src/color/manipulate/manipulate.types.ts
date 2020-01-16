export interface ManipulateParams {
  /**
   * `hueShift` will shift the __hue__ by the given amount. It can be a positive or negative number.
   * Will automatically wrap around `360`
   */
  hueShift?: number
  /**
   * `illuminate` will increase the __luminosity__ value by the given percentage. It can be a positive or negative number between `0` and `1`.
   */
  illuminate?: number
  /**
   * `saturate` will increase the __saturation__ value by the given percentage. It can be a positive or negative number between `0` and `1`.
   */
  saturate?: number
  /**
   * `opacity` sets the current opacity to the given number. It can be a positive or negative number between `0` and `1`.
   */
  opacity?: number
}

export interface HueShiftFunction {
  /**
   * `hueShift` will shift the __hue__ by the given amount. It can be a positive or negative number.
   * Will automatically wrap around `360`
   */
  (hueShift?: ManipulateParams['hueShift']): string
}

export interface IlluminateFunction {
  /**
   * `illuminate` will increase the __luminosity__ value by the given percentage. It can be a positive or negative number between `0` and `1`.
   */
  (illuminate?: ManipulateParams['illuminate']): string
}

export interface SaturateFunction {
  /**
   * `saturate` will increase the __saturation__ value by the given percentage. It can be a positive or negative number between `0` and `1`.
   */
  (saturate?: ManipulateParams['saturate']): string
}

export interface OpacityFunction {
  /**
   * `opacity` sets the current opacity to the given number. It can be a positive or negative number between `0` and `1`.
   */
  (opacity?: ManipulateParams['opacity']): string
}

export interface Manipulate {
  /**
   * A function to manipulate the properties of the color.
   *
   * @returns a formatted color string with the transformations.
   */
  (options: ManipulateParams): string
}
