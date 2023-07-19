import { Meta, StoryFn } from "@storybook/vue3";
import { SPACING_ACCESSORS } from "@wizleap-inc/wiz-ui-constants";
import { ref } from "vue";

import { WizTab } from ".";

export default {
  title: "Base/Tab/Tab",
  component: WizTab,
  argTypes: {
    gap: {
      control: { type: "select" },
      options: SPACING_ACCESSORS,
    },
    items: {
      control: { type: "array" },
    },
    width: {
      control: { type: "text" },
    },
    center: {
      control: { type: "boolean" },
    },
    value: {
      control: { type: "text" },
    },
    input: {
      action: "update:modelValue",
    },
  },
} as Meta<typeof WizTab>;

const Template: StoryFn<typeof WizTab> = (args) => ({
  components: { WizTab },
  setup: () => ({ args }),
  template: `
    <WizTab v-bind="args" @update:modelValue="args.input" />
  `,
});

const items = [
  {
    label: "ほげほげ",
    name: "hoge",
  },
  {
    label: "ふがふが",
    name: "fuga",
  },
  {
    label: "ぴよぴよ",
    name: "piyo",
  },
];

export const Default = Template.bind({});
Default.args = {
  items,
};

export const Gap = Template.bind({});
Gap.args = {
  gap: "sm",
  items,
};

export const Width = Template.bind({});
Width.args = {
  width: "200px",
  items,
};

export const Center = Template.bind({});
Center.args = {
  width: "200px",
  center: true,
  items,
};

export const Playground: StoryFn<typeof WizTab> = (args) => ({
  components: {
    WizTab,
  },
  setup() {
    const activeTab = ref("hoge");
    const tabItems = [
      {
        label: "Basic",
        name: "basic",
      },
      {
        label: "Notification",
        name: "notification",
        notificationCount: 10,
      },
      {
        label: "Disabled",
        name: "disabled",
        disabled: true,
      },
    ];
    return {
      activeTab,
      tabItems,
      args,
    };
  },
  template: `
    <div>
      <WizTab v-model="activeTab" :items="tabItems" @update:modelValue="args.input" v-bind="args" />
      <div v-if="activeTab === 'basic'">Basicの中身</div>
      <div v-else-if="activeTab === 'notification'">Notificationの中身</div>
      <div v-else-if="activeTab === 'disabled'">Disabledの中身</div>
    </div>
  `,
});
