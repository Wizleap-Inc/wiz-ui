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
Done.parameters = {
  docs: {
    source: {
      code: `
<template>
  <WizProgressPoint status="done"/>
</template>
      `,
    },
  },
};

export const Active = Template.bind({});
Active.args = {
  status: "active",
};
Active.parameters = {
  docs: {
    source: {
      code: `
<template>
  <WizProgressPoint status="active"/>
</template>
      `,
    },
  },
};

export const Inactive = Template.bind({});
Inactive.args = {
  status: "inactive",
};
Inactive.parameters = {
  docs: {
    description: {
      story:
        "`direction` を指定することで、Popup を出す方向を変えることができます。指定できる値は以下の例の通り。",
    },
    source: {
      code: `
<template>
  <WizProgressPoint status="inactive"/>
</template>
      `,
    },
  },
};

export const Pending = Template.bind({});
Pending.args = {
  status: "pending",
};
Pending.parameters = {
  docs: {
    source: {
      code: `
<template>
  <WizProgressPoint status="pending"/>
</template>
      `,
    },
  },
};

export const Dead = Template.bind({});
Dead.args = {
  status: "dead",
};
Dead.parameters = {
  docs: {
    source: {
      code: `
<template>
  <WizProgressPoint status="dead"/>
</template>
      `,
    },
  },
};

export const None = Template.bind({});
None.args = {
  status: "none",
};
None.parameters = {
  docs: {
    source: {
      code: `
<template>
  <WizProgressPoint status="none"/>
</template>
      `,
    },
  },
};

export const WithValue = MultipleTemplate.bind({});
WithValue.args = {
  value: 1,
};
WithValue.parameters = {
  docs: {
    description: {
      story: "`value` を指定することで Point 上に値を表示することができます。",
    },
    source: {
      code: `
<template>
  <div style="display: flex; justify-content: space-between; width: 100%;">
    <WizProgressPoint value="1" status="done"/>
    <WizProgressPoint value="1" status="active"/>
    <WizProgressPoint value="1" status="inactive"/>
    <WizProgressPoint value="1" status="pending"/>
    <WizProgressPoint value="1" status="dead"/>
    <WizProgressPoint value="1" status="none"/>
  </div>
</template>
      `,
    },
  },
};
