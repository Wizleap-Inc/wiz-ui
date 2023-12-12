import { Meta, StoryFn } from "@storybook/vue3";
import { ref, h } from "vue";

import { WizAnchor } from "@/components";

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

const linkComponent = h("div", [
  h("div", [
    "wiz-ui repository: ",
    h(
      WizAnchor,
      { to: "https://github.com/Wizleap-Inc/wiz-ui" },
      "https://github.com/Wizleap-Inc/wiz-ui"
    ),
  ]),
]);

export const Link = Template.bind({});
Link.args = {
  messages: [linkComponent],
};
Link.parameters = {
  docs: {
    source: {
      code: `
<script setup lang="ts">
import { WizAnchor, WizInformationPanel } from "@wizleap-inc/wiz-ui-next";
import { h, ref } from "vue";

const isShow = ref(true);

// 基本的にimportしたコンポーネントをそのままmessagesの配列に含めるほうが良い
// コンポーネントに対して何らかのpropsやslotを渡す必要がある場合は、h関数を使ってVNodeを作成する
const messages = [
  h("div", [
    "wiz-ui repository: ",
    h(
      WizAnchor,
      { to: "https://github.com/Wizleap-Inc/wiz-ui" },
      "https://github.com/Wizleap-Inc/wiz-ui"
    ),
  ]),
];
</script>

<template>
  <WizInformationPanel :messages="messages" v-model="isShow" />
</template>
      `,
    },
  },
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
