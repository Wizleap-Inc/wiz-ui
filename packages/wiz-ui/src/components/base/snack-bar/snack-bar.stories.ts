import { Meta, StoryFn } from "@storybook/vue";

import WizSnackBar from "./snack-bar.vue";

export default {
  title: "Base/SnackBar",
  component: WizSnackBar,
  argTypes: {
    duration: {
      control: { type: "number" },
    },
  },
} as Meta<typeof WizSnackBar>;

const Template: StoryFn<typeof WizSnackBar> = (_, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { WizSnackBar },
  setup() {
    const click = () => {};
    return { click };
  },
  template: `
    <div>
      <button @click="click">Show Snackbar</button>
      <WizSnackBar v-bind="$props">
        SnackBar Content
      </WizSnackBar>
    </div>
  `,
});

export const Default = Template.bind({});
