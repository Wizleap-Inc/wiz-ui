import { Meta, StoryObj } from "@storybook/react";

import { WizPopup } from "../components";

import { DefaultStory } from "./default";
import { GapStory } from "./gap";
import { GapDirectionStory } from "./gap-direction";
import { PlaygroundStory } from "./playground";

const meta: Meta<typeof WizPopup> = {
  title: "Base/Popup",
  component: WizPopup,
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof WizPopup>;

export const Default: Story = DefaultStory;

export const GapSize: Story = GapStory;

export const GapDirection: Story = GapDirectionStory;

export const Playground: Story = PlaygroundStory;
