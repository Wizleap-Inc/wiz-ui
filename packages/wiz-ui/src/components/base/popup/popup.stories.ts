import { StoryFn } from "@storybook/vue";
import { ref } from "vue";

import { WizTextButton } from "@/components";
import { SPACING_ACCESSORS } from "@/constants/styles/spacing";
import { Z_INDEX_ACCESSORS } from "@/constants/styles/z-index";

import { WizPopup } from ".";

export default {
  title: "Base/Popup",
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
      <wiz-text-button @click="toggleIsOpen">Toggle Popup</wiz-text-button>
      <wiz-popup v-bind="$props" v-model="isOpen">
        <div style="padding: 16px; background-color: white; border-radius: 4px;">
          <span>Popup content</span>
        </div>
      </wiz-popup>
    </div>
  `,
});

export const Default = Template.bind({});
Default.args = {
  layer: "base",
  vGap: "sm",
};
