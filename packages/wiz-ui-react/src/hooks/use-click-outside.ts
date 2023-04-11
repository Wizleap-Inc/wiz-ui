import { RefObject, useEffect, useRef } from "react";

export const useClickOutside = (
  elementRef: RefObject<HTMLElement>,
  callback: (event: Event) => void,
  ignoredElementRef?: RefObject<HTMLElement>
) => {
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  const handleClick = (event: Event) => {
    const clickedIgnoredElement = ignoredElementRef?.current?.contains(
      event.target as Node
    );
    const clickedOutsideElement =
      elementRef.current && !elementRef.current.contains(event.target as Node);
    if (clickedOutsideElement && !clickedIgnoredElement) {
      callbackRef.current(event);
    }
  };

  useEffect(() => {
    document.addEventListener("mouseup", handleClick);
    document.addEventListener("touchstart", handleClick);
    return () => {
      document.removeEventListener("mouseup", handleClick);
      document.removeEventListener("touchstart", handleClick);
    };
  }, [elementRef]);
};
