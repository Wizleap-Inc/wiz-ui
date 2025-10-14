import { CSSProperties } from "react";
type Props = {
  className?: string;
  style?: CSSProperties;
};
export const WizIAssignmentBold = ({ className, style }: Props) => (
  <svg
    className={className}
    style={style}
    xmlns="http://www.w3.org/2000/svg"
    height="1em"
    viewBox="0 -960 960 960"
    width="1em"
  >
    <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h168q13-36 43.5-58t68.5-22q38 0 68.5 22t43.5 58h168q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-560H200v560Zm80-120h280q17 0 28.5-11.5T600-360q0-17-11.5-28.5T560-400H280q-17 0-28.5 11.5T240-360q0 17 11.5 28.5T280-320Zm0-160h400q17 0 28.5-11.5T720-520q0-17-11.5-28.5T680-560H280q-17 0-28.5 11.5T240-520q0 17 11.5 28.5T280-480Zm0-160h400q17 0 28.5-11.5T720-680q0-17-11.5-28.5T680-720H280q-17 0-28.5 11.5T240-680q0 17 11.5 28.5T280-640Zm200-120q13 0 21.5-8.5T510-790q0-13-8.5-21.5T480-820q-13 0-21.5 8.5T450-790q0 13 8.5 21.5T480-760ZM200-200v-560 560Z" />
  </svg>
);
WizIAssignmentBold.displayName = "WizIAssignmentBold";
