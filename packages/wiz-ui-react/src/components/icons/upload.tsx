type Props = {
  className?: string;
};
export const WizIUpload = ({ className }: Props) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    height="1em"
    width="1em"
    viewBox="0 0 24 24"
  >
    <path d="M12 15.225q-.225 0-.363-.138-.137-.137-.137-.362v-8.15L9.525 8.55q-.15.15-.35.162-.2.013-.35-.162-.175-.175-.175-.362 0-.188.175-.338l2.6-2.625q.15-.125.288-.188.137-.062.287-.062.15 0 .288.062.137.063.287.188l2.6 2.625q.15.125.163.325.012.2-.163.375-.15.15-.35.162-.2.013-.35-.162L12.5 6.575v8.15q0 .225-.137.362-.138.138-.363.138ZM6.625 19q-.7 0-1.162-.462Q5 18.075 5 17.375V15.5q0-.225.138-.363Q5.275 15 5.5 15q.225 0 .363.137.137.138.137.363v1.875q0 .25.188.437.187.188.437.188h10.75q.25 0 .437-.188.188-.187.188-.437V15.5q0-.225.138-.363.137-.137.362-.137.225 0 .363.137.137.138.137.363v1.875q0 .7-.462 1.163-.463.462-1.163.462Z" />
  </svg>
);
