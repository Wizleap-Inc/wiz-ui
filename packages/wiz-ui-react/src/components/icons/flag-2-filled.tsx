import { CSSProperties } from "react";
type Props = {
  className?: string;
  style?: CSSProperties;
};
export const WizIFlag2Filled = ({ className, style }: Props) => (
  <svg
    className={className}
    style={style}
    xmlns="http://www.w3.org/2000/svg"
    height="1em"
    viewBox="0 -960 960 960"
    width="1em"
  >
    <path d="M200-80v-760h640l-80 200 80 200H280v360h-80Z" />
  </svg>
);
WizIFlag2Filled.displayName = "WizIFlag2Filled";
