import { RefObject, useEffect } from "react";

export const useClickOutside = (
  insideElements: Array<RefObject<HTMLElement>>,
  callback: (event: Event) => void
) => {
  useEffect(() => {
    const handleClick = (event: Event) => {
      const isInsideElementClicked = insideElements.some((el) =>
        el?.current?.contains(event.target as Node)
      );
      if (!isInsideElementClicked) callback(event);
    };
    document.addEventListener("mouseup", handleClick);
    document.addEventListener("touchstart", handleClick);
    return () => {
      document.removeEventListener("mouseup", handleClick);
      document.removeEventListener("touchstart", handleClick);
    };
  }, [callback, insideElements]);
};
