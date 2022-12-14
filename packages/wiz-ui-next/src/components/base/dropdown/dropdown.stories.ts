import { StoryFn, Meta } from "@storybook/vue3";
import { SPACING_ACCESSORS } from "@wizleap-inc/wiz-ui-constants";
import { ref } from "vue";

import { WizTextButton } from "@/components";

import { WizDropdown, WizDropdownItem } from ".";

export default {
  title: "Base/Dropdown",
  component: WizDropdown,
  subcomponents: { WizDropdownItem },
  argTypes: {
    click: {
      action: "click",
    },
    skeleton: {
      control: { type: "boolean" },
    },
    gap: {
      control: { type: "select" },
      options: SPACING_ACCESSORS,
    },
  },
} as Meta<typeof WizDropdown>;

const Template: StoryFn<typeof WizDropdown> = (args) => ({
  components: { WizDropdown, WizDropdownItem, WizTextButton },
  setup() {
    const isOpen = ref(false);
    return { isOpen, args };
  },
  template: `
    <WizDropdown v-bind="args" v-model="isOpen">
      <WizTextButton @click="isOpen = !isOpen" name="trigger">Click me</WizTextButton>
      <template #options>
        <WizDropdownItem @click="args.click">選択肢1</WizDropdownItem>
        <WizDropdownItem @click="args.click">選択肢2</WizDropdownItem>
        <WizDropdownItem @click="args.click">選択肢3</WizDropdownItem>
      </template>
    </WizDropdown>
  `,
});

export const Default = Template.bind({});

export const Skeleton = Template.bind({});
Skeleton.args = {
  skeleton: true,
};

export const Gap = Template.bind({});
Gap.args = {
  gap: "lg",
};
