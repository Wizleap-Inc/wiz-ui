import {
  ColorKeys,
  ComponentName,
  SpacingKeys,
  THEME,
} from "@wizleap-inc/wiz-ui-constants";
import * as styles from "@wizleap-inc/wiz-ui-styles/bases/avatar.css";
import {
  backgroundStyle,
  colorStyle,
  sizeStyle,
} from "@wizleap-inc/wiz-ui-styles/commons";
import clsx from "clsx";
import {
  ComponentProps,
  ForwardedRef,
  forwardRef,
  useMemo,
  useState,
} from "react";

import { BaseProps } from "@/types";
type Props = BaseProps & {
  src?: string;
  name?: string;
  size?: SpacingKeys;
  color?: ColorKeys;
  bgColor?: ColorKeys;
  alt?: string;
  fallback?: string;
  clickable?: boolean;
} & ComponentProps<"div">;

const Avatar = forwardRef(
  (
    {
      className,
      style,
      src,
      name,
      size = "xl3",
      color = "gray.900",
      bgColor = "gray.400",
      alt,
      fallback,
      clickable,
      onClick,
      ...props
    }: Props,
    ref: ForwardedRef<HTMLDivElement>
  ) => {
    const [isImgLoadSuccess, setIsLoadSuccess] = useState(true);

    const altHeader = useMemo(() => {
      if (name) {
        const InitialWords = name.split(/ |　/);
        if (InitialWords.length > 1) {
          return (
            InitialWords[0][0].toUpperCase() + InitialWords[1][0].toUpperCase()
          );
        }
        return InitialWords[0][0].toUpperCase();
      }
      if (fallback) return fallback;
      "";
    }, [name, fallback]);

    const defaultBgColor = useMemo(() => {
      if (!name) return THEME.color.gray[400];
      const getNum = Array.from(name)
        .map((ch) => ch.charCodeAt(0))
        .reduce((a, b) => a + b);
      const extractHue = (getNum * getNum) % 360;
      return `hsl(${extractHue}, 80%, 64%)`;
    }, [name, fallback]);

    return (
      <div
        ref={ref}
        className={clsx(
          className,
          styles.avatarStyle,
          sizeStyle[size],
          colorStyle[color],
          clickable && styles.avatarClickableStyle
        )}
        style={style}
        {...props}
        role={clickable ? "button" : undefined}
        tabIndex={clickable ? 0 : undefined}
        onClick={(e) => clickable && onClick?.(e)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            if (!clickable) return;
            if (e.target instanceof HTMLElement) {
              e.stopPropagation();
              e.target.click();
            }
          }
        }}
      >
        {isImgLoadSuccess ? (
          <img
            className={styles.avatarImageStyle}
            src={src}
            alt={alt}
            onError={() => setIsLoadSuccess(false)}
          />
        ) : (
          <div
            className={clsx(
              styles.avatarFallbackStyle,
              bgColor && backgroundStyle[bgColor]
            )}
            style={{
              backgroundColor: defaultBgColor,
            }}
          >
            {altHeader}
          </div>
        )}
      </div>
    );
  }
);

Avatar.displayName = ComponentName.Avatar;

export const WizAvatar = Avatar;
