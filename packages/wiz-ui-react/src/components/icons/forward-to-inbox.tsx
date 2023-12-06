import { CSSProperties } from "react";
type Props = {
  className?: string;
  style?: CSSProperties;
};
export const WizIForwardToInbox = ({ className, style }: Props) => (
  <svg
    className={className}
    style={style}
    xmlns="http://www.w3.org/2000/svg"
    height="1em"
    viewBox="0 -960 960 960"
    width="1em"
  >
    <path d="M800-720H160v455.385q0 10.769 6.923 17.692T184.615-240H540v40H184.615Q157-200 138.5-218.5 120-237 120-264.615v-430.77Q120-723 138.5-741.5 157-760 184.615-760h590.77Q803-760 821.5-741.5 840-723 840-695.385V-420h-40v-300Zm-640 0v480-180 6.846V-720Zm320 200 320-200v35.385L497.154-494.538q-8.462 5.231-17.154 5.231t-17.154-5.231L160-678.461V-720l320 200Zm319.307 320H624.615q-8.538 0-14.269-5.731-5.731-5.73-5.731-14.269 0-8.538 5.731-14.269T624.615-240h175.462l-69.846-69.846q-5.846-5.846-6.116-14.154-.269-8.308 6.347-14.154 5.846-5.615 14.153-5.346 8.308.269 14.154 6.115l94.77 94.77q9.692 9.692 9.692 22.615 0 12.923-9.692 22.616L758-101.846q-5.615 5.615-13.654 5.346-8.038-.269-13.884-6.115-5.616-5.616-5.616-13.385t5.616-13.385L799.307-200Z" />
  </svg>
);