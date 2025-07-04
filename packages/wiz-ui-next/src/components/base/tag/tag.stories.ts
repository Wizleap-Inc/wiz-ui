import { Meta, StoryFn } from "@storybook/vue3";
import { FONT_SIZE_ACCESSORS } from "@wizleap-inc/wiz-ui-constants";

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
    variant: {
      control: { type: "select" },
      options: [
        "info",
        "red",
        "redFill",
        "green",
        "yellow",
        "blue",
        "mono",
        "gray",
        "darkGray",
        "greenFill",
        "yellowFill",
        "white",
      ],
    },
    label: {
      control: { type: "text" },
    },
    width: {
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

export const Width = Template.bind({});
Width.args = {
  label: "タグ",
  width: "100px",
};

export const Variant: StoryFn<typeof WizTag> = (args) => ({
  setup: () => ({ args, WizIClose }),
  components: { WizTag },
  template: `
    <div style="display: grid; grid-template-columns: max-content max-content; grid-gap: 1rem; align-items: center;">
      <WizTag label="必須" variant="info" :icon="WizIClose" />
      <div>variant="info"</div>
      <WizTag label="自動失注" variant="red" :icon="WizIClose" />
      <div>variant="red"</div>
      <WizTag label="申請完了" variant="green" :icon="WizIClose" />
      <div>variant="green"</div>
      <WizTag label="準備中" variant="yellow" :icon="WizIClose" />
      <div>variant="yellow"</div>
      <WizTag label="完了" variant="blue" :icon="WizIClose" />
      <div>variant="blue"</div>
      <WizTag label="11/11(月)" variant="mono" :icon="WizIClose" />
      <div>variant="mono"</div>
      <WizTag label="タグ" variant="gray" :icon="WizIClose" />
      <div>variant="gray"</div>
      <WizTag label="タグ" variant="darkGray" :icon="WizIClose" />
      <div>variant="darkGray"</div>
      <WizTag label="タグ" variant="redFill" :icon="WizIClose" />
      <div>variant="redFill"</div>
      <WizTag label="タグ" variant="greenFill" :icon="WizIClose" />
      <div>variant="greenFill"</div>
      <WizTag label="タグ" variant="yellowFill" :icon="WizIClose" />
      <div>variant="yellowFill"</div>
      <WizTag label="タグ" variant="white" :icon="WizIClose" />
      <div>variant="white"</div>
    </div>
  `,
});
