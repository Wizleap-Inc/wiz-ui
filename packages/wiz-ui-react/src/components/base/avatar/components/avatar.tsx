import {
  ColorKeys,
  ComponentName,
  SpacingKeys,
  THEME,
  getColorCss,
} from "@wizleap-inc/wiz-ui-constants";
import * as styles from "@wizleap-inc/wiz-ui-styles/bases/avatar.css";
import { colorStyle, sizeStyle } from "@wizleap-inc/wiz-ui-styles/commons";
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

  /**
   * @deprecated この プロパティ は削除予定です。代わりに `name` プロパティを使ってください。
   */
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
        // eslint-disable-next-line no-irregular-whitespace
        const InitialWords = name.split(/ |　/);
        if (InitialWords.length > 1) {
          const firstWord = InitialWords[0][0]?.toUpperCase() ?? "";
          const secondWord = InitialWords[1][0]?.toUpperCase() ?? "";
          return firstWord + secondWord;
        }
        return InitialWords[0][0].toUpperCase();
      }
      if (fallback) return fallback;
      return "";
    }, [name, fallback]);

    const avatarBgColor = useMemo(() => {
      if (bgColor) return getColorCss(bgColor);
      if (!name) return THEME.color.gray[400];
      const getNum = Array.from(name)
        .map((ch) => ch.charCodeAt(0))
        .reduce((a, b) => a + b);
      const extractHue = (getNum * getNum) % 360;
      return `hsl(${extractHue}, 50%, 48%)`;
    }, [bgColor, name]);

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
            className={clsx(styles.avatarFallbackStyle)}
            style={{
              background: avatarBgColor,
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
