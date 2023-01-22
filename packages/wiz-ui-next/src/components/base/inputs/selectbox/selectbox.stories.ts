import { StoryFn, Meta } from "@storybook/vue3";
import { ref } from "vue";

import { WizHStack } from "@/components";

import { SelectBoxOption } from "./types";

import { WizSelectBox } from ".";

export default {
  title: "Base/Input/SelectBox",
  component: WizSelectBox,
  argTypes: {
    value: {
      control: {
        type: "text",
      },
    },
    input: {
      action: "input",
    },
    expand: {
      control: { type: "boolean" },
    },
  },
} as Meta<typeof WizSelectBox>;

const Template: StoryFn<typeof WizSelectBox> = (args) => ({
  components: { WizSelectBox, WizHStack },
  setup() {
    const value = ref(0);
    return { value, args };
  },
  template: `
    <WizHStack>
      <WizSelectBox v-bind="args" v-model="value" @update:modelValue="args.input"/>
    </WizHStack>
  `,
});

const _getDummyOptions = (label: string, count: number, exLabel?: string) => {
  const options: SelectBoxOption[] = [];
  for (let i = 1; i <= count; i++) {
    options.push({ label: label + i, value: i, exLabel });
  }
  return options;
};

export const Default = Template.bind({});
Default.args = {
  options: _getDummyOptions("test", 3),
};
Default.parameters = {
  docs: {
    source: {
      code: `
<template>
  <div>
    <p>入力値：{{ value }}</p>
    <WizRadio options="[]" v-model="value" @input="input"/>
  </div>
</template>
      `,
    },
  },
};

export const Disabled = Template.bind({});
Disabled.args = {
  options: [],
  disabled: true,
};
Disabled.parameters = {
  docs: {
    description: {
      story: "`disabled` に指定することもできます。",
    },
    source: {
      code: `
<template>
  <div>
    <p>入力値：{{ value }}</p>
    <WizRadio disabled options="[]" v-model="value" @input="input"/>
  </div>
</template>
      `,
    },
  },
};

const MultiTemplate: StoryFn<typeof WizSelectBox> = (args) => ({
  components: { WizSelectBox, WizHStack },
  setup() {
    const value = ref(0);
    return { value, args };
  },
  template: `
    <WizHStack>
      <WizSelectBox v-bind="args" v-model="value" @update:modelValue="args.input"/>
      <WizSelectBox v-bind="args" v-model="value" @update:modelValue="args.input"/>
    </WizHStack>
  `,
});
Disabled.parameters = {
  docs: {
    description: {
      story: "`disabled` に指定することもできます。",
    },
    source: {
      code: `
<template>
  <div>
    <p>入力値：{{ value }}</p>
    <WizRadio disabled options="[]" v-model="value" @input="input"/>
  </div>
</template>
      `,
    },
  },
};

export const LongLabel = MultiTemplate.bind({});
LongLabel.args = {
  options: _getDummyOptions("ThisIsTooLongLabelThisIsTooLongLabel", 3),
};

LongLabel.parameters = {
  docs: {
    description: {
      story: "Label が長文になった場合は以下の通りになります。",
    },
    source: {
      code: `
<script lang="ts" setup>
const options = [
  { label: "ThisIsTooLongLabelThisIsTooLongLabel1", value: 1},
  { label: "ThisIsTooLongLabelThisIsTooLongLabel2", value: 2 },
  { label: "ThisIsTooLongLabelThisIsTooLongLabel3", value: 3 },
]
</script>

<template>
    <WizHStack>
      <WizSelectBox :options="options" v-model="value" @input="input"/>
      <WizSelectBox :options="options"  v-model="value" @input="input"/>
    </WizHStack>
</template>
      `,
    },
  },
};

export const Expand = Template.bind({});
Expand.args = {
  options: _getDummyOptions("test", 1),
  expand: true,
};
Expand.parameters = {
  docs: {
    description: {
      story: "コンポーネントを幅いっぱいに広げるように指定することができます。",
    },
    source: {
      code: `
<script lang="ts" setup>
  const options = [
    { label: "test1", value: 1},
  ]
</script>

<template>
    <WizHStack>
      <WizSelectBox :options="options" expand v-model="value" @input="input"/>
      <WizSelectBox :options="options" expand v-model="value" @input="input"/>
    </WizHStack>
</template>
      `,
    },
  },
};
export const ManyOptions = Template.bind({});
ManyOptions.args = {
  options: _getDummyOptions("test", 15),
};

ManyOptions.parameters = {
  docs: {
    description: {
      story: "コンポーネントを幅いっぱいに広げるように指定することができます。",
    },
    source: {
      code: `
<script lang="ts" setup>
  const options = [
    { label: "test1", value: 1},
    { label: "test2", value: 2},
    { label: "test3", value: 3},
    { label: "test4", value: 4},
    { label: "test5", value: 5},
    { label: "test6", value: 6},
    { label: "test7", value: 7},
    { label: "test8", value: 8},
    { label: "test9", value: 9},
    { label: "test10", value: 10},
    { label: "test11", value: 11},
    { label: "test12", value: 12},
    { label: "test13", value: 13},
    { label: "test14", value: 14},
    { label: "test15", value: 15},
  ]
</script>

<template>
    <WizHStack>
      <WizSelectBox :options="options" expand v-model="value" @input="input"/>
      <WizSelectBox :options="options" expand v-model="value" @input="input"/>
    </WizHStack>
</template>
      `,
    },
  },
};

export const ExtraLabel = Template.bind({});
ExtraLabel.args = {
  options: _getDummyOptions("test", 3, "(10)"),
};
ExtraLabel.parameters = {
  docs: {
    description: {
      story: "追加でラベルを追加をすることができます。",
    },
    source: {
      code: `

<script lang="ts" setup>
  const options = [
    { label: "test1", value: 1, exLabel: "(10)"},
    { label: "test2", value: 2, exLabel: "(10)"},
    { label: "test3", value: 3, exLabel: "(10)"},
  ];
</script>
<template>
    <WizHStack>
      <WizSelectBox :options="options" v-model="value" @input="input"/>
      <WizSelectBox :options="options" v-model="value" @input="input"/>
    </WizHStack>
</template>
      `,
    },
  },
};
