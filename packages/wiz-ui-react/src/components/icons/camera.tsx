import { CSSProperties } from "react";
type Props = {
  className?: string;
  style?: CSSProperties;
};
export const WizICamera = ({ className, style }: Props) => (
  <svg
    className={className}
    style={style}
    xmlns="http://www.w3.org/2000/svg"
    height="1em"
    width="1em"
    viewBox="0 0 24 24"
  >
    <path d="M12 16.725q1.575 0 2.65-1.075T15.725 13q0-1.575-1.075-2.65T12 9.275q-1.575 0-2.65 1.075T8.275 13q0 1.575 1.075 2.65T12 16.725ZM4.625 20q-.7 0-1.162-.462Q3 19.075 3 18.375V7.625q0-.7.463-1.162Q3.925 6 4.625 6h2.95L8.95 4.525q.225-.25.525-.388.3-.137.65-.137h3.75q.35 0 .65.137.3.138.525.388L16.425 6h2.95q.7 0 1.163.463.462.462.462 1.162v10.75q0 .7-.462 1.163-.463.462-1.163.462Zm14.75-1q.275 0 .45-.175t.175-.45V7.625q0-.275-.175-.45T19.375 7H4.625q-.275 0-.45.175T4 7.625v10.75q0 .275.175.45t.45.175ZM12 13Z" />
  </svg>
);
