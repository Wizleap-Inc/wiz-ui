import { StoryFn, Meta } from "@storybook/vue3";

import { WizIAdd, WizIRemove } from "@/components/icons";

import { WizToggleButton } from ".";

export default {
  title: "Base/Buttons/Toggle",
  component: WizToggleButton,
  argTypes: {
    disabled: {
      control: { type: "boolean" },
    },
    rounded: {
      control: { type: "boolean" },
    },
    onClick: {
      action: "onClick",
    },
  },
} as Meta<typeof WizToggleButton>;

const Template: StoryFn<typeof WizToggleButton> = (args) => ({
  components: { WizToggleButton },
  setup: () => ({ args, WizIAdd, WizIRemove }),
  template: `
    <WizToggleButton v-bind="args" :inActiveIcon="WizIAdd" :activeIcon="WizIRemove" @click="onClick('Default')">{{ slotDefault }}</WizToggleButton>
  `,
});

export const Default = Template.bind({});
Default.args = {
  slotDefault: "顧客データ追加",
};

export const Disabled = Template.bind({});
Disabled.args = {
  disabled: true,
  slotDefault: "顧客データ追加",
};

export const Angled = Template.bind({});
Angled.args = {
  rounded: false,
  slotDefault: "顧客データ追加",
};
