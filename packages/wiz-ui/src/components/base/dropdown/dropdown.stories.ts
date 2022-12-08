import { StoryFn } from "@storybook/vue";
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
