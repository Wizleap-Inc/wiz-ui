import { ComponentName } from "@wizleap-inc/wiz-ui-constants";
import * as styles from "@wizleap-inc/wiz-ui-styles/bases/drawer.css";
import { FC, ReactNode, useEffect, useRef, useState } from "react";

type Props = {
  isOpen: boolean;
  /**
   * オフセットを指定してdrawerの高さを調整します。
   * @type {string}
   * @default 0px
   * @example THEME.share.HEADER_HEIGHT
   */
  offsetHeight?: string;
  children: ReactNode;
  footerChildren?: ReactNode;
};

const Drawer: FC<Props> = ({
  isOpen,
  offsetHeight = "0px",
  children,
  footerChildren,
}: Props) => {
  const [height, setHeight] = useState(document.documentElement.clientHeight);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isActuallyOpen, setIsActuallyOpen] = useState(isOpen);

  useEffect(() => {
    const updateHeight = () => {
      setHeight(
        Math.max(
          document.documentElement.clientHeight,
          containerRef.current?.scrollHeight || 0
        )
      );
    };
    updateHeight();
    window.addEventListener("resize", updateHeight);
    return () => {
      window.removeEventListener("resize", updateHeight);
    };
  }, []);

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
    <div
      ref={containerRef}
      className={styles.drawerContainerStyle}
      style={{
        height: `calc(${height}px - ${offsetHeight})`,
        display: isActuallyOpen ? undefined : "none",
      }}
    >
      <div className={styles.drawerContainerItemsStyle}>{children}</div>
      {footerChildren && (
        <div className={styles.drawerContainerFooterStyle}>
          {footerChildren}
        </div>
      )}
    </div>
  );
};

Drawer.displayName = ComponentName.Drawer;

export const WizDrawer = Drawer;
