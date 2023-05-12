import {
  ColorKeys,
  ComponentName,
  ShadowKeys,
  SpacingKeys,
  ZIndexKeys,
  getColorCss,
  getShadowCss,
  getSpacingCss,
  getZIndexCss,
} from "@wizleap-inc/wiz-ui-constants";
import { ComponentProps, ForwardedRef, ReactNode, forwardRef } from "react";

type Props = {
  position?: "absolute" | "relative" | "fixed" | "sticky" | "static";
  top?: string;
  right?: string;
  left?: string;
  bottom?: string;
  width?: string;
  minWidth?: string;
  maxWidth?: string;
  height?: string;
  minHeight?: string;
  maxHeight?: string;
  round?: SpacingKeys;
  roundT?: SpacingKeys;
  roundL?: SpacingKeys;
  roundR?: SpacingKeys;
  roundB?: SpacingKeys;
  zIndex?: ZIndexKeys;
  bgColor?: ColorKeys;
  shadow?: ShadowKeys;
  dropShadow?: ShadowKeys;
  overflow?: "visible" | "hidden" | "scroll" | "auto";
  overflowX?: "visible" | "hidden" | "scroll" | "auto";
  overflowY?: "visible" | "hidden" | "scroll" | "auto";
  cursor?: "pointer" | "default";
  pointerEvents?: "auto" | "none";
  transform?: string;
  transition?: string;
  opacity?: number;
  snapScroll?: "none" | "x" | "y" | "block" | "inline" | "both";
  backdropBlur?: Exclude<SpacingKeys, "at">;
  children?: ReactNode;
} & ComponentProps<"div">;

const _Box = forwardRef(
  (
    {
      position,
      top,
      right,
      left,
      bottom,
      width,
      minWidth,
      maxWidth,
      height,
      minHeight,
      maxHeight,
      round,
      roundT,
      roundL,
      roundR,
      roundB,
      zIndex,
      bgColor,
      shadow,
      dropShadow,
      overflow,
      overflowX,
      overflowY,
      cursor,
      pointerEvents,
      transform,
      transition,
      opacity,
      snapScroll,
      backdropBlur,
      ...props
    }: Props,
    ref: ForwardedRef<HTMLDivElement>
  ) => {
    const borderRadius = (() => {
      if (roundL)
        return `${getSpacingCss(roundL)} 0 0 ${getSpacingCss(roundL)}`;
      if (roundB)
        return `0 0 ${getSpacingCss(roundB)} ${getSpacingCss(roundB)}`;
      if (roundR)
        return `0 ${getSpacingCss(roundR)} ${getSpacingCss(roundR)} 0`;
      if (roundT)
        return `${getSpacingCss(roundT)} ${getSpacingCss(roundT)} 0 0`;
      if (round) return getSpacingCss(round);
      return undefined;
    })();

    const style = {
      position,
      top,
      right,
      left,
      bottom,
      width,
      minWidth,
      maxWidth,
      height,
      minHeight,
      maxHeight,
      borderRadius,
      zIndex: zIndex && getZIndexCss(zIndex),
      background: bgColor && getColorCss(bgColor),
      boxShadow: shadow && getShadowCss(shadow),
      filter: dropShadow && `drop-shadow(${getShadowCss(dropShadow)})`,
      overflow: overflow ?? (snapScroll ? "auto" : undefined),
      ...(overflowX && { overflowX }),
      ...(overflowY && { overflowY }),
      cursor,
      pointerEvents,
      transform,
      transition,
      opacity,
      scrollSnapType: snapScroll,
      backdropFilter: backdropBlur && `blur(${getSpacingCss(backdropBlur)})`,
    };

    return (
      <div ref={ref} style={style} {...props}>
        {props.children}
      </div>
    );
  }
);

_Box.displayName = ComponentName.Box;

export const WizBox = _Box;
