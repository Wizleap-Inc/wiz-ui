import { CSSProperties } from "react";
type Props = {
  className?: string;
  style?: CSSProperties;
};
export const WizIExpandLess = ({ className, style }: Props) => (
  <svg
    className={className}
    style={style}
    xmlns="http://www.w3.org/2000/svg"
    height="1em"
    width="1em"
    viewBox="0 0 24 24"
  >
    <path d="M7.05 14.35q-.175-.15-.175-.35 0-.2.175-.35l4.375-4.4q.15-.125.288-.175.137-.05.287-.05.15 0 .288.05.137.05.287.175l4.4 4.425q.15.125.15.312 0 .188-.175.363-.15.15-.35.15-.2 0-.35-.15L12 10.1l-4.275 4.275q-.125.15-.325.15t-.35-.175Z" />
  </svg>
);
