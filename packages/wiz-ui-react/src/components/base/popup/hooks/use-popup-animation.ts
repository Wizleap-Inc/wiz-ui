import { useState, useEffect, RefObject } from "react";

const toggleWithFadeAnimation = {
  open: (target: HTMLDivElement, onStart: () => void) => {
    onStart();
    target.animate([{ opacity: 0 }, { opacity: 1 }], {
      duration: 200,
      easing: "ease-in-out",
      fill: "forwards",
    });
  },
  close: (target: HTMLDivElement, onClose: () => void) => {
    const anime = target.animate([{ opacity: 1 }, { opacity: 0 }], {
      duration: 200,
      fill: "forwards",
      easing: "ease-in-out",
    });
    anime.onfinish = () => {
      onClose();
    };
  },
};

export const usePopupAnimation = (
  animation: boolean,
  popupRef: RefObject<HTMLDivElement>,
  isOpen: boolean
) => {
  const [isActuallyOpen, setIsActuallyOpen] = useState(false);

  useEffect(() => {
    const target = popupRef.current;
    if (!animation || !target) {
      setIsActuallyOpen(isOpen);
      return;
    }
    if (isOpen) {
      toggleWithFadeAnimation.open(target, () => setIsActuallyOpen(true));
    } else
      toggleWithFadeAnimation.close(target, () => setIsActuallyOpen(false));
  }, [animation, isOpen, popupRef]);

  return isActuallyOpen;
};
