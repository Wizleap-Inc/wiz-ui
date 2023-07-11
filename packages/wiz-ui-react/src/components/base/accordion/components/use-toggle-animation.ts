import { useEffect, useRef, useState } from "react";

export const ANIMATION_CONFIGURATION = {
  duration: 400,
  easing: "ease-out",
};

export function useToggleAnimation(isOpen: boolean) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [isActuallyOpen, setIsActuallyOpen] = useState(isOpen);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const content = contentRef.current;
    if (isActuallyOpen === isOpen || !content) {
      return;
    }
    // ちらつき防止のための height: 0 を打ち消す
    content.style.height = "auto";
    setIsAnimating(true);
    const contentRect = content.getBoundingClientRect();

    if (isOpen) {
      setIsActuallyOpen(true);
      if (contentRect.height === 0) {
        // 高さが取れないブラウザがあるので、その場合はアニメーションさせない
        setIsAnimating(false);
        return;
      }
      const openingAnimation = content.animate(
        [{ height: 0 }, { height: `${contentRect.height}px` }],
        ANIMATION_CONFIGURATION
      );
      openingAnimation.onfinish = () => {
        setIsAnimating(false);
      };
    } else {
      const closingAnimation = content.animate(
        [{ height: `${contentRect.height}px` }, { height: 0 }],
        ANIMATION_CONFIGURATION
      );
      closingAnimation.onfinish = () => {
        setIsActuallyOpen(false);
        setIsAnimating(false);
        // ちらつき防止
        content.style.height = "0px";
      };
    }
  }, [isActuallyOpen, isOpen]);

  return { isActuallyOpen, isAnimating, contentRef };
}
