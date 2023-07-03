import { Meta, StoryFn } from "@storybook/vue";

import { WizFullModalView } from ".";

export default {
  title: "Base/FullModalView",
  component: WizFullModalView,
  argTypes: {},
} as Meta<typeof WizFullModalView>;

const Template: StoryFn<typeof WizFullModalView> = (args) => ({
  components: { WizFullModalView },
  setup() {
    return { args };
  },
  template: `
    <div>
     <WizFullModalView v-bind="args"/> 
    </div>
  `,
});

export const Default = Template.bind({});
