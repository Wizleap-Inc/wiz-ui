import { StoryFn, Meta } from "@storybook/vue3";

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
} as Meta<typeof WizProgressPoint>;

const Template: StoryFn<typeof WizProgressPoint> = (args) => ({
  components: { WizProgressPoint },
  setup: () => ({ args }),
  template: `
    <WizProgressPoint v-bind="args"/>
  `,
});

const MultipleTemplate: StoryFn<typeof WizProgressPoint> = (args) => ({
  components: { WizProgressPoint },
  setup: () => ({ args }),
  template: `
    <div style="display: flex; justify-content: space-between; width: 100%;">
      <WizProgressPoint v-bind="args" status="done"/>
      <WizProgressPoint v-bind="args" status="active"/>
      <WizProgressPoint v-bind="args" status="inactive"/>
      <WizProgressPoint v-bind="args" status="pending"/>
      <WizProgressPoint v-bind="args" status="dead"/>
      <WizProgressPoint v-bind="args" status="none"/>
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
