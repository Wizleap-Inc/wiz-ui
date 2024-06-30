import { CSSProperties } from "react";
type Props = {
  className?: string;
  style?: CSSProperties;
};
export const WizIMail = ({ className, style }: Props) => (
  <svg
    className={className}
    style={style}
    xmlns="http://www.w3.org/2000/svg"
    height="1em"
    viewBox="0 -960 960 960"
    width="1em"
  >
    <path d="M184.62-200q-27.62 0-46.12-18.5Q120-237 120-264.62v-430.76q0-27.62 18.5-46.12Q157-760 184.62-760h590.76q27.62 0 46.12 18.5Q840-723 840-695.38v430.76q0 27.62-18.5 46.12Q803-200 775.38-200H184.62ZM800-684.62 497.92-486.85q-4.23 2.23-8.57 3.73-4.35 1.5-9.35 1.5t-9.35-1.5q-4.34-1.5-8.57-3.73L160-684.62v420q0 10.77 6.92 17.7 6.93 6.92 17.7 6.92h590.76q10.77 0 17.7-6.92 6.92-6.93 6.92-17.7v-420ZM480-520l307.69-200H172.31L480-520ZM160-684.62v8.47-32.47 1.39V-720v12.77-2.04 33.12-8.47V-240v-444.62Z" />
  </svg>
);
WizIMail.displayName = "WizIMail";
