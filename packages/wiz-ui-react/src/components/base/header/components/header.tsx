import { ComponentName, SpacingKeys } from "@wizleap-inc/wiz-ui-constants";
import {
  headerStyle,
  headerStickyStyle,
} from "@wizleap-inc/wiz-ui-styles/bases/header.css";
import clsx from "clsx";
import { FC, ReactNode } from "react";

import { WizHStack, WizIMenu } from "@/components";

import { WizIconButton } from "../../buttons/icon";

interface Props {
  gapLeft?: SpacingKeys;
  gapRight?: SpacingKeys;
  sticky?: boolean;
  leftContent?: ReactNode;
  rightContent?: ReactNode;
}

const Header: FC<Props> = ({
  gapLeft,
  gapRight,
  sticky,
  leftContent,
  rightContent,
}) => {
  const handleToggleMenu = () => {};

  return (
    <div className={clsx(headerStyle, sticky && headerStickyStyle)}>
      <WizHStack align="center" justify="between" height="100%">
        <WizHStack align="center" gap={gapLeft} pl="lg">
          <WizIconButton
            icon={WizIMenu}
            size="lg"
            variant="transparent"
            onClick={handleToggleMenu}
          />
          {leftContent}
        </WizHStack>
        <WizHStack align="center" gap={gapRight} pr="lg">
          {rightContent}
        </WizHStack>
      </WizHStack>
    </div>
  );
};

Header.displayName = ComponentName.Header;

export const WizHeader = Header;
