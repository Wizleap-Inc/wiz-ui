import { Meta, StoryFn } from "@storybook/vue3";
import { ref } from "vue";

import WizInformationPanel from "./information-panel.vue";

export default {
  title: "Base/InformationPanel",
  component: WizInformationPanel,
  argTypes: {
    value: {
      control: { type: "boolean" },
    },
    messages: {
      control: { type: "object" },
    },
    width: {
      control: { type: "text" },
    },
    border: {
      control: { type: "boolean" },
    },
  },
} as Meta<typeof WizInformationPanel>;

const Template: StoryFn<typeof WizInformationPanel> = (args) => ({
  components: { WizInformationPanel },
  setup() {
    const isShow = ref(true);
    return { isShow, args };
  },
  template: `
      <div style="padding: 1rem;  height: 100vh; background-color: #EEF0EF" >
        <WizInformationPanel v-bind=" args" v-model="isShow" @update:modelValue="args.input" />
      </div>
  `,
});

export const Default = Template.bind({});
Default.args = {
  messages: [{ text: "メッセージ1", type: "default" }],
};

export const Link = Template.bind({});
Link.args = {
  messages: [
    {
      text: "wiz-ui repository",
      type: "anchor",
      anchorProps: {
        to: "https://github.com/Wizleap-Inc/wiz-ui",
      },
    },
    {
      text: "wiz-ui repository",
      type: "anchor",
      anchorProps: {
        to: "https://github.com/Wizleap-Inc/wiz-ui",
        fontSize: "xl3",
      },
    },
  ],
};

export const Multiple = Template.bind({});
Multiple.args = {
  messages: [
    { text: "メッセージ1", type: "default" },
    { text: "メッセージ2", type: "error" },
    { text: "メッセージ3", type: "default" },
  ],
};

export const Width = Template.bind({});
Width.args = {
  messages: [
    { text: "メッセージ1", type: "default" },
    { text: "メッセージ2", type: "error" },
    { text: "メッセージ3", type: "default" },
  ],
  width: "300px",
};

export const Border = Template.bind({});
Border.args = {
  messages: [
    { text: "メッセージ1", type: "default" },
    { text: "メッセージ2", type: "error" },
    { text: "メッセージ3", type: "default" },
  ],
  border: true,
};
