import { describe, expect, it } from "vitest";

import { createCalendarData } from "../components/calendar-helper";

describe("calendar-helper", () => {
  describe("createCalendarData", () => {
    it("カレンダーのデータを作成する", () => {
      const actual = createCalendarData(new Date("2023-02"));

      // 5週分あること
      expect(actual.length).toBe(5);
      // 1週目が7日分あること
      expect(actual[0].length).toBe(7);
      // 最初のデータが前月のデータであること
      expect(actual[0][0]).toEqual({
        label: "",
        isOutOfCurrentMonth: true,
      });
      // 前月との境界が正しいこと
      expect(actual[0][2]).toEqual({
        label: "",
        isOutOfCurrentMonth: true,
      });
      expect(actual[0][3]).toEqual({ label: "1" });
      // 最終週が7日分あること
      expect(actual.at(-1)?.length).toBe(7);
      // 次月との境界が正しいこと
      expect(actual[4][2]).toEqual({
        label: "28",
      });
      expect(actual[4][3]).toEqual({
        label: "",
        isOutOfCurrentMonth: true,
      });
      // 最後のデータが次月のデータであること
      expect(actual[4][6]).toEqual({
        label: "",
        isOutOfCurrentMonth: true,
      });
    });

    it("前後の月の日付を含んだカレンダーのデータを作成する", () => {
      const actual = createCalendarData(new Date("2023-02"), true);

      // 前月分
      expect(actual[0][0]).toEqual({
        label: "29",
        isOutOfCurrentMonth: true,
      });
      expect(actual[0][2]).toEqual({
        label: "31",
        isOutOfCurrentMonth: true,
      });
      // 表示月分
      expect(actual[0][3]).toEqual({ label: "1" });
      expect(actual[4][2]).toEqual({
        label: "28",
      });
      // 次月分
      expect(actual[4][3]).toEqual({
        label: "1",
        isOutOfCurrentMonth: true,
      });
      expect(actual[4][6]).toEqual({
        label: "4",
        isOutOfCurrentMonth: true,
      });
    });
  });
});
