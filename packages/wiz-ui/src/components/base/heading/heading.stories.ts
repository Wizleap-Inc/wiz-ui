import { StoryFn } from "@storybook/vue";
import {
  COLOR_MAP_ACCESSORS,
  FONT_SIZE_ACCESSORS,
} from "@wizleap-inc/wiz-ui-constants";

import WizHeading from "./heading.vue";

export default {
  title: "Base/Heading",
  component: WizHeading,
  argTypes: {
    level: {
      control: { type: "range", min: 1, max: 6 },
    },
    fontSize: {
      control: { type: "select" },
      options: FONT_SIZE_ACCESSORS,
    },
    color: {
      control: { type: "select" },
      options: COLOR_MAP_ACCESSORS,
    },
  },
};

const HEADING_LIST = [1, 2, 3, 4, 5, 6];

export const Level: StoryFn = (_, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { WizHeading },
  setup() {
    return {
      HEADING_LIST,
    };
  },
  template: `
    <table>
      <tr v-for="heading in HEADING_LIST" :key="heading">
        <td style="padding: 1rem;">level = {{ heading }}</td>
        <td style="padding: 1rem;"><WizHeading :level="heading">Level{{ heading }}の見出し</WizHeading></td>
      </tr>
    </table>
  `,
});

export const Color: StoryFn = (_, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { WizHeading },
  setup() {
    return {
      COLOR_MAP_ACCESSORS,
    };
  },
  template: `
    <table>
      <tr v-for="color in COLOR_MAP_ACCESSORS" :key="color">
        <td style="padding: 1rem;">{{ color }}</td>
        <td style="padding: 1rem;"><WizHeading :color="color">{{ color }}の見出し</WizHeading></td>
      </tr>
    </table>
  `,
});

export const FontSize: StoryFn = (_, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { WizHeading },
  setup() {
    return {
      FONT_SIZE_ACCESSORS,
    };
  },
  template: `
    <table>
      <tr v-for="fontSize in FONT_SIZE_ACCESSORS" :key="fontSize">
        <td style="padding: 1rem;">{{ fontSize }}</td>
        <td style="padding: 1rem;"><WizHeading :fontSize="fontSize">{{ fontSize }}の見出し</WizHeading></td>
      </tr>
    </table>
  `,
});

export const Test: StoryFn = (_, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { WizHeading },
  template: `
    <WizHeading fontSize="sm" color="gray.900" padding="0 1rem">
      案件配信
    </WizHeading>
  `,
});
