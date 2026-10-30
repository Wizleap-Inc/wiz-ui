// @vitest-environment jsdom
import { FC, act, useRef, useState } from "react";
import { flushSync } from "react-dom";
import { createRoot, Root } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { useClickOutside } from "../use-click-outside";

declare global {
  // eslint-disable-next-line no-var
  var IS_REACT_ACT_ENVIRONMENT: boolean;
}
globalThis.IS_REACT_ACT_ENVIRONMENT = true;

const Probe: FC<{ onOutside: (e: Event) => void }> = ({ onOutside }) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [isRemoved, setIsRemoved] = useState(false);
  useClickOutside([ref], onOutside);
  return (
    <div ref={ref}>
      {/* 選ぶと一覧から消える項目 (multiSelectable の SearchSelector)。
          ブラウザでは React の再描画が document のリスナーより先に走るので、flushSync で同じ順序にする */}
      {!isRemoved && (
        <button
          data-testid="removable-button"
          onClick={() => flushSync(() => setIsRemoved(true))}
        >
          item
        </button>
      )}
    </div>
  );
};

describe("useClickOutside", () => {
  let container: HTMLDivElement | undefined = undefined;
  let outside: HTMLButtonElement | undefined = undefined;
  let root: Root | undefined = undefined;
  const onOutside = vi.fn();

  beforeEach(() => {
    onOutside.mockReset();
    container = document.createElement("div");
    outside = document.createElement("button");
    document.body.append(container, outside);
    root = createRoot(container);
    act(() => {
      root?.render(<Probe onOutside={onOutside} />);
    });
  });

  afterEach(() => {
    act(() => {
      root?.unmount();
    });
    container?.remove();
    outside?.remove();
  });

  it("外側を click すると呼ばれる", () => {
    outside!.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    expect(onOutside).toHaveBeenCalledTimes(1);
  });

  it("内側の click の処理中にその要素が DOM から取り除かれても呼ばれない", () => {
    const button = container!.querySelector("[data-testid=removable-button]")!;
    act(() => {
      button.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });
    expect(button.isConnected).toBe(false);
    expect(onOutside).not.toHaveBeenCalled();
  });
});
