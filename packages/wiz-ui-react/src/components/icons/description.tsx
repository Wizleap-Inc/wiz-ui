import { CSSProperties } from "react";
type Props = {
  className?: string;
  style?: CSSProperties;
};
export const WizIDescription = ({ className, style }: Props) => (
  <svg
    className={className}
    style={style}
    xmlns="http://www.w3.org/2000/svg"
    height="1em"
    width="1em"
    viewBox="0 0 24 24"
  >
    <path d="M9 17.5h6q.225 0 .363-.15.137-.15.137-.35 0-.225-.137-.363-.138-.137-.363-.137H9q-.225 0-.363.15-.137.15-.137.35 0 .225.137.363.138.137.363.137Zm0-4h6q.225 0 .363-.15.137-.15.137-.35 0-.225-.137-.363-.138-.137-.363-.137H9q-.225 0-.363.15-.137.15-.137.35 0 .225.137.363.138.137.363.137ZM6.625 21q-.7 0-1.162-.462Q5 20.075 5 19.375V4.625q0-.7.463-1.163Q5.925 3 6.625 3h7.2q.325 0 .625.125t.525.35l3.55 3.55q.225.225.35.525.125.3.125.625v11.2q0 .7-.462 1.163-.463.462-1.163.462ZM14 7.2V4H6.625q-.25 0-.437.188Q6 4.375 6 4.625v14.75q0 .25.188.437.187.188.437.188h10.75q.25 0 .437-.188.188-.187.188-.437V8h-3.2q-.35 0-.575-.225Q14 7.55 14 7.2ZM6 4v4-4 16V4Z" />
  </svg>
);
WizIDescription.displayName = "WizIDescription";
