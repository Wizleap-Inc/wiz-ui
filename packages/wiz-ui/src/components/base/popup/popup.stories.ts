import { StoryFn } from "@storybook/vue";
import { ref } from "vue";

import { WizTextButton } from "@/components";
import { SPACING_ACCESSORS } from "@/constants/styles/spacing";
import { Z_INDEX_ACCESSORS } from "@/constants/styles/z-index";

import { WizPopup } from ".";

export default {
  title: "Base/Popup/Popup",
  component: WizPopup,
  argTypes: {
    layer: {
      control: { type: "select" },
      options: Z_INDEX_ACCESSORS,
    },
    vGap: {
      control: { type: "select" },
      options: SPACING_ACCESSORS,
    },
    hGap: {
      control: { type: "select" },
      options: SPACING_ACCESSORS,
    },
  },
};

const Template: StoryFn = (_, { argTypes }) => ({
  components: { WizPopup, WizTextButton },
  props: Object.keys(argTypes),
  setup() {
    const isOpen = ref(false);
    const toggleIsOpen = () => (isOpen.value = !isOpen.value);
    return { isOpen, toggleIsOpen };
  },
  template: `
    <div style="position: relative;">
      <WizTextButton @click.stop="toggleIsOpen">Open Popup</WizTextButton>
      <WizPopup v-bind="$props" v-if="isOpen" @oof="toggleIsOpen">
        This is popup.x
      </WizPopup>
    </div>
  `,
});

export const Default = Template.bind({});
Default.args = {
  layer: "base",
  vGap: "sm",
};
