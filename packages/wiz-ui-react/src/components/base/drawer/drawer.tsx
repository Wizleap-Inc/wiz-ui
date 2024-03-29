import { ComponentName } from "@wizleap-inc/wiz-ui-constants";
import * as styles from "@wizleap-inc/wiz-ui-styles/bases/drawer.css";
import clsx from "clsx";
import { FC, ReactNode, useEffect, useRef, useState } from "react";

import { WizPortal } from "@/components";
import { BaseProps } from "@/types";
type Props = BaseProps & {
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
  className,
  style,
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
        ref={containerRef}
        className={clsx(
          className,
          styles.drawerStyle,
          shadow && styles.drawerShadowStyle
        )}
        style={{
          ...style,
          top: offsetTop,
          bottom: 0,
          display: isActuallyOpen ? undefined : "none",
          width: width,
          right: place === "right" ? 0 : undefined,
        }}
      >
        {children}
      </div>
    </WizPortal>
  );
};

Drawer.displayName = ComponentName.Drawer;

export const WizDrawer = Drawer;
