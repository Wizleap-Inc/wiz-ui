import { Meta, StoryObj } from "@storybook/react";
import { THEME } from "@wizleap-inc/wiz-ui-constants";

import { WizDrawer, WizHeader, WizNavigationItem } from "@/components";
import {
  WizIAssignment,
  WizIBusinessCenter,
  WizIDashboard,
  WizIHelp,
} from "@/components/icons";

const meta: Meta<typeof WizDrawer> = {
  title: "Base/Drawer",
  component: WizDrawer,
  argTypes: {},
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj<typeof WizDrawer>;

const dummy = () => {
  // dummy function
};

export const Default: Story = {
  args: {
    isOpen: true,
  },

  render: (args) => {
    return (
      <WizDrawer {...args}>
        <WizNavigationItem
          icon={WizIDashboard}
          label="Home"
          active={true}
          href={""}
          onTogglePopup={dummy}
          onTogglePopupLocking={dummy}
        />
        <WizNavigationItem
          icon={WizIAssignment}
          label="Page1"
          active={false}
          href={""}
          onTogglePopup={dummy}
          onTogglePopupLocking={dummy}
        />
        <WizNavigationItem
          icon={WizIBusinessCenter}
          label="Page2"
          active={false}
          href={""}
          onTogglePopup={dummy}
          onTogglePopupLocking={dummy}
        />
        <WizNavigationItem
          icon={WizIHelp}
          label="Page3"
          active={false}
          href={""}
          onTogglePopup={dummy}
          onTogglePopupLocking={dummy}
        />
      </WizDrawer>
    );
  },
};
export const WithHeader: Story = {
  args: {
    isOpen: true,
    offsetTop: THEME.share.HEADER_HEIGHT,
  },

  render: (args) => {
    return (
      <div style={{ height: "100vh" }}>
        <WizHeader sticky onToggle={dummy} />
        <WizDrawer {...args}>
          <WizNavigationItem
            icon={WizIDashboard}
            label="Home"
            active={true}
            href={""}
            onTogglePopup={dummy}
            onTogglePopupLocking={dummy}
          />
          <WizNavigationItem
            icon={WizIAssignment}
            label="Page1"
            active={false}
            href={""}
            onTogglePopup={dummy}
            onTogglePopupLocking={dummy}
          />
          <WizNavigationItem
            icon={WizIBusinessCenter}
            label="Page2"
            active={false}
            href={""}
            onTogglePopup={dummy}
            onTogglePopupLocking={dummy}
          />
          <WizNavigationItem
            icon={WizIHelp}
            label="Page3"
            active={false}
            href={""}
            onTogglePopup={dummy}
            onTogglePopupLocking={dummy}
          />
        </WizDrawer>
      </div>
    );
  },
};
