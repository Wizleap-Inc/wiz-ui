import { ComponentName } from "@wizleap-inc/wiz-ui-constants";
import * as styles from "@wizleap-inc/wiz-ui-styles/bases/drawer.css";
import { FC, ReactNode, useEffect, useRef, useState } from "react";

import { WizPortal } from "@/components";

type Props = {
  isOpen: boolean;
  /**
   * オフセットを指定してdrawerの高さを調整します。
   * @type {string}
   * @default 0px
   * @example THEME.share.HEADER_HEIGHT
   */
  offsetTop?: string;
  children: ReactNode;
};

const Drawer: FC<Props> = ({ isOpen, offsetTop = "0px", children }: Props) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isActuallyOpen, setIsActuallyOpen] = useState(isOpen);

  useEffect(() => {
    if (isOpen) {
      // Move-in animation
      setIsActuallyOpen(true);
      containerRef.current?.animate(
        [
          {
            transform: "translateX(-100vw)",
          },
          {
            transform: "translateX(0)",
          },
        ],
        {
          duration: 300,
          easing: "ease",
          fill: "forwards",
        }
      );
    } else {
      // Move-out animation
      const animation = containerRef.current?.animate(
        [
          {
            transform: "translateX(0)",
          },
          {
            transform: "translateX(-100vw)",
          },
        ],
        {
          duration: 300,
          easing: "ease",
          fill: "forwards",
        }
      );
      if (animation) {
        animation.onfinish = () => {
          // Ensure the container is hidden after the animation is complete
          setIsActuallyOpen(false);
        };
      }
    }
  }, [isOpen]);

  return (
    <WizPortal container={document.body}>
      <div
        ref={containerRef}
        className={styles.drawerContainerStyle}
        style={{
          top: offsetTop,
          bottom: 0,
          display: isActuallyOpen ? undefined : "none",
        }}
      >
        <div className={styles.drawerContainerItemsStyle}>{children}</div>
      </div>
    </WizPortal>
  );
};

Drawer.displayName = ComponentName.Drawer;

export const WizDrawer = Drawer;