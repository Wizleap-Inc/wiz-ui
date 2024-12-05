import { ComponentName } from "@wizleap-inc/wiz-ui-constants";
import * as styles from "@wizleap-inc/wiz-ui-styles/bases/dropdown.css";
import clsx from "clsx";
import { ComponentProps, FC, ReactNode, useRef } from "react";

import { WizPopup, WizVStack } from "@/components";
import { BaseProps } from "@/types";
type Props = BaseProps & {
  isOpen: boolean;
  children: ReactNode;
  options: ReactNode;
  skeleton?: boolean;
  gap?: ComponentProps<typeof WizPopup>["gap"];
  isDirectionFixed?: boolean;
  onClose?: () => void;
};

const Dropdown: FC<Props> = ({
  className,
  style,
  isOpen,
  children,
  options,
  skeleton,
  gap,
  isDirectionFixed,
  onClose,
}) => {
  const anchorRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <div
        className={className}
        ref={anchorRef}
        style={{
          ...style,
          width: "fit-content",
          height: "fit-content",
        }}
      >
        {children}
      </div>
      <WizPopup
        isOpen={isOpen}
        onClose={() => onClose?.()}
        anchorElement={anchorRef}
        gap={gap}
        isDirectionFixed={isDirectionFixed}
      >
        <div
          className={clsx(
            styles.dropdownStyle,
            skeleton && styles.dropdownSkeletonStyle
          )}
        >
          <WizVStack p="xs" gap="xs2">
            {options}
          </WizVStack>
        </div>
      </WizPopup>
    </>
  );
};

Dropdown.displayName = ComponentName.Dropdown;

export const WizDropdown = Dropdown;
