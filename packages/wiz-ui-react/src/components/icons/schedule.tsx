import { CSSProperties } from "react";
type Props = {
  className?: string;
  style?: CSSProperties;
};
export const WizISchedule = ({ className, style }: Props) => (
  <svg
    className={className}
    style={style}
    width="1em"
    height="1em"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M15.325 16.025q.125.15.313.15.187 0 .362-.175.15-.15.15-.35 0-.2-.15-.35l-3.5-3.5V7.475q0-.2-.15-.338Q12.2 7 12 7q-.225 0-.363.15-.137.15-.137.35v4.375q0 .15.05.3t.2.275ZM12 21q-1.875 0-3.512-.712-1.638-.713-2.85-1.926-1.213-1.212-1.926-2.85Q3 13.875 3 12t.712-3.513q.713-1.637 1.926-2.85 1.212-1.212 2.85-1.925Q10.125 3 12 3t3.513.712q1.637.713 2.85 1.925 1.212 1.213 1.925 2.85Q21 10.125 21 12t-.712 3.512q-.713 1.638-1.925 2.85-1.213 1.213-2.85 1.926Q13.875 21 12 21Zm0-9Zm0 8q3.325 0 5.663-2.337Q20 15.325 20 12t-2.337-5.663Q15.325 4 12 4T6.338 6.337Q4 8.675 4 12t2.338 5.663Q8.675 20 12 20Z" />
  </svg>
);
WizISchedule.displayName = "WizISchedule";
