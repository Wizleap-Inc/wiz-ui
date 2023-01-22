import { StoryFn, Meta } from "@storybook/vue3";
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
} as Meta<typeof WizHeading>;

const HEADING_LIST = [1, 2, 3, 4, 5, 6];

export const Level: StoryFn<typeof WizHeading> = (args) => ({
  components: { WizHeading },
  setup: () => ({
    HEADING_LIST,
    args,
  }),
  template: `
    <table>
      <tr v-for="heading in HEADING_LIST" :key="heading">
        <td style="padding: 1rem;">level = {{ heading }}</td>
        <td style="padding: 1rem;"><WizHeading :level="heading">Level{{ heading }}の見出し</WizHeading></td>
      </tr>
    </table>
  `,
});
Level.parameters = {
  docs: {
    description: {
      story:
        "Heading のコンテンツデータを`h1` ~ `h6` で変更することができます。選択肢は 1 ~ 6 から指定することができます。",
    },
    source: {
      code: `
<template>
  <table>
      <tr v-for="heading in HEADING_LIST" :key="heading">
        <td style="padding: 1rem;">level = {{ heading }}</td>
        <td style="padding: 1rem;"><WizHeading :level="heading">Level{{ heading }}の見出し</WizHeading></td>
      </tr>
    </table>
</template>
      `,
    },
  },
};

export const Color: StoryFn<typeof WizHeading> = (args) => ({
  components: { WizHeading },
  setup: () => ({
    COLOR_MAP_ACCESSORS,
    args,
  }),
  template: `
    <table>
      <tr v-for="color in COLOR_MAP_ACCESSORS" :key="color">
        <td style="padding: 1rem;">{{ color }}</td>
        <td style="padding: 1rem;"><WizHeading :color="color">{{ color }}の見出し</WizHeading></td>
      </tr>
    </table>
  `,
});
Color.parameters = {
  docs: {
    description: {
      story:
        "文字色を変更することができます。選択肢はColorKeyから指定することができます。",
    },
    source: {
      code: `
<template>
  <table>
    <tr v-for="color in COLOR_MAP_ACCESSORS" :key="color">
      <td style="padding: 1rem;">{{ color }}</td>
      <td style="padding: 1rem;"><WizHeading :color="color">{{ color }}の見出し</WizHeading></td>
    </tr>
  </table>
</template>
      `,
    },
  },
};

export const FontSize: StoryFn<typeof WizHeading> = (args) => ({
  components: { WizHeading },
  setup: () => ({
    FONT_SIZE_ACCESSORS,
    args,
  }),
  template: `
    <table>
      <tr v-for="fontSize in FONT_SIZE_ACCESSORS" :key="fontSize">
        <td style="padding: 1rem;">{{ fontSize }}</td>
        <td style="padding: 1rem;"><WizHeading :fontSize="fontSize">{{ fontSize }}の見出し</WizHeading></td>
      </tr>
    </table>
  `,
});

FontSize.parameters = {
  docs: {
    description: {
      story:
        "文字色を変更することができます。選択肢はColorKeyから指定することができます。",
    },
    source: {
      code: `
<template>
  <table>
    <tr v-for="color in COLOR_MAP_ACCESSORS" :key="color">
      <td style="padding: 1rem;">{{ color }}</td>
      <td style="padding: 1rem;"><WizHeading :color="color">{{ color }}の見出し</WizHeading></td>
    </tr>
  </table>
</template>
      `,
    },
  },
};

export const Test: StoryFn<typeof WizHeading> = (args) => ({
  components: { WizHeading },
  setup: () => ({
    args,
  }),
  template: `
    <WizHeading fontSize="sm" color="gray.900" padding="0 1rem">
      案件配信
    </WizHeading>
  `,
});
