import { CSSProperties } from "react";
type Props = {
  className?: string;
  style?: CSSProperties;
};
export const WizIArrowDropUp = ({ className, style }: Props) => (
  <svg
    className={className}
    style={style}
    xmlns="http://www.w3.org/2000/svg"
    height="1em"
    width="1em"
    viewBox="0 96 960 960"
  >
    <path d="M406.231 636q-21.616 0-29.808-19.885-8.192-19.884 6.961-35.038l74.77-74.769q5.231-5.231 10.692-7.462 5.462-2.231 11.923-2.231 6.462 0 11.923 2.231 5.462 2.231 10.693 7.462l74.769 74.769q15.154 15.154 6.962 35.038Q576.923 636 555.308 636H406.231Z" />
  </svg>
);
WizIArrowDropUp.displayName = "WizIArrowDropUp";
