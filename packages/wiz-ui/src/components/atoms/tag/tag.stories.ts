import { COLOR_MAP_ACCESSORS } from "../../../constants/styles/color";
import { FONT_SIZE_ACCESSORS } from "../../../constants/styles/fontSize";
import { WizIClose } from "../../icons";

import WizTag from "./tag.vue";

import type { Story } from "@storybook/vue-vite";

export default {
  title: "Atoms/Tag",
  component: WizTag,
  argTypes: {
    fontSize: {
      control: {
        type: "select",
        options: FONT_SIZE_ACCESSORS,
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
    backgroundColor: {
      control: {
        type: "select",
        options: COLOR_MAP_ACCESSORS,
      },
    },
    label: {
      control: {
        type: "text",
      },
    },
  },
};

const Template: Story = (_, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { WizTag },
  template: `<WizTag v-bind="$props" />`,
});

export const Default = Template.bind({});
Default.args = {
  label: "タグ",
};

export const Bold = Template.bind({});
Bold.args = {
  label: "タグ",
  fontWeight: "bold",
};

export const WithIcon = Template.bind({});
WithIcon.args = {
  label: "タグ",
  icon: WizIClose,
};

export const Overview = ((_, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { WizTag },
  template: `
    <div style="display: flex; flex-wrap: wrap; gap: 8px;">
      <WizTag label="必須" />
      <WizTag label="自動失注" color="red.800" backgroundColor="red.300" />
      <WizTag label="申請完了" color="gray.700" backgroundColor="green.300" />
    </div>
  `,
})).bind({});
