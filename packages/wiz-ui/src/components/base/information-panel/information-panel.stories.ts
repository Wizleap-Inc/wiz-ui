import { StoryFn } from "@storybook/vue";
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
};

const Template: StoryFn = (_, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { WizInformationPanel },
  setup() {
    const isShow = ref(true);
    return { isShow };
  },
  template: `
      <div style="padding: 1rem;  height: 100vh; background-color: #EEF0EF" >
        <WizInformationPanel v-bind="$props" v-model="isShow" />
      </div>
  `,
});

export const Default = Template.bind({});
Default.args = {
  messages: [{ text: "メッセージ1", type: "default" }],
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
