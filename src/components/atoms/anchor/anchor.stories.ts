import { COLOR_MAP_ACCESSORS } from "../../../constants/styles/color";
import { FONT_SIZE_MAP } from "../../../constants/styles/fontSize";

import WizAnchor from "./anchor.vue";
import WizIArrowRight from "../../icons/arrowRight.vue";

import type { Story } from "@storybook/vue";

export default {
  title: "Atoms/Anchor",
  component: WizAnchor,
  argTypes: {
    fontSize: {
      control: {
        type: "select",
        options: Object.keys(FONT_SIZE_MAP),
      },
    },
    fontWeight: {
      control: {
        type: "select",
        options: ["normal", "bold"],
      },
    },
    color: {
      control: {
        type: "select",
        options: COLOR_MAP_ACCESSORS,
      },
    },
    target: {
      control: {
        type: "select",
        options: ["_blank", "_self"],
      },
    }
  },
};

const Template: Story = (_, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { WizAnchor },
  template: `<WizAnchor v-bind="$props">{{ slot }}</WizAnchor>`,
});

export const Default = Template.bind({});
Default.args = {
  slot: "リンク名リンク名リンク名リンク名リンク名",
};

export const Target = Template.bind({});
Target.args = {
  slot: "リンク名リンク名リンク名リンク名リンク名",
  href: "/",
  target: "_blank",
};

export const Bold = Template.bind({});
Bold.args = {
  slot: "リンク名リンク名リンク名リンク名リンク名",
  fontWeight: "bold",
};

export const WithIcon = Template.bind({});
WithIcon.args = {
  slot: "リンク名リンク名リンク名リンク名リンク名",
  icon: WizIArrowRight,
};

export const Overview = ((_, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { WizAnchor },
  setup() {
    return { WizIArrowRight }
  },
  template: `
    <table>
      <tr>
        <WizAnchor href="#">
          リンク名1
        </WizAnchor>
      </tr>
      <tr>
        <WizAnchor href="#" fontWeight="bold">
          リンク名3
        </WizAnchor>
      </tr>
      <tr>
        <WizAnchor href="#" :icon="WizIArrowRight">
          リンク名3
        </WizAnchor>
      </tr>
    </table>
  `,
})).bind({});
