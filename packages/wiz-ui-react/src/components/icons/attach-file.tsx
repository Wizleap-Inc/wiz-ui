import { CSSProperties } from "react";
type Props = {
  className?: string;
  style?: CSSProperties;
};
export const WizIAttachFile = ({ className, style }: Props) => (
  <svg
    className={className}
    style={style}
    xmlns="http://www.w3.org/2000/svg"
    height="1em"
    width="1em"
    viewBox="0 0 24 24"
  >
    <path d="M11.5 21.775q-2.1 0-3.575-1.475T6.45 16.725v-11.1q0-1.525 1.075-2.6Q8.6 1.95 10.125 1.95q1.5 0 2.575 1.075 1.075 1.075 1.075 2.6v10q0 .95-.662 1.6-.663.65-1.613.65t-1.613-.65q-.662-.65-.662-1.6V6.05q0-.175.125-.3t.325-.125q.2 0 .325.125t.125.3v9.575q0 .575.387.975.388.4.988.4t.988-.4q.387-.4.387-.975v-10q0-1.175-.8-1.975t-1.95-.8q-1.175 0-1.975.8t-.8 1.975v11.1q0 1.725 1.212 2.938 1.213 1.212 2.938 1.212t2.938-1.212q1.212-1.213 1.212-2.938V6.05q0-.175.125-.3t.325-.125q.175 0 .313.125.137.125.137.3v10.675q0 2.1-1.475 3.575T11.5 21.775Z" />
  </svg>
);
WizIAttachFile.displayName = "WizIAttachFile";
