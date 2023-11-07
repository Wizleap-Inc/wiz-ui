import { CSSProperties } from "react";
type Props = {
  className?: string;
  style?: CSSProperties;
};
export const WizITab = ({ className, style }: Props) => (
  <svg
    className={className}
    style={style}
    xmlns="http://www.w3.org/2000/svg"
    height="1em"
    width="1em"
    viewBox="0 0 24 24"
  >
    <path d="M4.625 19q-.7 0-1.162-.462Q3 18.075 3 17.375V6.625q0-.7.463-1.162Q3.925 5 4.625 5h14.75q.7 0 1.163.463.462.462.462 1.162v10.75q0 .7-.462 1.163-.463.462-1.163.462ZM13 8.375V6H4.625q-.275 0-.45.175T4 6.625v10.75q0 .275.175.45t.45.175h14.75q.275 0 .45-.175t.175-.45V10h-5.375q-.675 0-1.15-.475Q13 9.05 13 8.375Zm-9 9V6h.625q-.275 0-.45.175T4 6.625v10.75q0 .275.175.45t.45.175H4v-.625Z" />
  </svg>
);
