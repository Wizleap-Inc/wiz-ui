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
