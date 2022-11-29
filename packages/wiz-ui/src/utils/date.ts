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

export const formatDateToYMDHM = (_date: Date): string => {
  const year = _date.getFullYear();
  const month = _date.getMonth() + 1;
  const date = _date.getDate();
  const hours = _date.getHours();
  const minutes = _date.getMinutes();
  const day = [year, month, date]
    .map((n) => String(n).padStart(2, "0"))
    .join("/");
  const time = [hours, minutes]
    .map((n) => String(n).padStart(2, "0"))
    .join(":");
  return `${day} ${time}`;
};

const DATE_UNITS = {
  year: 1000 * 60 * 60 * 24 * 365,
  month: 1000 * 60 * 60 * 24 * 30,
  day: 1000 * 60 * 60 * 24,
  hour: 1000 * 60 * 60,
  minute: 1000 * 60,
};

export const formatHowPast = (date: Date): string => {
  const diff = new Date().getTime() - date.getTime();
  const format = (sec: number, post: string) => Math.floor(diff / sec) + post;
  if (diff < DATE_UNITS["minute"]) return `たった今`;
  if (diff < DATE_UNITS["hour"]) return format(DATE_UNITS["minute"], "分前");
  if (diff < DATE_UNITS["day"]) return format(DATE_UNITS["hour"], "時間前");
  if (diff < DATE_UNITS["month"]) return format(DATE_UNITS["day"], "日前");
  if (diff < DATE_UNITS["year"]) return format(DATE_UNITS["month"], "ヶ月前");
  return format(DATE_UNITS["year"], "年前");
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
