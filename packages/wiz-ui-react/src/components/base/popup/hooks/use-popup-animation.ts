import { RefObject, useEffect, useState } from "react";

export const usePopupAnimation = (
  animation: boolean,
  popupRef: RefObject<HTMLDivElement>,
  isOpen: boolean
) => {
  const [isActuallyOpen, setIsActuallyOpen] = useState(false);

  useEffect(() => {
    // safariでanimationを有効にするために必要
    if (popupRef.current?.style) popupRef.current.style.animationName = "fade";

    const target = popupRef.current;
    if (!animation || !target) {
      setIsActuallyOpen(isOpen);
      return;
    }
    if (isOpen) {
      setIsActuallyOpen(true);
      target.animate([{ opacity: 0 }, { opacity: 1 }], {
        duration: 200,
        easing: "ease-in-out",
        fill: "forwards",
      });
    } else {
      const anime = target.animate([{ opacity: 1 }, { opacity: 0 }], {
        duration: 200,
        fill: "forwards",
        easing: "ease-in-out",
      });
      anime.onfinish = () => {
        setIsActuallyOpen(false);
      };
    }
  }, [animation, isOpen, popupRef]);

  return isActuallyOpen;
};
