import { CSSProperties } from "react";
type Props = {
  className?: string;
  style?: CSSProperties;
};
export const WizIMenu = ({ className, style }: Props) => (
  <svg
    className={className}
    style={style}
    xmlns="http://www.w3.org/2000/svg"
    height="1em"
    width="1em"
    viewBox="0 0 24 24"
  >
    <path d="M4 17.275q-.225 0-.362-.15-.138-.15-.138-.35 0-.225.138-.362.137-.138.362-.138h16q.225 0 .363.138.137.137.137.362 0 .2-.137.35-.138.15-.363.15ZM4 12.5q-.225 0-.362-.15Q3.5 12.2 3.5 12q0-.225.138-.363.137-.137.362-.137h16q.225 0 .363.15.137.15.137.35 0 .225-.137.363-.138.137-.363.137Zm0-4.775q-.225 0-.362-.138Q3.5 7.45 3.5 7.225q0-.2.138-.35.137-.15.362-.15h16q.225 0 .363.15.137.15.137.35 0 .225-.137.362-.138.138-.363.138Z" />
  </svg>
);
WizIMenu.displayName = "WizIMenu";
