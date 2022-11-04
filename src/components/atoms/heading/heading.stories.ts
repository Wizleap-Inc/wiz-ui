import Heading from "./heading.vue";

import type { Story } from "@storybook/vue";

export default {
  title: "Atoms/Heading",
  component: Heading,
  argTypes: {
    level: {
      control: {
        type: "select",
        options: [1, 2, 3, 4, 5, 6],
      },
    },
  },
};

const Template: Story = (_, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { Heading },
  template: `<Heading v-bind="$props">{{ slot }}</Heading>`,
});

export const Default = Template.bind({});
Default.args = {
  slot: "案件管理",
};

export const H1 = Template.bind({});
H1.args = {
  level: 1,
  slot: "案件管理",
};

export const H2 = Template.bind({});
H2.args = {
  level: 2,
  slot: "初回面談前",
};

export const H3 = Template.bind({});
H3.args = {
  level: 3,
  slot: "契約・最終意向把握",
};

export const H4 = Template.bind({});
H4.args = {
  level: 4,
  slot: "現在のステータス",
};

export const H5 = Template.bind({});
H5.args = {
  level: 5,
  slot: "Level5の見出し",
};

export const H6 = Template.bind({});
H6.args = {
  level: 6,
  slot: "Level6の見出し",
};
