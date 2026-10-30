import { RefObject, useEffect } from "react";

export const useClickOutside = (
  insideElements: Array<RefObject<HTMLElement>>,
  callback: (event: Event) => void
) => {
  useEffect(() => {
    const handleClick = (event: Event) => {
      const isInsideElementClicked = insideElements.some(
        (el) => el?.current && event.composedPath().includes(el.current)
      );
      if (!isInsideElementClicked) callback(event);
    };
    document.addEventListener("mouseup", handleClick);
    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("mouseup", handleClick);
      document.removeEventListener("click", handleClick);
    };
  }, [callback, insideElements]);
};
