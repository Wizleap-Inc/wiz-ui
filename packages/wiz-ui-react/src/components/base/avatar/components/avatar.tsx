import {
  ColorKeys,
  ComponentName,
  SpacingKeys,
} from "@wizleap-inc/wiz-ui-constants";
import * as styles from "@wizleap-inc/wiz-ui-styles/bases/avatar.css";
import {
  backgroundStyle,
  sizeStyle,
  colorStyle,
} from "@wizleap-inc/wiz-ui-styles/commons";
import clsx from "clsx";
import { ComponentProps, ForwardedRef, forwardRef, useState } from "react";

type Props = {
  src: string;
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
      src,
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

    const onError = () => setIsLoadSuccess(false);

    return (
      <div
        ref={ref}
        className={clsx(
          styles.avatarStyle,
          sizeStyle[size],
          colorStyle[color],
          clickable && styles.avatarClickableStyle
        )}
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
            onError={onError}
          />
        ) : (
          <div
            className={clsx(
              styles.avatarFallbackStyle,
              backgroundStyle[bgColor]
            )}
          >
            {fallback}
          </div>
        )}
      </div>
    );
  }
);

Avatar.displayName = ComponentName.Avatar;

export const WizAvatar = Avatar;
