import { Meta, StoryObj } from "@storybook/react";

import {
  WizPopup,
  WizPopupClose,
  WizPopupContent,
  WizPopupTrigger,
} from "../components";

const meta: Meta<typeof WizPopup> = {
  title: "Base/Popup",
  component: WizPopup,
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof WizPopup>;

export const Default: Story = {
  render: (args) => {
    return (
      <div>
        <WizPopup {...args}>
          <WizPopupTrigger>
            <button>Click me</button>
          </WizPopupTrigger>
          <WizPopupContent>
            <div
              style={{
                padding: "16px",
                backgroundColor: "white",
                borderRadius: "4px",
              }}
            >
              <p>This is a popup content</p>
              <button>
                <WizPopupClose>close </WizPopupClose>
              </button>
            </div>
          </WizPopupContent>
        </WizPopup>
        <div>aa</div>
        <div>bb</div>
        <div>cc</div>
        <div>dd</div>
        <div>ee</div>
        <div>ff</div>
        <div>gg</div>
      </div>
    );
  },
  args: {},
};
