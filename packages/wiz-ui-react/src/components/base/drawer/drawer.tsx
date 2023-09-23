import { ComponentName } from "@wizleap-inc/wiz-ui-constants";
import * as styles from "@wizleap-inc/wiz-ui-styles/bases/drawer.css";
import clsx from "clsx";
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
  /**
   * 左右どちらからスライドインするか指定します。
   * @type {"left" | "right"}
   * @default "left"
   */
  place?: "left" | "right";
  width?: string;
  shadow?: boolean;
};

const Drawer: FC<Props> = ({
  isOpen,
  offsetTop = "0px",
  place = "left",
  width = "100%",
  shadow = false,
  children,
}: Props) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isActuallyOpen, setIsActuallyOpen] = useState(isOpen);

  useEffect(() => {
    if (isOpen) {
      // Move-in animation
      setIsActuallyOpen(true);
      containerRef.current?.animate(
        [
          {
            transform:
              place === "left" ? "translateX(-100%)" : "translateX(100%)",
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
            transform:
              place === "left" ? "translateX(-100%)" : "translateX(100%)",
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
  }, [isOpen, place]);

  return (
    <WizPortal container={document.body}>
      <div
        className={styles.drawerContainerStyle}
        style={{
          top: offsetTop,
          bottom: 0,
          display: isActuallyOpen ? undefined : "none",
        }}
      >
        <div
          ref={containerRef}
          className={clsx([
            styles.drawerContainerItemsStyle,
            shadow && styles.drawerShadowStyle,
          ])}
          style={{
            width: width,
            right: place === "right" ? 0 : undefined,
          }}
        >
          {children}
        </div>
      </div>
    </WizPortal>
  );
};

Drawer.displayName = ComponentName.Drawer;

export const WizDrawer = Drawer;
