import { CSSProperties } from "react";
type Props = {
  className?: string;
  style?: CSSProperties;
};
export const WizILocationCity = ({ className, style }: Props) => (
  <svg
    className={className}
    style={style}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 -960 960 960"
    height="1em"
    width="1em"
  >
    <path d="M201.538-195.385v-436.922q0-17.616 11.962-29.578 11.961-11.961 29.577-11.961H380v-100.077q0-13.692 6.384-28.192 6.385-14.5 15.847-23.962l47.692-44.615q12.231-12.231 30.077-12.231 17.846 0 30.077 12.231l47.692 44.615q9.462 9.462 15.846 23.962 6.385 14.5 6.385 28.192v260.077h136.923q17.616 0 29.577 11.961 11.962 11.962 11.962 29.578v276.922q0 17.616-11.962 29.577-11.961 11.962-29.577 11.962H243.077q-17.616 0-29.577-11.962-11.962-11.961-11.962-29.577Zm40 1.539h120v-120h-120v120Zm0-160h120v-120h-120v120Zm0-160h120v-120h-120v120Zm178.462 320h120v-120H420v120Zm0-160h120v-120H420v120Zm0-160h120v-120H420v120Zm0-160h120v-120H420v120Zm178.462 480h120v-120h-120v120Zm0-160h120v-120h-120v120Z" />
  </svg>
);
WizILocationCity.displayName = "WizILocationCity";
