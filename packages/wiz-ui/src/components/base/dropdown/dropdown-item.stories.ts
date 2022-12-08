import { StoryFn } from "@storybook/vue";

import { WizIOpenInNew } from "@/components";

import { WizDropdownItem } from ".";

export default {
  title: "Base/Dropdown/Item",
  component: WizDropdownItem,
  argTypes: {
    icon: {
      control: { type: "object" },
    },
    click: {
      action: "click",
    },
  },
};

const Template: StoryFn = (_, { argTypes }) => ({
  props: [...Object.keys(argTypes), "slotDefault"],
  components: { WizDropdownItem },
  template: `
    <WizDropdownItem v-bind="$props" @click="click">
      {{ slotDefault }}
    </WizDropdownItem>
  `,
});

export const Default = Template.bind({});
Default.args = {
  slotDefault: "選択肢",
};

export const WithIcon = Template.bind({});
WithIcon.args = {
  slotDefault: "選択肢",
  icon: WizIOpenInNew,
};
