import { CSSProperties } from "react";
type Props = {
  className?: string;
  style?: CSSProperties;
};
export const WizIArrowDropDown = ({ className, style }: Props) => (
  <svg
    className={className}
    style={style}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 96 960 960"
    height="1em"
    width="1em"
  >
    <path d="m458.154 645.692-74.77-74.769q-15.153-15.154-6.961-35.038Q384.615 516 406.231 516h149.077q21.615 0 29.808 19.885 8.192 19.884-6.962 35.038l-74.769 74.769q-5.231 5.231-10.693 7.462-5.461 2.231-11.923 2.231-6.461 0-11.923-2.231-5.461-2.231-10.692-7.462Z" />
  </svg>
);
