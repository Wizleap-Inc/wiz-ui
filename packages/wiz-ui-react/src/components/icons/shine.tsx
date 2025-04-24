import { CSSProperties } from "react";
type Props = {
  className?: string;
  style?: CSSProperties;
};
export const WizIShine = ({ className, style }: Props) => (
  <svg
    className={className}
    style={style}
    width="1em"
    height="1em"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M19 9L20.25 6.25L23 5L20.25 3.75L19 1L17.75 3.75L15 5L17.75 6.25L19 9Z" />
    <path d="M19 15L17.75 17.75L15 19L17.75 20.25L19 23L20.25 20.25L23 19L20.25 17.75L19 15Z" />
    <path d="M11.5 9.5L9 4L6.5 9.5L1 12L6.5 14.5L9 20L11.5 14.5L17 12L11.5 9.5ZM9.99 12.99L9 15.17L8.01 12.99L5.83 12L8.01 11.01L9 8.83L9.99 11.01L12.17 12L9.99 12.99Z" />
  </svg>
);
WizIShine.displayName = "WizIShine";
