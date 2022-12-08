import { StoryFn } from "@storybook/vue";

import { WizProgressPoint } from ".";

export default {
  title: "Base/Progress/Point",
  component: WizProgressPoint,
  argTypes: {
    status: {
      control: {
        type: "select",
        options: ["done", "active", "inactive", "pending", "dead", "none"],
      },
    },
    value: {
      control: { type: "number" },
    },
  },
};

const Template: StoryFn = (_, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { WizProgressPoint },
  template: `
    <WizProgressPoint v-bind="$props"/>
  `,
});

const MultipleTemplate: StoryFn = (_, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { WizProgressPoint },
  template: `
    <div style="display: flex; justify-content: space-between; width: 100%;">
      <WizProgressPoint v-bind="$props" status="done"/>
      <WizProgressPoint v-bind="$props" status="active"/>
      <WizProgressPoint v-bind="$props" status="inactive"/>
      <WizProgressPoint v-bind="$props" status="pending"/>
      <WizProgressPoint v-bind="$props" status="dead"/>
      <WizProgressPoint v-bind="$props" status="none"/>
    </div>
  `,
});

export const Done = Template.bind({});
Done.args = {
  status: "done",
};

export const Active = Template.bind({});
Active.args = {
  status: "active",
};

export const Inactive = Template.bind({});
Inactive.args = {
  status: "inactive",
};

export const Pending = Template.bind({});
Pending.args = {
  status: "pending",
};

export const Dead = Template.bind({});
Dead.args = {
  status: "dead",
};

export const None = Template.bind({});
None.args = {
  status: "none",
};

export const WithValue = MultipleTemplate.bind({});
WithValue.args = {
  value: 1,
};
