import { Meta, StoryObj } from "@storybook/react";

import { WizProvider } from "@/components/manager";

import { WizPopupContent } from "../components";

import { DefaultStory } from "./default";
import { GapStory } from "./gap";
import { PlaygroundStory } from "./playground";
import { Playground2Story } from "./playground2";

const meta: Meta<typeof WizPopupContent> = {
  title: "Base/Popup",
  component: WizPopupContent,
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
type Story = StoryObj<typeof WizPopupContent>;

export const Default: Story = DefaultStory;

export const Gap: Story = GapStory;

export const Playground: Story = PlaygroundStory;

export const Playground2: Story = Playground2Story;
