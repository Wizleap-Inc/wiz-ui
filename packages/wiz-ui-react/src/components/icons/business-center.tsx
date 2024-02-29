import { CSSProperties } from "react";
type Props = {
  className?: string;
  style?: CSSProperties;
};
export const WizIBusinessCenter = ({ className, style }: Props) => (
  <svg
    className={className}
    style={style}
    xmlns="http://www.w3.org/2000/svg"
    height="1em"
    width="1em"
    viewBox="0 0 24 24"
  >
    <path d="M9 7V5.625q0-.7.463-1.162Q9.925 4 10.625 4h2.75q.7 0 1.163.463.462.462.462 1.162V7h4.375q.7 0 1.163.463.462.462.462 1.162v9.75q0 .7-.462 1.163-.463.462-1.163.462H4.625q-.7 0-1.162-.462Q3 19.075 3 18.375v-9.75q0-.7.463-1.162Q3.925 7 4.625 7Zm1 0h4V5.625q0-.25-.188-.437Q13.625 5 13.375 5h-2.75q-.25 0-.437.188-.188.187-.188.437Zm10 7.5h-6v.7q0 .35-.225.575Q13.55 16 13.2 16h-2.4q-.35 0-.575-.225Q10 15.55 10 15.2v-.7H4v3.875q0 .25.188.437.187.188.437.188h14.75q.25 0 .437-.188.188-.187.188-.437Zm-9 .5h2v-2h-2Zm-7-1.5h6v-.7q0-.35.225-.575Q10.45 12 10.8 12h2.4q.35 0 .575.225.225.225.225.575v.7h6V8.625q0-.25-.188-.437Q19.625 8 19.375 8H4.625q-.25 0-.437.188Q4 8.375 4 8.625Zm8 .5Z" />
  </svg>
);
WizIBusinessCenter.displayName = "WizIBusinessCenter";
