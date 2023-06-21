type Props = {
  className?: string;
};
export const WizIWarning = ({ className }: Props) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    height="1em"
    width="1em"
    viewBox="0 96 960 960"
  >
    <path d="M165.031 896q-9.339 0-16.533-4.442-7.194-4.442-11.191-11.712-4.359-7.153-4.795-15.5-.435-8.346 4.67-16.831l314.866-543.031q5.106-8.484 12.298-12.331 7.192-3.846 15.654-3.846t15.654 3.846q7.192 3.847 12.298 12.331l314.866 543.031q5.105 8.485 4.67 16.831-.436 8.347-4.795 15.5-3.997 7.27-11.191 11.712Q804.308 896 794.969 896H165.031ZM178 856h604L480 336 178 856Zm302-55.385q10.462 0 17.539-7.076 7.076-7.077 7.076-17.539 0-10.462-7.076-17.539-7.077-7.076-17.539-7.076-10.462 0-17.539 7.076-7.076 7.077-7.076 17.539 0 10.462 7.076 17.539 7.077 7.076 17.539 7.076Zm.027-89.23q8.512 0 14.242-5.75Q500 699.884 500 691.384V531.385q0-8.5-5.758-14.25-5.757-5.75-14.269-5.75t-14.242 5.75q-5.731 5.75-5.731 14.25v159.999q0 8.5 5.758 14.251 5.757 5.75 14.269 5.75ZM480 596Z" />
  </svg>
);
