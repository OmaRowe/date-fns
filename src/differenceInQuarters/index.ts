import differenceInMonths from '../differenceInMonths/index'
import type { RoundingOptions } from '../types'
import { getRoundingMethod } from '../_lib/roundingMethods/index'

/**
 * The {@link differenceInQuarters} function options.
 */
export interface DifferenceInQuartersOptions extends RoundingOptions {}

/**
 * @name differenceInQuarters
 * @category Quarter Helpers
 * @summary Get the number of quarters between the given dates.
 *
 * @description
 * Get the number of quarters between the given dates.
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 *
 * @param dateLeft - The later date
 * @param dateRight - The earlier date
 * @param options - An object with options.
 *
 * @returns The number of full quarters
 *
 * @example
 * // How many full quarters are between 31 December 2013 and 2 July 2014?
 * const result = differenceInQuarters(new Date(2014, 6, 2), new Date(2013, 11, 31))
 * //=> 2
 */
export default function differenceInQuarters<DateType extends Date>(
  dateLeft: DateType | number,
  dateRight: DateType | number,
  options?: DifferenceInQuartersOptions
): number {
  const diff = differenceInMonths(dateLeft, dateRight) / 3
  return getRoundingMethod(options?.roundingMethod)(diff)
}
