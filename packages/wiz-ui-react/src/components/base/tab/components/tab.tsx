import { ComponentName, SpacingKeys } from "@wizleap-inc/wiz-ui-constants";
import { FC, ComponentPropsWithoutRef } from "react";

import { WizHStack } from "@/components";

import { WizTabPane } from "./tab-pane";
import { TabItem } from "./types";

type Props = ComponentPropsWithoutRef<"div"> & {
  activeTabName: string;
  items: TabItem[];
  gap?: SpacingKeys;
  width?: string;
  center?: boolean;
  onClickTab?: (name: string) => void;
};

const Tab: FC<Props> = ({
  activeTabName,
  items,
  gap,
  width,
  center = false,
  onClickTab,
  ...props
}: Props) => {
  return (
    <WizHStack
      {...props}
      gap={gap}
      nowrap
      justify={center ? "center" : undefined}
    >
      {items.map((tab) => (
        <WizTabPane
          key={tab.name}
          {...tab}
          width={width}
          active={tab.name === activeTabName}
          onClick={(name: string) => onClickTab?.(name)}
        />
      ))}
    </WizHStack>
  );
};

Tab.displayName = ComponentName.Tab;

export const WizTab = Tab;
