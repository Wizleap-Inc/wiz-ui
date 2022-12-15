import { THEME } from "@wizleap-inc/wiz-ui-constants";
import { describe, it, expect } from "vitest";

import { useZIndex } from "./use-z-index";

describe("useZIndex", () => {
  it("initialZIndexが数値のとき、その値を元に初期化する", () => {
    const { currentZIndex } = useZIndex(100);
    expect(currentZIndex.value).toBe(100);
  });

  it("initialZIndexが文字列のとき、その値を元に初期化する", () => {
    const { currentZIndex } = useZIndex(THEME.zIndex.popover);
    const popoverZIndex = +THEME.zIndex.popover;
    expect(currentZIndex.value).toBe(popoverZIndex);
  });

  it("nextZIndexを呼び出すと、currentZIndexがインクリメントされる", () => {
    const { currentZIndex, nextZIndex } = useZIndex(100);
    nextZIndex();
    expect(currentZIndex.value).toBe(101);
  });
});
