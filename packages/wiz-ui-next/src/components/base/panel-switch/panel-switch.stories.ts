import { StoryFn, Meta } from "@storybook/vue3";
import { ref } from "vue";

import { WizPanelSwitch } from ".";

export default {
  title: "Base/PanelSwitch",
  component: WizPanelSwitch,
  argTypes: {
    modelValue: {
      control: { type: "number" },
    },
    input: {
      action: "input",
    },
  },
} as Meta<typeof WizPanelSwitch>;

const Template: StoryFn<typeof WizPanelSwitch> = (args) => ({
  components: { WizPanelSwitch },
  setup() {
    const value = ref(0);
    return { value, args };
  },
  template: `
  <div>
    <p>入力値：{{ value }}</p>
    <WizPanelSwitch v-bind="args" v-model="value" @update:modelValue="args.input"/>
  </div>
`,
});

const items = [
  { label: "test1", value: 1 },
  { label: "test2", value: 2 },
  { label: "test3", value: 3 },
  { label: "test4", value: 4 },
];

export const Default = Template.bind({});
Default.args = {
  items,
};

export const Width = Template.bind({});
Width.args = {
  items,
  width: "300px",
};

const ActiveTemplate: StoryFn<typeof WizPanelSwitch> = (args) => ({
  components: { WizPanelSwitch },
  setup() {
    return { args };
  },
  template: `
  <div>
    <p>入力値：{{ args.modelValue }}</p>
    <WizPanelSwitch v-bind="args" @update:modelValue="args.input"/>
  </div>
`,
});
export const Active = ActiveTemplate.bind({});
Active.args = {
  items,
  modelValue: 1,
};
