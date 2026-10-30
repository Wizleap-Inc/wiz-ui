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
 * formatDateToYMDHM
 * ```ts
 * const input = new Date('2021-01-01 12:34:56');
 * const output = '2021-01-01 12:34';
 * assert.equal(formatDateToYMDHM(input), output);
 * ```
 */
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

/**
 * formatDateToYYMMDD
 * ```ts
 * const input = new Date('2021-01-01 12:34:56');
 * const output = '21/1/1';
 * assert.equal(formatDateToYYMMDD(input), output);
 * ```
 */
export const formatDateToYYMMDD = (_date: Date): string => {
  const year = String(_date.getFullYear() % 100).padStart(2, "0");
  const month = _date.getMonth() + 1;
  const date = _date.getDate();
  const day = [year, month, date].join("/");
  return `${day}`;
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

/**
 * formatDateToMD
 * ```ts
 * const input = new Date('2021-01-01');
 * const output = '1/1';
 * assert.equal(formatDateToMD(input), output);
 * ```
 * @param date
 * @returns string
 */
export const formatDateToMD = (date: Date): string => {
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return [month, day].join("/");
};

/**
 * formatNumHourToTime
 * ```ts
 * const input = 1.5;
 * const output = '1:30';
 * assert.equal(formatNumHourToTime(input), output);
 * ```
 * @param numHour
 * @returns string
 */
export const formatNumHourToTime = (numHour: number): string => {
  const hours = Math.floor(numHour);
  const minutes = Math.floor((numHour - hours) * 60);
  return [hours, minutes.toString().padStart(2, "0")].join(":");
};

/**
 * formatDateToYYYYMMDD
 * ```ts
 * const input = new Date('2021-01-01');
 * const output = '2021/01/01';
 * assert.equal(formatDateToYYYYMMDD(input), output);
 * ```
 * @param date
 * @returns string
 */
export const formatDateToYYYYMMDD = (date: Date): string => {
  const year = String(date.getFullYear()).padStart(4, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return [year, month, day].join("/");
};

/**
 * parseDateInput
 * 手入力された日付文字列を Date に変換します。
 * `YYYY/MM/DD`・`YYYY-MM-DD`（月日は1桁可）と区切りなし8桁を受け付け、全角数字・全角区切りも半角として扱います。
 * 形式が違う・実在しない日付の場合は null を返します。
 * ```ts
 * assert.deepEqual(parseDateInput('2036/1/5'), new Date(2036, 0, 5));
 * assert.deepEqual(parseDateInput('２０３６－１０－２０'), new Date(2036, 9, 20));
 * assert.deepEqual(parseDateInput('20361020'), new Date(2036, 9, 20));
 * assert.equal(parseDateInput('2036/2/30'), null);
 * ```
 * @param input
 * @returns Date | null
 */
export const parseDateInput = (input: string): Date | null => {
  const normalized = input
    .trim()
    .replace(/[０-９]/g, (c) => String.fromCharCode(c.charCodeAt(0) - 0xfee0))
    .replace(/[／]/g, "/")
    .replace(/[－ー−]/g, "-");
  const match =
    normalized.match(/^(\d{4})([/-])(\d{1,2})\2(\d{1,2})$/) ??
    normalized.match(/^(\d{4})()(\d{2})(\d{2})$/);
  if (!match) return null;
  const year = Number(match[1]);
  const month = Number(match[3]);
  const day = Number(match[4]);
  const date = new Date(year, month - 1, day);
  date.setFullYear(year);
  if (
    date.getFullYear() !== year ||
    date.getMonth() !== month - 1 ||
    date.getDate() !== day
  ) {
    return null;
  }
  return date;
};
