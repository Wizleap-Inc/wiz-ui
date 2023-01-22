import { StoryFn } from "@storybook/vue";
import { SPACING_ACCESSORS } from "@wizleap-inc/wiz-ui-constants";
import { ref } from "vue";

import { WizRadio } from ".";

export default {
  title: "Base/Input/Radio",
  component: WizRadio,
  argTypes: {
    options: {
      control: { type: "object" },
    },
    disabled: {
      control: { type: "boolean" },
    },
    direction: {
      control: { type: "select" },
      options: ["horizontal", "vertical"],
    },
    gap: {
      control: { type: "select" },
      options: SPACING_ACCESSORS,
    },
    input: {
      action: "input",
    },
  },
};

const Template: StoryFn = (_, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { WizRadio },
  setup() {
    const value = ref(0);
    return { value };
  },
  template: `
  <div>
    <p>入力値：{{ value }}</p>
    <WizRadio v-bind="$props" v-model="value" @input="input"/>
  </div>
`,
});

export const Default = Template.bind({});
Default.args = {
  options: [
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
  const options = [
    { label: "test1", value: 1 },
    { label: "test2", value: 2 },
    { label: "test3", value: 3 },
    { label: "test4", value: 4 },
  ]
</script>
<template>
  <div>
    <p>入力値：{{ value }}</p>
    <WizRadio :options="options" v-model="value" @input="input"/>
  </div>
</template>
      `,
    },
  },
};

export const AllDisabled = Template.bind({});
AllDisabled.args = {
  options: [
    { label: "test1", value: 1 },
    { label: "test2", value: 2 },
    { label: "test3", value: 3 },
    { label: "test4", value: 4 },
  ],
  disabled: true,
};
AllDisabled.parameters = {
  docs: {
    description: {
      story: "入力を `disabled` にすることもできます。",
    },
    source: {
      code: `
<script lang="ts" setup>
  const options = [
    { label: "test1", value: 1 },
    { label: "test2", value: 2 },
    { label: "test3", value: 3 },
    { label: "test4", value: 4 },
  ]
</script>
<template>
  <div>
    <p>入力値：{{ value }}</p>
    <WizRadio :options="options" v-model="value" @input="input"/>
  </div>
</template>
      `,
    },
  },
};

export const SpotDisabled = Template.bind({});
SpotDisabled.args = {
  options: [
    { label: "test1", value: 1 },
    { label: "test2", value: 2, disabled: true },
    { label: "test3", value: 3 },
    { label: "test4", value: 4, disabled: true },
  ],
  disabledKey: 0,
};
SpotDisabled.parameters = {
  docs: {
    description: {
      story: "選択肢の一部を disabled にすることもできます。",
    },
    source: {
      code: `
<script lang="ts" setup>
  const options = [
    { label: "test1", value: 1 },
    { label: "test2", value: 2, disabled: true },
    { label: "test3", value: 3 },
    { label: "test4", value: 4, disabled: true },
  ]
</script>
<template>
  <div>
    <p>入力値：{{ value }}</p>
    <WizRadio :options ="options" v-model="value" @input="args.input"/>
  </div>
</template>
      `,
    },
  },
};

export const Vertical = Template.bind({});
Vertical.args = {
  options: [
    { label: "test1", value: 1 },
    { label: "test2", value: 2 },
    { label: "test3", value: 3 },
    { label: "test4", value: 4 },
  ],
  direction: "vertical",
};
Vertical.parameters = {
  docs: {
    description: {
      story:
        "選択肢を出す方向を変えることができます。 選択肢は `vertical`, `horizontal` から選択できます。 default は `horizontal` です。",
    },
    source: {
      code: `
<script lang="ts" setup>
  const options = [
    { label: "test1", value: 1 },
    { label: "test2", value: 2 },
    { label: "test3", value: 3 },
    { label: "test4", value: 4 },
  ]
</script>
<template>
  <div>
    <p>入力値：{{ value }}</p>
    <WizRadio :options ="options" direction="vertical" v-model="value" @input="args.input"/>
  </div>
</template>
      `,
    },
  },
};

export const Gap = Template.bind({});
Gap.args = {
  options: [
    { label: "test1", value: 1 },
    { label: "test2", value: 2 },
    { label: "test3", value: 3 },
    { label: "test4", value: 4 },
  ],
  gap: "sm",
};
