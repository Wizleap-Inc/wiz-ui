import { StoryFn } from "@storybook/vue";
import { ref } from "vue";

import { WizPanelSwitch } from ".";

export default {
  title: "Base/Input/ToggleSwitch",
  component: WizPanelSwitch,
  argTypes: {},
};
const Template: StoryFn = (_, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { WizPanelSwitch },
  setup() {
    const value = ref("");
    return { value };
  },
  template: `
  <div>
    <p>入力値：{{ value }}</p>
    <WizPanelSwitch v-bind="$props" v-model="value" />
  </div>
`,
});

export const Default = Template.bind({});
Default.args = {};
