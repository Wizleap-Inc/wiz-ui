import { StoryFn, Meta } from "@storybook/vue3";
import { SPACING_ACCESSORS } from "@wizleap-inc/wiz-ui-constants";
import { ref } from "vue";

import { WizCheckBox } from ".";

export default {
  title: "Base/Input/CheckBox",
  component: WizCheckBox,
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
} as Meta<typeof WizCheckBox>;

const Template: StoryFn<typeof WizCheckBox> = (args) => ({
  components: { WizCheckBox },
  setup() {
    const value = ref([]);
    return { value, args };
  },
  template: `
  <div>
    <p>入力値：{{ value }}</p>
    <WizCheckBox v-bind="args" v-model="value" @input="args.input"/>
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
    <WizCheckBox :options ="options" v-model="value" @input="args.input"/>
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
    <WizCheckBox disabled :options ="options" v-model="value" @input="args.input"/>
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
    <WizCheckBox :options ="options" v-model="value" @input="args.input"/>
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
    <WizCheckBox :options ="options" direction="vertical" v-model="value" @input="args.input"/>
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
Gap.parameters = {
  docs: {
    description: {
      story:
        "選択肢に `gap` を指定して余白を設定することができます。選択肢はSpacingKeysの中から選択できます。default 値は `xl` です。",
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
    <WizCheckBox  :options ="options" gap="sm" v-model="value" @input="args.input"/>
  </div>
</template>
      `,
    },
  },
};
