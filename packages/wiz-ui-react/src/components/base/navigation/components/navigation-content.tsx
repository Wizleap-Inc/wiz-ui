import { ComponentName } from "@wizleap-inc/wiz-ui-constants";
import { navigationContentStyle } from "@wizleap-inc/wiz-ui-styles/bases/navigation.css";
import { FC, ReactNode } from "react";

interface Props {
  isOpen?: boolean;
  children: ReactNode;
}

const NavigationContent: FC<Props> = ({ isOpen = false, children }) => {
  const marginLeftStyle = isOpen ? "181px" : "61px";

  return (
    <div
      className={navigationContentStyle}
      style={{ marginLeft: marginLeftStyle }}
    >
      {children}
    </div>
  );
};
NavigationContent.displayName = ComponentName.NavigationContent;

export const WizNavigationContent = NavigationContent;
