import { CSSProperties } from "react";
type Props = {
  className?: string;
  style?: CSSProperties;
};
export const WizIDownload = ({ className, style }: Props) => (
  <svg
    className={className}
    style={style}
    xmlns="http://www.w3.org/2000/svg"
    height="1em"
    width="1em"
    viewBox="0 0 24 24"
  >
    <path d="M12 14.9q-.15 0-.287-.05-.138-.05-.288-.175l-2.6-2.625q-.15-.15-.162-.35-.013-.2.162-.35.15-.175.35-.175.2 0 .35.15L11.5 13.3V5.15q0-.2.137-.35.138-.15.363-.15.225 0 .363.15.137.15.137.35v8.15l1.975-1.975q.125-.125.337-.137.213-.013.363.162.175.15.175.338 0 .187-.175.362l-2.6 2.625q-.15.125-.287.175-.138.05-.288.05ZM6.625 19q-.7 0-1.162-.462Q5 18.075 5 17.375V15.5q0-.225.138-.363Q5.275 15 5.5 15q.225 0 .363.137.137.138.137.363v1.875q0 .25.188.437.187.188.437.188h10.75q.25 0 .437-.188.188-.187.188-.437V15.5q0-.225.138-.363.137-.137.362-.137.225 0 .363.137.137.138.137.363v1.875q0 .7-.462 1.163-.463.462-1.163.462Z" />
  </svg>
);
WizIDownload.displayName = "WizIDownload";
