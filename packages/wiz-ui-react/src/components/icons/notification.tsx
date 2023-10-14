import { CSSProperties } from "react";
type Props = {
  className?: string;
  style?: CSSProperties;
};
export const WizINotification = ({ className, style }: Props) => (
  <svg
    className={className}
    style={style}
    xmlns="http://www.w3.org/2000/svg"
    height="1em"
    width="1em"
    viewBox="0 0 24 24"
  >
    <path d="M5 18.725q-.225 0-.362-.138-.138-.137-.138-.362 0-.2.138-.35.137-.15.362-.15h1.5v-7.5Q6.5 8.3 7.75 6.75T11 4.825v-.7q0-.45.288-.725.287-.275.712-.275t.713.275q.287.275.287.725v.7q2 .375 3.25 1.925t1.25 3.475v7.5H19q.225 0 .363.15.137.15.137.35 0 .225-.137.362-.138.138-.363.138Zm7-7Zm0 9.9q-.65 0-1.137-.462-.488-.463-.488-1.163h3.25q0 .7-.462 1.163-.463.462-1.163.462Zm-4.5-3.9h9v-7.5q0-1.85-1.325-3.175Q13.85 5.725 12 5.725q-1.85 0-3.175 1.325Q7.5 8.375 7.5 10.225Z" />
  </svg>
);
