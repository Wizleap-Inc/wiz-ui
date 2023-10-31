import { ComponentName, SpacingKeys } from "@wizleap-inc/wiz-ui-constants";
import { FC } from "react";

import { WizHStack } from "@/components";
import { BaseProps } from "@/types";

import { WizTabPane } from "./tab-pane";
import { TabItem } from "./types";

type Props = BaseProps & {
  activeTabName: string;
  items: TabItem[];
  gap?: SpacingKeys;
  width?: string;
  center?: boolean;
  onClickTab: (name: string) => void;
};

const Tab: FC<Props> = ({
  className,
  style,
  activeTabName,
  items,
  gap,
  width,
  center = false,
  onClickTab,
}: Props) => {
  return (
    <WizHStack
      className={className}
      style={style}
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
          onClick={onClickTab}
        />
      ))}
    </WizHStack>
  );
};

Tab.displayName = ComponentName.Tab;

export const WizTab = Tab;
