import { CSSProperties } from "react";
type Props = {
  className?: string;
  style?: CSSProperties;
};
export const WizIManageAccounts = ({ className, style }: Props) => (
  <svg
    className={className}
    style={style}
    xmlns="http://www.w3.org/2000/svg"
    height="1em"
    width="1em"
    viewBox="0 0 24 24"
  >
    <path d="M10 11.375q-1.25 0-2.125-.875T7 8.375q0-1.225.875-2.113.875-.887 2.125-.887t2.125.887Q13 7.15 13 8.375q0 1.25-.875 2.125T10 11.375Zm-6.175 7.25q-.375 0-.6-.238Q3 18.15 3 17.8v-.825q0-.7.35-1.2t.975-.8q1.225-.6 2.513-.975 1.287-.375 3.162-.375H10.45q-.1.25-.162.5-.063.25-.113.5H10q-1.675 0-2.925.337-1.25.338-2.275.888-.45.25-.625.513-.175.262-.175.612v.65h6.3q.075.225.175.5.1.275.225.5ZM10 10.375q.825 0 1.413-.588Q12 9.2 12 8.375t-.587-1.412q-.588-.588-1.413-.588-.825 0-1.412.588Q8 7.55 8 8.375t.588 1.412q.587.588 1.412.588Zm0-2Zm.3 9.25Zm6.325-.55q.75 0 1.275-.525.525-.525.525-1.275 0-.75-.537-1.287-.538-.538-1.263-.538-.75 0-1.287.538-.538.537-.538 1.287 0 .75.538 1.275.537.525 1.287.525Zm-.55.875q-.425-.1-.787-.3-.363-.2-.663-.525l-.85.35q-.125.05-.225 0t-.15-.175l-.15-.225q-.05-.1-.037-.212.012-.113.112-.188l.7-.525q-.15-.425-.15-.875t.15-.875l-.675-.575q-.1-.075-.125-.188-.025-.112.05-.237l.125-.225q.075-.1.175-.138.1-.037.225.013l.825.35q.275-.325.65-.525t.8-.275l.1-.9q.025-.1.113-.175.087-.075.212-.075h.275q.125 0 .213.075.087.075.112.175l.075.9q.425.075.8.275.375.2.65.525l.825-.35q.125-.05.238 0 .112.05.162.15l.15.25q.05.1.025.2t-.1.175l-.7.575q.15.425.15.875t-.15.875l.7.525q.125.075.125.2t-.075.25l-.125.225q-.075.075-.175.125-.1.05-.2 0l-.85-.35q-.3.325-.663.525-.362.2-.787.3l-.075.875q-.025.125-.112.2-.088.075-.213.075H16.5q-.125 0-.212-.075-.088-.075-.113-.2Z" />
  </svg>
);
WizIManageAccounts.displayName = "WizIManageAccounts";
