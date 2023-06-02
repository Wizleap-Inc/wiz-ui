import { ComponentName, SpacingKeys } from "@wizleap-inc/wiz-ui-constants";
import {
  headerStyle,
  headerStickyStyle,
} from "@wizleap-inc/wiz-ui-styles/bases/header.css";
import clsx from "clsx";
import { Dispatch, FC, ReactNode, SetStateAction } from "react";

import { WizHStack, WizIMenu } from "@/components";

import { WizIconButton } from "../../buttons/icon";

interface Props {
  gapLeft?: SpacingKeys;
  gapRight?: SpacingKeys;
  sticky?: boolean;
  leftContent?: ReactNode;
  rightContent?: ReactNode;
  setIsMenuOpen: Dispatch<SetStateAction<boolean>>;
}

const Header: FC<Props> = ({
  gapLeft,
  gapRight,
  sticky,
  leftContent,
  rightContent,
  setIsMenuOpen,
}) => {
  return (
    <div className={clsx(headerStyle, sticky && headerStickyStyle)}>
      <WizHStack align="center" justify="between" height="100%">
        <WizHStack align="center" gap={gapLeft} pl="lg">
          <WizIconButton
            icon={WizIMenu}
            size="lg"
            variant="transparent"
            onClick={() => setIsMenuOpen((prev) => !prev)}
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
