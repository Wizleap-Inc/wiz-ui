/**
 * スクロールイベントを登録する
 *
 * targetを指定した場合、targetが属しているスクロールしうる全ての親要素にスクロールイベントを登録する
 *
 * @param cb イベントハンドラ
 * @param target イベントを登録する要素
 * @returns スクロールイベントを削除する関数
 */
export const useScroll = (cb: (event: Event) => void, target?: HTMLElement) => {
  const removeEventHandlers: (() => void)[] = [];
  const removeScrollEvent = () => {
    removeEventHandlers.forEach((removeEventHandler) => {
      removeEventHandler();
    });
  };

  window.addEventListener("scroll", cb);
  removeEventHandlers.push(() => {
    window.removeEventListener("scroll", cb);
  });

  if (!target) return removeScrollEvent;

  const setEventToParent = (elm: HTMLElement | null) => {
    if (!elm) return;
    if (elm.parentElement === null) return;
    if (elm.scrollHeight > elm.clientHeight) {
      elm.addEventListener("scroll", cb);
      removeEventHandlers.push(() => {
        elm.removeEventListener("scroll", cb);
      });
    }
    setEventToParent(elm.parentElement);
  };

  setEventToParent(target);

  return removeScrollEvent;
};
