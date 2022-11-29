import { StoryFn } from "@storybook/vue";

import { WizTab, WizTabPane } from ".";

export default {
  title: "Base/Tab",
  component: WizTab,
  subcomponents: { WizTabPane },
};

const Template: StoryFn = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { WizTab, WizTabPane },
  template: `
    <WizTab v-bind="$props">
      <WizTabPane label="Tab 1">Content 1</WizTabPane>
      <WizTabPane label="Tab 2">Content 2</WizTabPane>
      <WizTabPane label="Tab 3">Content 3</WizTabPane>
    </WizTab>
  `,
});

export const Default = Template.bind({});
Default.args = {
  gap: "md",
};
