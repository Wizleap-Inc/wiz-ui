import { StoryFn } from "@storybook/vue";
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
};

const Template: StoryFn = (_, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { WizDropdown, WizDropdownItem, WizTextButton },
  setup() {
    const isOpen = ref(false);
    return { isOpen };
  },
  template: `
    <WizDropdown v-bind="$props" v-model="isOpen">
      <WizTextButton @click="isOpen = !isOpen" name="trigger">Click me</WizTextButton>
      <template #options>
        <WizDropdownItem @click="click">選択肢1</WizDropdownItem>
        <WizDropdownItem @click="click">選択肢2</WizDropdownItem>
        <WizDropdownItem @click="click">選択肢3</WizDropdownItem>
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
