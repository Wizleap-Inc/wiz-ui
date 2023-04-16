import { ComponentName, SpacingKeys } from "@wizleap-inc/wiz-ui-constants";
import { memo } from "react";

import { WizTabPane } from "./tab-pane";
import { TabItem } from "./types";

type Props = {
  activeTabName: string;
  items: TabItem[];
  gap?: SpacingKeys;
  width?: string;
  setActiveTabName: (value: string) => void;
};

const _Tab = ({ activeTabName, items, gap, width, ...props }: Props) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
      }}
    >
      {/* WizHStack */}
      {items.map((tab) => (
        <WizTabPane
          key={tab.label}
          label={tab.label}
          notificationCount={tab.notificationCount}
          disabled={tab.disabled}
          width={width}
          active={tab.name === activeTabName}
          onClick={() => props.setActiveTabName(tab.name)}
        />
      ))}
      <div></div>
    </div>
  );
};

_Tab.displayName = ComponentName.Tab;

export const WizTab = memo(_Tab);
