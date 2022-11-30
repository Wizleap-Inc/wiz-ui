import { StoryFn } from "@storybook/vue";
import { ref } from "vue";

import { WizToggleSwitch } from ".";

export default {
  title: "Base/Input/ToggleSwitch",
  component: WizToggleSwitch,
  argTypes: {},
};

const Template: StoryFn = (_, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { WizToggleSwitch },
  setup() {
    const value = ref(false);
    return { value };
  },
  template: `
  <div>
    <p>入力値：{{ value }}</p>
    <WizToggleSwitch v-bind="$props" v-model="value" />
  </div>
`,
});

export const Default = Template.bind({});
Default.args = {};
