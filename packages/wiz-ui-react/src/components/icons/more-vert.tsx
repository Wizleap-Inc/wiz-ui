import { CSSProperties } from "react";
type Props = {
  className?: string;
  style?: CSSProperties;
};
export const WizIMoreVert = ({ className, style }: Props) => (
  <svg
    className={className}
    style={style}
    xmlns="http://www.w3.org/2000/svg"
    height="1em"
    width="1em"
    viewBox="0 0 24 24"
  >
    <path d="M12 18.55q-.425 0-.712-.3-.288-.3-.288-.7 0-.425.288-.713.287-.287.712-.287t.713.287q.287.288.287.713 0 .4-.287.7-.288.3-.713.3ZM12 13q-.425 0-.712-.288Q11 12.425 11 12t.288-.713Q11.575 11 12 11t.713.287Q13 11.575 13 12t-.287.712Q12.425 13 12 13Zm0-5.55q-.425 0-.712-.288Q11 6.875 11 6.45q0-.4.288-.7.287-.3.712-.3t.713.3q.287.3.287.7 0 .425-.287.712-.288.288-.713.288Z" />
  </svg>
);
