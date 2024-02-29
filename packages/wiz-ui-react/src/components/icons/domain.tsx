import { CSSProperties } from "react";
type Props = {
  className?: string;
  style?: CSSProperties;
};
export const WizIDomain = ({ className, style }: Props) => (
  <svg
    className={className}
    style={style}
    xmlns="http://www.w3.org/2000/svg"
    height="1em"
    viewBox="0 -960 960 960"
    width="1em"
  >
    <path d="M109.231-195.385v-596.922q0-17.616 11.961-29.578 11.962-11.961 29.577-11.961h276.923q17.616 0 29.577 11.961 11.962 11.962 11.962 29.578v118.461h340q17.615 0 29.577 11.961 11.961 11.962 11.961 29.578v436.922q0 17.616-11.961 29.577-11.962 11.962-29.577 11.962H150.769q-17.615 0-29.577-11.962-11.961-11.961-11.961-29.577Zm40 1.539h120v-120h-120v120Zm0-160h120v-120h-120v120Zm0-160h120v-120h-120v120Zm0-160h120v-120h-120v120Zm160 480h120v-120h-120v120Zm0-160h120v-120h-120v120Zm0-160h120v-120h-120v120Zm0-160h120v-120h-120v120Zm160 480h341.538v-440H469.231v120h95.384v40h-95.384v120h95.384v40h-95.384v120Zm190.769-280v-40h40v40h-40Zm0 160v-40h40v40h-40Z" />
  </svg>
);
WizIDomain.displayName = "WizIDomain";
