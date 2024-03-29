import { CSSProperties } from "react";
type Props = {
  className?: string;
  style?: CSSProperties;
};
export const WizIContentCopy = ({ className, style }: Props) => (
  <svg
    className={className}
    style={style}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    height="1em"
    width="1em"
  >
    <path d="M9.55 17.625q-.7 0-1.187-.462Q7.875 16.7 7.875 16V5.225q0-.675.488-1.138.487-.462 1.187-.462h7.725q.675 0 1.138.462.462.463.462 1.138V16q0 .675-.462 1.15-.463.475-1.138.475Zm0-1h7.725q.275 0 .437-.175.163-.175.163-.45V5.225q0-.275-.163-.438-.162-.162-.437-.162H9.55q-.275 0-.475.162-.2.163-.2.438V16q0 .275.2.45t.475.175Zm-3.05 4q-.675 0-1.15-.475-.475-.475-.475-1.15V8.125q0-.225.15-.363.15-.137.35-.137.225 0 .363.137.137.138.137.363V19q0 .225.2.425.2.2.425.2h7.875q.225 0 .363.137.137.138.137.363 0 .2-.137.35-.138.15-.363.15Zm2.375-16v12V4.625Z" />
  </svg>
);
WizIContentCopy.displayName = "WizIContentCopy";
