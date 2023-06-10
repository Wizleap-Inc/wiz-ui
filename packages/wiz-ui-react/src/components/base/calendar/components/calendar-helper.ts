import { CalendarData, CalendarDataItem } from "./types";

export function createCalendarData(
  currentShowingDateTime: Date,
  shouldFillWeeks?: boolean
): CalendarData {
  const year = currentShowingDateTime.getFullYear();
  const month = currentShowingDateTime.getMonth();

  // 表示月の 1日（ついたち）
  const firstDateTimeOfMonth = new Date(year, month, 1);
  const firstDayOfMonth = firstDateTimeOfMonth.getDay();

  // 表示月の末日
  const lastDateTimeOfMonth = new Date(year, month + 1, 0);
  const lastDateOfMonth = lastDateTimeOfMonth.getDate();
  const lastDayOfMonth = lastDateTimeOfMonth.getDay();

  // 表示月の前月の末日
  const LastDateOfLastMonth = new Date(year, month, 0).getDate();

  // 前月分の日付データの配列
  const lastMonthDataItems: CalendarDataItem[] = Array.from({
    length: firstDayOfMonth,
  })
    .map((_, index) => ({
      label: shouldFillWeeks ? String(LastDateOfLastMonth - index) : "",
      isOutOfCurrentMonth: true,
    }))
    .reverse();

  // 表示月分の日付データの配列
  const currentMonthDataItems: CalendarDataItem[] = Array.from({
    length: lastDateOfMonth,
  }).map((_, index) => ({
    label: String(index + 1),
  }));

  // 次月分の日付データの配列
  const nextMonthDataItems: CalendarDataItem[] = Array.from({
    length: 6 - lastDayOfMonth,
  }).map((_, index) => ({
    label: shouldFillWeeks ? String(index + 1) : "",
    isOutOfCurrentMonth: true,
  }));

  const flatDataItems = [
    ...lastMonthDataItems,
    ...currentMonthDataItems,
    ...nextMonthDataItems,
  ];

  const result: CalendarData = [];
  // 週ごとの二重配列を作成
  for (let i = 0; i < flatDataItems.length / 7; i++) {
    result.push(flatDataItems.slice(i * 7, (i + 1) * 7));
  }
  return result;
}
