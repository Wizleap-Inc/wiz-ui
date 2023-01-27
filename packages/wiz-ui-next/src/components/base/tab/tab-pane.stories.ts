import { StoryFn, Meta } from "@storybook/vue3";

import TabPane from "./tab-pane.vue";

export default {
  title: "Base/Tab/Pane",
  component: TabPane,
  argTypes: {
    label: {
      control: { type: "text" },
    },
    active: {
      control: { type: "boolean" },
    },
    disabled: {
      control: { type: "boolean" },
    },
    notificationCount: {
      control: { type: "number" },
    },
    width: {
      control: { type: "text" },
    },
    click: {
      action: "click",
    },
  },
} as Meta<typeof TabPane>;

const Template: StoryFn<typeof TabPane> = (args) => ({
  components: { TabPane },
  setup: () => ({ args }),
  template: `
    <TabPane v-bind="args" @click="click" />
  `,
});

export const Default = Template.bind({});
Default.args = {
  label: "ほげほげ",
};
Default.parameters = {
  docs: {
    source: {
      code: `
<template>
  <TabPane label="ほげほげ" @click="click" />
</template>
      `,
    },
  },
};

export const Active = Template.bind({});
Active.args = {
  label: "ほげほげ",
  active: true,
};
Active.parameters = {
  docs: {
    description: {
      story:
        "Active を設定することで、常にアクティブ化することもできます。 default 値は `false` です。",
    },
    source: {
      code: `
<template>
  <TabPane label="ほげほげ" active @click="click" />
</template>
      `,
    },
  },
};

export const Disabled = Template.bind({});
Disabled.args = {
  label: "ほげほげ",
  disabled: true,
};
Disabled.parameters = {
  docs: {
    description: {
      story: "Disabled に指定することができます。",
    },
    source: {
      code: `
<template>
  <TabPane label="ほげほげ" disabled @click="click" />
</template>
      `,
    },
  },
};

export const NotificationCount = Template.bind({});
NotificationCount.args = {
  label: "ほげほげ",
  notificationCount: 10,
};
NotificationCount.parameters = {
  docs: {
    description: {
      story:
        "`notificationCount` を指定することで、Tab に Notification を付与することができます。",
    },
    source: {
      code: `
<template>
  <TabPane label="ほげほげ" notificationCount="10" @click="click" />
</template>
      `,
    },
  },
};

export const Width = Template.bind({});
Width.args = {
  label: "ほげほげ",
  width: "100px",
};
Width.parameters = {
  docs: {
    description: {
      story: "`width` を指定することで、幅を指定することができます。",
    },
    source: {
      code: `
<template>
  <TabPane label="ほげほげ" width="100px" @click="click" />
</template>
      `,
    },
  },
};
