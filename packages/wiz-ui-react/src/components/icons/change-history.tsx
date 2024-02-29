import { CSSProperties } from "react";
type Props = {
  className?: string;
  style?: CSSProperties;
};
export const WizIChangeHistory = ({ className, style }: Props) => (
  <svg
    className={className}
    style={style}
    xmlns="http://www.w3.org/2000/svg"
    height="1em"
    width="1em"
    viewBox="0 0 24 24"
  >
    <path d="M5.25 19q-.475 0-.7-.413-.225-.412.025-.812l6.75-10.8q.25-.375.675-.375.425 0 .675.375l6.75 10.8q.25.4.025.812-.225.413-.7.413Z" />
  </svg>
);
WizIChangeHistory.displayName = "WizIChangeHistory";
