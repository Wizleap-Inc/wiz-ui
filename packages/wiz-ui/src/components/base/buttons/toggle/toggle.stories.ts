import { StoryFn } from "@storybook/vue";

import { WizIAdd, WizIRemove } from "@/components/icons";

import { WizToggleButton } from ".";

export default {
  title: "Base/Buttons/Toggle",
  component: WizToggleButton,
  argTypes: {
    disabled: {
      control: { type: "boolean" },
    },
    onClick: {
      action: "onClick",
    },
  },
};

const Template: StoryFn = (_, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { WizToggleButton },
  setup: () => ({ WizIAdd, WizIRemove }),
  template: `
    <WizToggleButton v-bind="$props" :inActiveIcon="WizIAdd" :activeIcon="WizIRemove" @click="onClick('Default')">{{ slot }}</WizToggleButton>
  `,
});

export const Default = Template.bind({});
Default.args = {
  slot: "顧客データ追加",
};

export const Disabled = Template.bind({});
Disabled.args = {
  disabled: true,
  slot: "顧客データ追加",
};
