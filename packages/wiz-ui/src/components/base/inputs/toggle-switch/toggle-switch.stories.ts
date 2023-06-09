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
    const value2 = ref(true);
    return { value, value2 };
  },
  template: `
  <div>
    <p>入力値：{{ value }}</p>
    <WizToggleSwitch v-bind="$props" v-model="value" />
    <div style="{margin: '40px'}"/>
    <p>入力値：{{ value2 }}</p>
    <WizToggleSwitch v-bind="$props" v-model="value2" />
  </div>
`,
});

export const Default = Template.bind({});
Default.args = {};
