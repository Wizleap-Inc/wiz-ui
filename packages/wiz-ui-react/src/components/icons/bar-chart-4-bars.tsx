import { CSSProperties } from "react";
type Props = {
  className?: string;
  style?: CSSProperties;
};
export const WizIBarChart4Bars = ({ className, style }: Props) => (
  <svg
    className={className}
    style={style}
    xmlns="http://www.w3.org/2000/svg"
    height="1em"
    viewBox="0 -960 960 960"
    width="1em"
  >
    <path d="M140-160q-8.5 0-14.25-5.758-5.75-5.757-5.75-14.269 0-8.511 5.75-14.242Q131.5-200 140-200h680q8.5 0 14.25 5.758t5.75 14.269q0 8.512-5.75 14.242Q828.5-160 820-160H140Zm60.09-110.769q-16.629 0-28.359-11.667Q160-294.102 160-310.769V-440q0-16.667 11.64-28.334Q183.28-480 199.909-480q16.629 0 28.36 11.666Q240-456.667 240-440v129.231q0 16.667-11.64 28.333-11.641 11.667-28.27 11.667Zm186.154 0q-16.629 0-28.36-11.667-11.73-11.666-11.73-28.333V-640q0-16.667 11.64-28.334Q369.434-680 386.063-680q16.629 0 28.36 11.666 11.731 11.667 11.731 28.334v329.231q0 16.667-11.64 28.333-11.641 11.667-28.27 11.667Zm186.923 0q-16.629 0-28.359-11.667-11.731-11.666-11.731-28.333V-520q0-16.667 11.64-28.334Q556.357-560 572.986-560q16.629 0 28.36 11.666 11.731 11.667 11.731 28.334v209.231q0 16.667-11.64 28.333-11.641 11.667-28.27 11.667Zm186.924 0q-16.629 0-28.36-11.667Q720-294.102 720-310.769V-760q0-16.667 11.64-28.334Q743.281-800 759.91-800q16.629 0 28.359 11.666Q800-776.667 800-760v449.231q0 16.667-11.64 28.333-11.64 11.667-28.269 11.667Z" />
  </svg>
);