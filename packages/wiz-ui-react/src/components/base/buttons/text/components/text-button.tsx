import * as styles from "@wizleap-inc/wiz-ui-styles/bases/text-button.css";
import { ComponentProps, memo } from "react";

type Props = {
  variant?: "primary" | "sub";
} & ComponentProps<"button">;

const _TextButton = ({ variant = "primary", ...props }: Props) => {
  return <button {...props} className={styles.textButtonStyle[variant]} />;
};

export const WizTextButton = memo(_TextButton);
