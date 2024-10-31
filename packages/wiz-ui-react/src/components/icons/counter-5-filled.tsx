import { CSSProperties } from "react";
type Props = {
  className?: string;
  style?: CSSProperties;
};
export const WizICounter5Filled = ({ className, style }: Props) => (
  <svg
    className={className}
    style={style}
    xmlns="http://www.w3.org/2000/svg"
    height="1em"
    viewBox="0 -960 960 960"
    width="1em"
  >
    <path d="M480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm-80-200h120q33 0 56.5-23.5T600-360v-80q0-33-23.5-56.5T520-520h-80v-80h120q17 0 28.5-11.5T600-640q0-17-11.5-28.5T560-680H400q-17 0-28.5 11.5T360-640v160q0 17 11.5 28.5T400-440h120v80H400q-17 0-28.5 11.5T360-320q0 17 11.5 28.5T400-280Z" />
  </svg>
);
WizICounter5Filled.displayName = "WizICounter5Filled";
