import { CSSProperties } from "react";
type Props = {
  className?: string;
  style?: CSSProperties;
};
export const WizIClose = ({ className, style }: Props) => (
  <svg
    className={className}
    style={style}
    xmlns="http://www.w3.org/2000/svg"
    height="1em"
    width="1em"
    viewBox="0 0 24 24"
  >
    <path d="m12 12.7-5.25 5.25q-.125.15-.338.163-.212.012-.362-.163-.175-.15-.175-.35 0-.2.175-.35L11.3 12 6.05 6.75q-.15-.125-.162-.338-.013-.212.162-.362.15-.175.35-.175.2 0 .35.175L12 11.3l5.25-5.25q.125-.15.337-.163.213-.012.363.163.175.15.175.35 0 .2-.175.35L12.7 12l5.25 5.25q.15.125.163.337.012.213-.163.363-.15.175-.35.175-.2 0-.35-.175Z" />
  </svg>
);
