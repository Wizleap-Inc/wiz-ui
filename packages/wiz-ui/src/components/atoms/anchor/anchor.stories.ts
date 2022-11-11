import { StoryFn } from "@storybook/vue";

import { COLOR_MAP_ACCESSORS } from "../../../constants/styles/color";
import { FONT_SIZE_ACCESSORS } from "../../../constants/styles/fontSize";
import WizIArrowRight from "../../icons/arrow-right.vue";

import WizAnchor from "./anchor.vue";

export default {
  title: "Atoms/Anchor",
  component: WizAnchor,
  argTypes: {
    fontSize: {
      control: { type: "select" },
      options: FONT_SIZE_ACCESSORS,
    },
    fontWeight: {
      control: { type: "select" },
      options: ["normal", "bold"],
    },
    color: {
      control: { type: "select" },
      options: COLOR_MAP_ACCESSORS,
    },
    target: {
      control: { type: "select" },
      options: ["_blank", "_self"],
    },
  },
};

const Template: StoryFn = (_, { argTypes }) => ({
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
  to: "/",
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

const OverviewTemplate: StoryFn = (_, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { WizAnchor },
  setup() {
    return { WizIArrowRight };
  },
  template: `
    <table>
      <tr>
        <WizAnchor to="#">
          リンク名1
        </WizAnchor>
      </tr>
      <tr>
        <WizAnchor to="#" fontWeight="bold">
          リンク名2
        </WizAnchor>
      </tr>
      <tr>
        <WizAnchor to="#" :icon="WizIArrowRight">
          リンク名3
        </WizAnchor>
      </tr>
    </table>
  `,
});

export const Overview = OverviewTemplate.bind({});
