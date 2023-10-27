import { CSSProperties } from "react";
type Props = {
  className?: string;
  style?: CSSProperties;
};
export const WizIAddCircle = ({ className, style }: Props) => (
  <svg
    className={className}
    style={style}
    xmlns="http://www.w3.org/2000/svg"
    height="1em"
    width="1em"
    viewBox="0 96 960 960"
  >
    <path d="M480.027 756q8.512 0 14.242-5.75Q500 744.5 500 736V596h141q7.769 0 13.385-5.758Q660 584.484 660 575.973q0-8.512-5.75-14.242Q648.5 556 640 556H500V415q0-7.769-5.758-13.385Q488.485 396 479.973 396t-14.242 5.75Q460 407.5 460 416v140H319q-7.769 0-13.385 5.758Q300 567.516 300 576.027q0 8.512 5.75 14.242Q311.5 596 320 596h140v141q0 7.769 5.758 13.385Q471.515 756 480.027 756ZM480 936q-75.308 0-141-28.038-65.692-28.039-114.308-76.654Q176.077 782.692 148.038 717 120 651.308 120 576t28.038-141q28.039-65.692 76.654-114.308Q273.308 272.077 339 244.038 404.692 216 480 216t141 28.038q65.692 28.039 114.308 76.654Q783.923 369.308 811.962 435 840 500.692 840 576t-28.038 141q-28.039 65.692-76.654 114.308Q686.692 879.923 621 907.962 555.308 936 480 936Zm0-360Zm0 320q133 0 226.5-93.5T800 576q0-133-93.5-226.5T480 256q-133 0-226.5 93.5T160 576q0 133 93.5 226.5T480 896Z" />
  </svg>
);
