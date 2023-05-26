import { ComponentName, SpacingKeys } from "@wizleap-inc/wiz-ui-constants";
import { FC } from "react";

import { WizHStack } from "@/components";

import { WizTabPane } from "./tab-pane";
import { TabItem } from "./types";

type Props = {
  activeTabName: string;
  items: TabItem[];
  gap?: SpacingKeys;
  width?: string;
  onClickTab: (name: string) => void;
};

const Tab: FC<Props> = ({
  activeTabName,
  items,
  gap,
  width,
  onClickTab,
}: Props) => {
  return (
    <WizHStack gap={gap} wrap={false}>
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
