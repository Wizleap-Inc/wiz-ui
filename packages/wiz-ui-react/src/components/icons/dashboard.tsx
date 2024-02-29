import { CSSProperties } from "react";
type Props = {
  className?: string;
  style?: CSSProperties;
};
export const WizIDashboard = ({ className, style }: Props) => (
  <svg
    className={className}
    style={style}
    xmlns="http://www.w3.org/2000/svg"
    height="1em"
    width="1em"
    viewBox="0 0 24 24"
  >
    <path d="M13.5 8.175v-3.35q0-.375.238-.6.237-.225.587-.225H19.2q.35 0 .575.225.225.225.225.6v3.35q0 .375-.237.6-.238.225-.588.225H14.3q-.35 0-.575-.225-.225-.225-.225-.6ZM4 11.2V4.8q0-.35.238-.575Q4.475 4 4.825 4H9.7q.35 0 .575.225.225.225.225.575v6.4q0 .35-.238.575-.237.225-.587.225H4.8q-.35 0-.575-.225Q4 11.55 4 11.2Zm9.5 8v-6.4q0-.35.238-.575.237-.225.587-.225H19.2q.35 0 .575.225.225.225.225.575v6.4q0 .35-.237.575-.238.225-.588.225H14.3q-.35 0-.575-.225-.225-.225-.225-.575ZM4 19.175v-3.35q0-.375.238-.6.237-.225.587-.225H9.7q.35 0 .575.225.225.225.225.6v3.35q0 .375-.238.6-.237.225-.587.225H4.8q-.35 0-.575-.225Q4 19.55 4 19.175ZM5 11h4.5V5H5Zm9.5 8H19v-6h-4.5Zm0-11H19V5h-4.5ZM5 19h4.5v-3H5Zm4.5-8Zm5-3Zm0 5Zm-5 3Z" />
  </svg>
);
WizIDashboard.displayName = "WizIDashboard";
