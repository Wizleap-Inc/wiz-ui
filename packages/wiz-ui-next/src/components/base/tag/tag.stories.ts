import { StoryFn, Meta } from "@storybook/vue3";
import {
  COLOR_MAP_ACCESSORS,
  FONT_SIZE_ACCESSORS,
} from "@wizleap-inc/wiz-ui-constants";

import { WizIClose } from "../../icons";

import WizTag from "./tag.vue";

export default {
  title: "Base/Tag",
  component: WizTag,
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
    backgroundColor: {
      control: { type: "select" },
      options: COLOR_MAP_ACCESSORS,
    },
    label: {
      control: { type: "text" },
    },
  },
} as Meta<typeof WizTag>;

const Template: StoryFn<typeof WizTag> = (args) => ({
  setup: () => ({ args }),
  components: { WizTag },
  template: `<WizTag v-bind="args" />`,
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

const OverviewTemplate: StoryFn<typeof WizTag> = (args) => ({
  setup: () => ({ args }),
  components: { WizTag },
  template: `
    <div style="display: flex; flex-wrap: wrap; gap: 8px;">
      <WizTag label="必須" />
      <WizTag label="自動失注" color="red.800" backgroundColor="red.300" />
      <WizTag label="申請完了" color="gray.700" backgroundColor="green.300" />
    </div>
  `,
});

export const Overview = OverviewTemplate.bind({});
