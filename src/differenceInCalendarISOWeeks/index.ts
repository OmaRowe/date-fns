import { millisecondsInWeek } from '../constants/index'
import startOfISOWeek from '../startOfISOWeek/index'
import getTimezoneOffsetInMilliseconds from '../_lib/getTimezoneOffsetInMilliseconds/index'

/**
 * @name differenceInCalendarISOWeeks
 * @category ISO Week Helpers
 * @summary Get the number of calendar ISO weeks between the given dates.
 *
 * @description
 * Get the number of calendar ISO weeks between the given dates.
 *
 * ISO week-numbering year: http://en.wikipedia.org/wiki/ISO_week_date
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 *
 * @param dateLeft - The later date
 * @param dateRight - The earlier date
 *
 * @returns The number of calendar ISO weeks
 *
 * @example
 * // How many calendar ISO weeks are between 6 July 2014 and 21 July 2014?
 * const result = differenceInCalendarISOWeeks(
 *   new Date(2014, 6, 21),
 *   new Date(2014, 6, 6)
 * )
 * //=> 3
 */
export default function differenceInCalendarISOWeeks<DateType extends Date>(
  dateLeft: DateType | number,
  dateRight: DateType | number
): number {
  const startOfISOWeekLeft = startOfISOWeek(dateLeft)
  const startOfISOWeekRight = startOfISOWeek(dateRight)

  const timestampLeft =
    startOfISOWeekLeft.getTime() -
    getTimezoneOffsetInMilliseconds(startOfISOWeekLeft)
  const timestampRight =
    startOfISOWeekRight.getTime() -
    getTimezoneOffsetInMilliseconds(startOfISOWeekRight)

  // Round the number of days to the nearest integer
  // because the number of milliseconds in a week is not constant
  // (e.g. it's different in the week of the daylight saving time clock shift)
  return Math.round((timestampLeft - timestampRight) / millisecondsInWeek)
}
