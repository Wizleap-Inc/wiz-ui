import { CSSProperties } from "react";
type Props = {
  className?: string;
  style?: CSSProperties;
};
export const WizIChevronRight = ({ className, style }: Props) => (
  <svg
    className={className}
    style={style}
    xmlns="http://www.w3.org/2000/svg"
    height="1em"
    width="1em"
    viewBox="0 0 24 24"
  >
    <path d="M9.05 16.95q-.175-.15-.175-.35 0-.2.175-.35L13.3 12 9.05 7.75q-.175-.15-.175-.35 0-.2.175-.35.15-.175.35-.175.2 0 .35.175l4.4 4.375q.125.15.175.287.05.138.05.288 0 .15-.05.287-.05.138-.175.288l-4.4 4.375q-.15.175-.35.175-.2 0-.35-.175Z" />
  </svg>
);
