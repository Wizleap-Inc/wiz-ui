import { COLOR_MAP_ACCESSORS } from "./../../../constants/styles/color";
import { FONT_SIZE_ACCESSORS } from "./../../../constants/styles/fontSize";
import WizHeading from "./heading.vue";

import type { Story } from "@storybook/vue-vite";

export default {
  title: "Atoms/Heading",
  component: WizHeading,
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
        options: FONT_SIZE_ACCESSORS,
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
  components: { WizHeading },
  template: `<WizHeading v-bind="$props">{{ slot }}</WizHeading>`,
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
  components: { WizHeading },
  setup() {
    return {
      sampleHeadingTexts,
    };
  },
  template: `
    <table>
      <tr v-for="[level, text] in Object.entries(sampleHeadingTexts)" :key="level">
        <td style="padding: 1rem;">H{{ level }}</td>
        <td style="padding: 1rem;"><WizHeading :level="+level">{{ text }}</WizHeading></td>
      </tr>
    </table>
  `,
})).bind({});

export const Color = Template.bind({});
Color.args = {
  color: "green.800",
  slot: "Heading",
};
