import { CSSProperties } from "react";
type Props = {
  className?: string;
  style?: CSSProperties;
};
export const WizIImage = ({ className, style }: Props) => (
  <svg
    className={className}
    style={style}
    xmlns="http://www.w3.org/2000/svg"
    height="1em"
    viewBox="0 -960 960 960"
    width="1em"
  >
    <path d="M224.62-160q-27.62 0-46.12-18.5Q160-197 160-224.62v-510.76q0-27.62 18.5-46.12Q197-800 224.62-800h510.76q27.62 0 46.12 18.5Q800-763 800-735.38v510.76q0 27.62-18.5 46.12Q763-160 735.38-160H224.62Zm0-40h510.76q9.24 0 16.93-7.69 7.69-7.69 7.69-16.93v-510.76q0-9.24-7.69-16.93-7.69-7.69-16.93-7.69H224.62q-9.24 0-16.93 7.69-7.69 7.69-7.69 16.93v510.76q0 9.24 7.69 16.93 7.69 7.69 16.93 7.69ZM200-200v-560 560Zm132.31-100h301.54q9.69 0 14.15-8.69 4.46-8.69-1.23-17.16L566-434.38q-5.23-6.47-12.92-6.47-7.7 0-12.93 6.47l-91.69 115.92-57.08-69q-5.23-5.69-12.53-5.69-7.31 0-12.54 6.46l-46.16 60.84q-6.46 8.47-2 17.16 4.47 8.69 14.16 8.69Z" />
  </svg>
);
WizIImage.displayName = "WizIImage";
