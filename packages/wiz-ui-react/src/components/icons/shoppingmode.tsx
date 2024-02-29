import { CSSProperties } from "react";
type Props = {
  className?: string;
  style?: CSSProperties;
};
export const WizIShoppingmode = ({ className, style }: Props) => (
  <svg
    className={className}
    style={style}
    xmlns="http://www.w3.org/2000/svg"
    height="1em"
    viewBox="0 -960 960 960"
    width="1em"
  >
    <path d="M474.539-131.692Q462.846-120 446-120q-16.846 0-28.539-11.692l-286-286Q120-429.154 120.384-446.5q.385-17.346 12.616-29.577l352-352.231q5.634-5.359 13.317-8.526Q506-840 513.769-840h286q16.077 0 28.039 11.961 11.961 11.962 11.961 28.039v286q0 8.653-3.423 16.288t-9.807 14.02l-352 352ZM699.679-660q16.629 0 28.36-11.64 11.73-11.641 11.73-28.269 0-16.63-11.64-28.36Q716.489-740 699.86-740q-16.629 0-28.36 11.64-11.731 11.641-11.731 28.269 0 16.63 11.64 28.36Q683.05-660 699.679-660ZM446.344-160l353.425-354v-286H513.425L160-446l286.344 286Zm353.425-640Z" />
  </svg>
);
WizIShoppingmode.displayName = "WizIShoppingmode";
