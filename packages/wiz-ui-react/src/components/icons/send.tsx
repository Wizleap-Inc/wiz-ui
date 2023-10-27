import { CSSProperties } from "react";
type Props = {
  className?: string;
  style?: CSSProperties;
};
export const WizISend = ({ className, style }: Props) => (
  <svg
    className={className}
    style={style}
    xmlns="http://www.w3.org/2000/svg"
    height="1em"
    width="1em"
    viewBox="0 0 24 24"
  >
    <path d="M4 17.3V6.7q0-.425.363-.65.362-.225.762-.075L17.65 11.25q.475.225.475.75t-.475.75L5.125 18.025q-.4.15-.762-.075Q4 17.725 4 17.3Zm1-.3 11.85-5L5 7v3.875L9.85 12 5 13.125Zm0-5V7v10Z" />
  </svg>
);
