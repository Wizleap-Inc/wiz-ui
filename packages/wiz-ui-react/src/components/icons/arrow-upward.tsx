import { CSSProperties } from "react";
type Props = {
  className?: string;
  style?: CSSProperties;
};
export const WizIArrowUpward = ({ className, style }: Props) => (
  <svg
    className={className}
    style={style}
    xmlns="http://www.w3.org/2000/svg"
    height="1em"
    viewBox="0 -960 960 960"
    width="1em"
  >
    <path d="M460-683.15 242.46-465.62q-5.84 5.85-13.77 6.12-7.92.27-14.54-6.35-6.38-6.61-6.5-14.15-.11-7.54 6.5-14.15l243.23-243.23q5.24-5.24 10.7-7.35 5.46-2.12 11.92-2.12t11.92 2.12q5.46 2.11 10.7 7.35l243.23 243.23q5.61 5.61 6 13.65.38 8.04-6 14.65-6.62 6.62-14.27 6.62-7.66 0-14.27-6.62L500-683.15V-220q0 8.54-5.73 14.27T480-200q-8.54 0-14.27-5.73T460-220v-463.15Z" />
  </svg>
);
WizIArrowUpward.displayName = "WizIArrowUpward";
