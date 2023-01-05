import { StoryFn, Meta } from "@storybook/vue3";

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
} as Meta<typeof WizDropdownItem>;

const Template: StoryFn<typeof WizDropdownItem> = (args) => ({
  components: { WizDropdownItem },
  setup: () => ({ args }),
  template: `
    <WizDropdownItem v-bind="args" @click="args.click">
      選択肢
    </WizDropdownItem>
  `,
});

export const Default = Template.bind({});

export const WithIcon = Template.bind({});
WithIcon.args = {
  icon: WizIOpenInNew,
};
