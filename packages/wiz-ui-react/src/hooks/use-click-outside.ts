import { RefObject, useEffect, useRef } from "react";

/**
 * insideElements の外側がクリックされたときに callback を呼びます。
 *
 * iOS (WebKit) はタップのあとに mousedown / mouseup / click を合成し、その時点で指の位置にある要素を取り直します。
 * そのため次の 3 点を守らないと、iPad で Popup が「項目を押しても下の要素に click が落ちる」「開いた瞬間に閉じる」になります。
 *
 * - 外側かどうかは押し始め (pointerdown) の時点で決める。DOM が変わる前の、指を置いた要素で判定できる
 * - 実際に callback を呼ぶのはその後の click。touchstart や mouseup で閉じると、合成 click が Popup の下の要素に届く
 * - 監視は enabled の間だけ、かつ有効になった操作の 1 tick 後から始める。開いたタップ自身の click を拾って閉じない
 *
 * リスナーは capture で登録するので、外側で click の伝播を止めている要素があっても閉じられます。
 */
export const useClickOutside = (
  insideElements: Array<RefObject<HTMLElement>>,
  callback: (event: Event) => void,
  enabled = true
) => {
  // 毎レンダーで identity が変わっても購読をやり直さないよう ref 経由で参照する
  const callbackRef = useRef(callback);
  callbackRef.current = callback;
  const insideElementsRef = useRef(insideElements);
  insideElementsRef.current = insideElements;

  useEffect(() => {
    if (!enabled) return;

    const isInside = (target: EventTarget | null) =>
      insideElementsRef.current.some((el) =>
        el?.current?.contains(target as Node)
      );

    // 直前の pointerdown が内側で始まったか。pointerdown が来ない操作 (キーボードの Enter / Space 等) では null のまま
    let pressedInside: boolean | null = null;

    const handlePointerDown = (event: Event) => {
      pressedInside = isInside(event.target);
    };

    const handleClick = (event: Event) => {
      const startedInside = pressedInside;
      pressedInside = null;
      if (startedInside) return;
      if (isInside(event.target)) return;
      callbackRef.current(event);
    };

    // 有効になったきっかけの click がこのあと document まで伝播してくるので、それを拾わないよう 1 tick 遅らせる
    const timerId = window.setTimeout(() => {
      document.addEventListener("pointerdown", handlePointerDown, true);
      document.addEventListener("click", handleClick, true);
    }, 0);

    return () => {
      window.clearTimeout(timerId);
      document.removeEventListener("pointerdown", handlePointerDown, true);
      document.removeEventListener("click", handleClick, true);
    };
  }, [enabled]);
};
