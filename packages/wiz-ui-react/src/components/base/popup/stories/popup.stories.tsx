import { Meta, StoryObj } from "@storybook/react";

import { WizProvider } from "@/components/manager";

import { WizPopup } from "../components";

import { DefaultStory } from "./default";
import { GapStory } from "./gap";
import { PlaygroundStory } from "./playground";
import { Playground2Story } from "./playground2";

const meta: Meta<typeof WizPopup> = {
  title: "Base/Popup",
  component: WizPopup,
  argTypes: {},
  decorators: [
    (Story) => (
      <WizProvider>
        <Story />
      </WizProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof WizPopup>;

export const Default: Story = DefaultStory;

export const Gap: Story = GapStory;

export const Playground: Story = PlaygroundStory;

export const Playground2: Story = Playground2Story;
