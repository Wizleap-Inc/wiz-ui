// @vitest-environment jsdom
import { FC, act, useRef } from "react";
import { createRoot, Root } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { useClickOutside } from "../use-click-outside";

declare global {
  // eslint-disable-next-line no-var
  var IS_REACT_ACT_ENVIRONMENT: boolean;
}
globalThis.IS_REACT_ACT_ENVIRONMENT = true;

type ProbeProps = { enabled: boolean; onOutside: (e: Event) => void };

const Probe: FC<ProbeProps> = ({ enabled, onOutside }) => {
  const ref = useRef<HTMLDivElement | null>(null);
  useClickOutside([ref], onOutside, enabled);
  return (
    <div ref={ref} data-testid="inside">
      <button data-testid="inside-button">item</button>
    </div>
  );
};

const pointerDown = (el: Element) =>
  el.dispatchEvent(new Event("pointerdown", { bubbles: true }));
const click = (el: Element) =>
  el.dispatchEvent(new MouseEvent("click", { bubbles: true }));

describe("useClickOutside", () => {
  let container: HTMLDivElement | undefined = undefined;
  let outside: HTMLButtonElement | undefined = undefined;
  let root: Root | undefined = undefined;
  const onOutside = vi.fn();

  const render = (enabled: boolean) => {
    act(() => {
      root?.render(<Probe enabled={enabled} onOutside={onOutside} />);
    });
  };
  // 有効化の 1 tick 後にリスナーが付くので、タイマーを進めて「監視中」にする
  const settle = () => {
    act(() => {
      vi.runAllTimers();
    });
  };
  const inside = () => container!.querySelector("[data-testid=inside]")!;
  const insideButton = () =>
    container!.querySelector("[data-testid=inside-button]")!;

  beforeEach(() => {
    vi.useFakeTimers();
    onOutside.mockReset();
    container = document.createElement("div");
    outside = document.createElement("button");
    document.body.append(container, outside);
    root = createRoot(container);
  });

  afterEach(() => {
    act(() => {
      root?.unmount();
    });
    container?.remove();
    outside?.remove();
    vi.useRealTimers();
  });

  it("外側を押して離すと 1 回だけ呼ばれる", () => {
    render(true);
    settle();
    pointerDown(outside!);
    click(outside!);
    expect(onOutside).toHaveBeenCalledTimes(1);
  });

  it("内側を押して離しても呼ばれない", () => {
    render(true);
    settle();
    pointerDown(insideButton());
    click(insideButton());
    expect(onOutside).not.toHaveBeenCalled();
  });

  it("内側で押し始めた操作は、click が外側に落ちても呼ばれない (iOS の合成 click)", () => {
    render(true);
    settle();
    pointerDown(insideButton());
    click(outside!);
    expect(onOutside).not.toHaveBeenCalled();
    // 次の操作には持ち越さない
    pointerDown(outside!);
    click(outside!);
    expect(onOutside).toHaveBeenCalledTimes(1);
  });

  it("有効になったきっかけの click では呼ばれない (開いたタップ自身で閉じない)", () => {
    render(false);
    settle();
    // 開く操作: pointerdown → click の処理中に enabled が true になり、その click が document まで伝播する
    pointerDown(outside!);
    render(true);
    click(outside!);
    expect(onOutside).not.toHaveBeenCalled();
    // 1 tick 後からは監視される
    settle();
    pointerDown(outside!);
    click(outside!);
    expect(onOutside).toHaveBeenCalledTimes(1);
  });

  it("pointerdown を伴わない外側の click (キーボード操作) でも呼ばれる", () => {
    render(true);
    settle();
    click(outside!);
    expect(onOutside).toHaveBeenCalledTimes(1);
  });

  it("外側で click の伝播が止められていても呼ばれる", () => {
    render(true);
    settle();
    outside!.addEventListener("click", (e) => e.stopPropagation());
    pointerDown(outside!);
    click(outside!);
    expect(onOutside).toHaveBeenCalledTimes(1);
  });

  it("enabled が false の間は呼ばれず、true に戻すと再び監視する", () => {
    render(true);
    settle();
    render(false);
    pointerDown(outside!);
    click(outside!);
    expect(onOutside).not.toHaveBeenCalled();
    render(true);
    settle();
    pointerDown(outside!);
    click(outside!);
    expect(onOutside).toHaveBeenCalledTimes(1);
  });

  it("要素の内側判定は最新の ref を見る", () => {
    render(true);
    settle();
    pointerDown(inside());
    click(inside());
    expect(onOutside).not.toHaveBeenCalled();
  });
});
