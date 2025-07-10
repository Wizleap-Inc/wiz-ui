import {
  ComponentName,
  SpacingKeys,
  THEME,
} from "@wizleap-inc/wiz-ui-constants";
import {
  headerStickyStyle,
  headerStyle,
} from "@wizleap-inc/wiz-ui-styles/bases/header.css";
import clsx from "clsx";
import { FC, ReactNode, ComponentPropsWithoutRef } from "react";

import { WizHStack, WizIMenu } from "@/components";

import { WizIconButton } from "../../buttons/icon";

type Props = ComponentPropsWithoutRef<"div"> & {
  gapLeft?: SpacingKeys;
  gapRight?: SpacingKeys;
  sticky?: boolean;
  leftContent?: ReactNode;
  rightContent?: ReactNode;
  onToggle?: () => void;
};

const Header: FC<Props> = ({
  className,
  style,
  gapLeft,
  gapRight,
  sticky,
  leftContent,
  rightContent,
  onToggle,
  ...props
}) => {
  return (
    <div
      {...props}
      className={clsx(className, headerStyle, sticky && headerStickyStyle)}
      style={{ ...style, zIndex: THEME.zIndex.floating }}
    >
      <WizHStack align="center" justify="between" height="100%">
        <WizHStack align="center" gap={gapLeft} pl="lg">
          <WizIconButton
            icon={WizIMenu}
            size="lg"
            variant="transparent"
            onClick={() => onToggle?.()}
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
