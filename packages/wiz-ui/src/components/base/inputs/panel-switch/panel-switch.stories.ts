import { StoryFn } from "@storybook/vue";
import { ref } from "vue";

import { WizPanelSwitch } from ".";

export default {
  title: "Base/Input/PanelSwitch",
  component: WizPanelSwitch,
  argTypes: {
    input: {
      action: "input",
    },
  },
};
const Template: StoryFn = (_, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { WizPanelSwitch },
  setup() {
    const value = ref(0);
    return { value };
  },
  template: `
  <div>
    <p>入力値：{{ value }}</p>
    <WizPanelSwitch v-bind="$props" v-model="value" @input="input"/>
  </div>
`,
});

export const Default = Template.bind({});
Default.args = {
  items: [
    { label: "test1", value: 1 },
    { label: "test2", value: 2 },
    { label: "test3", value: 3 },
    { label: "test4", value: 4 },
  ],
};
Default.parameters = {
  docs: {
    source: {
      code: `
<script>
  const items = [
    { label: "test1", value: 1 },
    { label: "test2", value: 2 },
    { label: "test3", value: 3 },
    { label: "test4", value: 4 },
  ]
</script>
<template>
  <div>
    <p>入力値：{{ value }}</p>
    <WizPanelSwitch :items="items" v-model="value" @input="input"/>
  </div>
</template>
      `,
    },
  },
};
