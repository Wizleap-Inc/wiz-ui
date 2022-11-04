import { COLOR_MAP_ACCESSORS } from "./../../../constants/styles/color";
import { FONT_SIZE_MAP } from "./../../../constants/styles/fontSize";
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
    fontSize: {
      control: {
        type: "select",
        options: Object.keys(FONT_SIZE_MAP),
      },
    },
    color: {
      control: {
        type: "select",
        options: COLOR_MAP_ACCESSORS,
      },
    },
  },
};

const Template: Story = (_, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { Heading },
  template: `<Heading v-bind="$props">{{ slot }}</Heading>`,
});

const sampleHeadingTexts = {
  1: "案件管理",
  2: "初回面談前",
  3: "契約・最終意向把握",
  4: "現在のステータス",
  5: "Level5の見出し",
  6: "Level6の見出し",
};

export const Overview = ((_, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { Heading },
  setup() {
    return {
      sampleHeadingTexts,
    };
  },
  template: `
    <table>
      <tr v-for="[level, text] in Object.entries(sampleHeadingTexts)" :key="level">
        <td style="padding: 1rem;">H{{ level }}</td>
        <td style="padding: 1rem;"><Heading :level="+level">{{ text }}</Heading></td>
      </tr>
    </table>
  `,
})).bind({});

export const Color = Template.bind({});
Color.args = {
  color: "green.800",
  slot: "Heading",
};
