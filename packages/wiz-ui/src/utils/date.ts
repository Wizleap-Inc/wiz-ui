/**
 * formatDateToTime
 * ```ts
 * const input = new Date('2021-01-01 12:34:56');
 * const output = '12:34';
 * assert.equal(formatDateToTime(input), output);
 * ```
 * @param date
 * @returns string
 */
export const formatDateToTime = (date: Date): string => {
  const hours = date.getHours();
  const minutes = date.getMinutes();
  return [hours, minutes].map((n) => String(n).padStart(2, "0")).join(":");
};

/**
 * formatDateToMonthDayWeek
 * ```ts
 * const input = new Date('2021-01-01');
 * const output = '1/1(月)';
 * assert.equal(formatDateToMonthDayWeek(input), output);
 *
 * const output_zero_fill = '01/01(月)';
 * assert.equal(formatDateToMonthDayWeek(input, true), output_zero_fill);
 * ```
 * @param date
 * @param fillZero
 * @returns string
 */
export const formatDateToMonthDayWeek = (
  date: Date,
  fillZero = false
): string => {
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const week = ["日", "月", "火", "水", "木", "金", "土"][date.getDay()];
  return [month, day]
    .map((n) => (fillZero ? String(n).padStart(2, "0") : String(n)))
    .join("/")
    .concat(`(${week})`);
};
