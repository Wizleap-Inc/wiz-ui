import { CSSProperties } from "react";
type Props = {
  className?: string;
  style?: CSSProperties;
};
export const WizIEditNote = ({ className, style }: Props) => (
  <svg
    className={className}
    style={style}
    xmlns="http://www.w3.org/2000/svg"
    height="1em"
    width="1em"
    viewBox="0 0 24 24"
  >
    <path d="M12.5 20.5v-1.425l5.15-5.15 1.425 1.425-5.15 5.15Zm-9-5v-1h7v1Zm16.275-.85-1.425-1.425.725-.725q.15-.175.35-.175.2 0 .35.175l.725.725q.175.15.175.35 0 .2-.175.35ZM3.5 11.5v-1h11v1Zm0-4v-1h11v1Z" />
  </svg>
);
WizIEditNote.displayName = "WizIEditNote";
