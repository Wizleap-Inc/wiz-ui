import { CSSProperties } from "react";
type Props = {
  className?: string;
  style?: CSSProperties;
};
export const WizILogin = ({ className, style }: Props) => (
  <svg
    className={className}
    style={style}
    xmlns="http://www.w3.org/2000/svg"
    height="1em"
    viewBox="0 -960 960 960"
    width="1em"
  >
    <path d="M499.231-160q-8.539 0-14.269-5.731-5.731-5.73-5.731-14.269 0-8.538 5.731-14.269 5.73-5.731 14.269-5.731h236.154q9.23 0 16.923-7.692Q760-215.385 760-224.615v-510.77q0-9.23-7.692-16.923Q744.615-760 735.385-760H499.231q-8.539 0-14.269-5.731-5.731-5.731-5.731-14.269 0-8.539 5.731-14.269 5.73-5.731 14.269-5.731h236.154Q763-800 781.5-781.5 800-763 800-735.385v510.77Q800-197 781.5-178.5 763-160 735.385-160H499.231Zm16.23-300H180q-8.539 0-14.269-5.731Q160-471.461 160-480t5.731-14.269Q171.461-500 180-500h335.461l-78.846-78.846q-5.615-5.616-6-13.539-.385-7.923 6-14.538 6.385-6.616 14.154-6.731 7.769-.116 14.385 6.5l104.538 104.539q9.693 9.692 9.693 22.615 0 12.923-9.693 22.615L465.154-352.846q-5.847 5.846-13.885 6.116-8.039.269-14.654-6.347-6.385-6.615-6.269-14.269.115-7.654 6.5-14.039L515.461-460Z" />
  </svg>
);
WizILogin.displayName = "WizILogin";
