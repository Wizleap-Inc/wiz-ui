import { StoryFn, Meta } from "@storybook/vue3";

import { WizProgressBar } from ".";

export default {
  title: "Base/Progress/Bar",
  component: WizProgressBar,
  argTypes: {
    content: {
      control: { type: "array" },
    },
  },
} as Meta<typeof WizProgressBar>;

const Template: StoryFn<typeof WizProgressBar> = (args) => ({
  components: { WizProgressBar },
  setup: () => ({ args }),
  template: `
  <div style="padding: 100px;">
    <WizProgressBar v-bind="args"/>
  </div>
  `,
});

const STATUS = [
  "done",
  "active",
  "inactive",
  "none",
  "pending",
  "dead",
] as const;

export const Default = Template.bind({});
Default.args = {
  contents: STATUS.map((status) => ({ status })),
};

export const WithValue = Template.bind({});
WithValue.args = {
  contents: STATUS.map((status, index) => ({
    status,
    value: index + 1,
  })),
};

WithValue.parameters = {
  docs: {
    description: {
      story: "`value` を指定することで Point 上に値を表示することができます。",
    },
    source: {
      code: `
<script lang="ts" setup>
const const baseContents = [
  { status: "done", value="1" },
  { status: "active",value="2" },
  { status: "inactive",value="3" },
  { status: "none", value="4"},
  { status: "pending", value="5"},
  { status: "dead",value="6" },
];
</script>
<template>
  <div style="padding: 100px;">
    <WizProgressBar :contents="baseContents" />
  </div>
</template>
      `,
    },
  },
};

export const WithProgress = Template.bind({});
WithProgress.args = {
  contents: STATUS.map((status, index) => ({
    status,
    progress: [1, 3, 4].includes(index),
  })),
};
WithProgress.parameters = {
  docs: {
    description: {
      story:
        "`progress` を指定することで、指定した Bar をアクティブ化することができます。",
    },
    source: {
      code: `
<script lang="ts" setup>
const const baseContents = [
  { status: "done", progres=true },
  { status: "active",  },
  { status: "inactive", progress=true },
  { status: "none", progress=true},
  { status: "pending" },
  { status: "dead" },
];
</script>
<template>
  <div style="padding: 100px;">
    <WizProgressBar :contents="baseContents" />
  </div>
</template>
      `,
    },
  },
};

export const WithTooltip = Template.bind({});
WithTooltip.args = {
  contents: STATUS.map((status, index) => ({
    status,
    tooltip: `Tooltip ${index + 1}`,
  })),
};
WithTooltip.parameters = {
  docs: {
    description: {
      story:
        "`tooltip` を指定することで、ホバー時に ポップアップ を表示することができます。",
    },
    source: {
      code: `
<script lang="ts" setup>
const const baseContents = [
  { status: "done", tooltip="Tooltip 1" },
  { status: "active", tooltip="Tooltip 2" },
  { status: "inactive", tooltip="Tooltip 3" },
  { status: "none", tooltip="Tooltip 4" },
  { status: "pending", tooltip="Tooltip 5"},
  { status: "dead", tooltip="Tooltip 6" },
];
</script>
<template>
  <div style="padding: 100px;">
    <WizProgressBar :contents="baseContents" />
  </div>
</template>
      `,
    },
  },
};

export const WithLabel = Template.bind({});
WithLabel.args = {
  contents: STATUS.map((status, index) => ({
    status,
    label: `Label ${index + 1}`,
  })),
};
WithLabel.parameters = {
  docs: {
    description: {
      story:
        "`label` を指定することで、Progress の下側に ラベル を表示することができます。",
    },
    source: {
      code: `
<script lang="ts" setup>
const const baseContents = [
  { status: "done", label="Label 1" },
  { status: "active", label="Label 2" },
  { status: "inactive", label="Label 3" },
  { status: "none", label="Label 4" },
  { status: "pending", label="Label 5"},
  { status: "dead", label="Label 6" },
];
</script>
<template>
  <div style="padding: 100px;">
    <WizProgressBar :contents="baseContents" />
  </div>
</template>
      `,
    },
  },
};

export const WithAnnotation = Template.bind({});
WithAnnotation.args = {
  contents: STATUS.map((status, index) => ({
    status,
    annotation: `Annotation ${index + 1}`,
  })),
};
WithAnnotation.parameters = {
  docs: {
    description: {
      story:
        "`annnotation` を指定することで、Progress の上側に ラベル を表示することができます。`label` と異なり、赤文字で強調された文字が表示されます。 ",
    },
    source: {
      code: `
<script lang="ts" setup>
const const baseContents = [
  { status: "done", annotation="Annotation 1" },
  { status: "active", annotation="Annotation 2" },
  { status: "inactive", annotation="Annotation 3" },
  { status: "none", annotation="Annotation 4"},
  { status: "pending", annotation="Annotation 5"},
  { status: "dead", annotation="Annotation 6" },
];
</script>
<template>
  <div style="padding: 100px;">
    <WizProgressBar :contents="baseContents" />
  </div>
</template>
      `,
    },
  },
};

export const WithAll = Template.bind({});
WithAll.args = {
  contents: STATUS.map((status, index) => ({
    status,
    value: index + 1,
    progress: [1, 3, 4].includes(index),
    tooltip: `Tooltip ${index + 1}`,
    label: `Label ${index + 1}`,
    annotation: `Annotation ${index + 1}`,
  })),
};
WithAll.parameters = {
  docs: {
    source: {
      code: `
<script lang="ts" setup>
const const baseContents = [
  { status: "done", value="1",progress=true, tooltip="Tooltip 1", label="Label 1", annotation="Annotation 1" },
  { status: "active",value="2", tooltip="Tooltip 2", label="Label 2", annotation="Annotation 2" },
  { status: "inactive",value="3",progress=true, tooltip="Tooltip 3", label="Label 3", annotation="Annotation 3" },
  { status: "none", value="4",progress=true, tooltip="Tooltip 4", label="Label 4", annotation="Annotation 4"},
  { status: "pending", value="5", tooltip="Tooltip 5", label="Label 5", annotation="Annotation 5"},
  { status: "dead",value="6", tooltip="Tooltip 6", label="Label 6", annotation="Annotation 6" },
];
</script>
<template>
  <div style="padding: 100px;">
    <WizProgressBar :contents="baseContents" />
  </div>
</template>
      `,
    },
  },
};
