import { CSSProperties } from "react";
type Props = {
  className?: string;
  style?: CSSProperties;
};
export const WizICalendar = ({ className, style }: Props) => (
  <svg
    className={className}
    style={style}
    xmlns="http://www.w3.org/2000/svg"
    height="1em"
    width="1em"
    viewBox="0 0 24 24"
  >
    <path d="M12 14.15q-.3 0-.537-.225-.238-.225-.238-.55 0-.3.238-.525.237-.225.537-.225.3 0 .538.225.237.225.237.525 0 .325-.237.55-.238.225-.538.225Zm-4 0q-.3 0-.537-.225-.238-.225-.238-.55 0-.3.238-.525.237-.225.537-.225.3 0 .538.225.237.225.237.525 0 .325-.237.55-.238.225-.538.225Zm8 0q-.3 0-.537-.225-.238-.225-.238-.55 0-.3.238-.525.237-.225.537-.225.3 0 .538.225.237.225.237.525 0 .325-.237.55-.238.225-.538.225ZM12 18q-.3 0-.537-.225-.238-.225-.238-.55 0-.3.238-.537.237-.238.537-.238.3 0 .538.238.237.237.237.537 0 .325-.237.55Q12.3 18 12 18Zm-4 0q-.3 0-.537-.225-.238-.225-.238-.55 0-.3.238-.537.237-.238.537-.238.3 0 .538.238.237.237.237.537 0 .325-.237.55Q8.3 18 8 18Zm8 0q-.3 0-.537-.225-.238-.225-.238-.55 0-.3.238-.537.237-.238.537-.238.3 0 .538.238.237.237.237.537 0 .325-.237.55Q16.3 18 16 18ZM5.625 21q-.7 0-1.162-.462Q4 20.075 4 19.375V6.625q0-.7.463-1.162Q4.925 5 5.625 5h1.75V3.3q0-.225.162-.375.163-.15.388-.15t.375.15q.15.15.15.375V5h7.175V3.275q0-.225.137-.363.138-.137.363-.137.2 0 .35.137.15.138.15.363V5h1.75q.7 0 1.163.463.462.462.462 1.162v12.75q0 .7-.462 1.163-.463.462-1.163.462Zm0-1h12.75q.275 0 .45-.175t.175-.45v-8.75H5v8.75q0 .275.175.45t.45.175ZM5 9.625h14v-3q0-.275-.175-.45T18.375 6H5.625q-.275 0-.45.175T5 6.625Zm0 0V6v3.625Z" />
  </svg>
);
WizICalendar.displayName = "WizICalendar";
