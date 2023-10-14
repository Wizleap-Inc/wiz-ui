import { CSSProperties } from "react";
type Props = {
  className?: string;
  style?: CSSProperties;
};
export const WizIHome = ({ className, style }: Props) => (
  <svg
    className={className}
    style={style}
    xmlns="http://www.w3.org/2000/svg"
    height="1em"
    width="1em"
    viewBox="0 0 24 24"
  >
    <path d="M6 19h3.7v-5.875h4.6V19H18v-9l-6-4.55L6 10Zm0 1q-.4 0-.7-.3-.3-.3-.3-.7v-9q0-.225.1-.438.1-.212.3-.362l6-4.525q.125-.1.275-.15.15-.05.325-.05.175 0 .325.05.15.05.275.15l6 4.525q.2.15.3.362.1.213.1.438v9q0 .4-.3.7-.3.3-.7.3h-4.7v-5.875h-2.6V20Zm6-7.775Z" />
  </svg>
);
