import { StoryFn } from "@storybook/vue";
import {
  COLOR_MAP_ACCESSORS,
  FONT_SIZE_ACCESSORS,
} from "@wizleap-inc/wiz-ui-constants";

import { WizINotification } from "@/components/icons";
import * as Icons from "@/components/icons";

import { WizIcon } from ".";

export default {
  title: "Base/Icon",
  component: WizIcon,
  argTypes: {
    size: {
      control: { type: "select" },
      options: FONT_SIZE_ACCESSORS,
    },
    color: {
      control: { type: "select" },
      options: COLOR_MAP_ACCESSORS,
    },
    icon: {
      control: { type: "object" },
    },
  },
};

const Template: StoryFn = (_, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { WizIcon },
  template: `<WizIcon v-bind="$props" />`,
});

export const Default = Template.bind({});
Default.args = {
  icon: WizINotification,
};
Default.parameters = {
  docs: {
    source: {
      code: `
<template>
  <WizIcon :icon="WizNotification" />
</template>
      `,
    },
  },
};

export const Size: StoryFn = () => ({
  components: { WizIcon },
  setup: () => ({
    FONT_SIZE_ACCESSORS,
    WizINotification,
  }),
  template: `
    <div style="display: grid; grid-template-columns: max-content max-content; grid-gap: 1rem; align-items: center;">
      <template v-for="size in FONT_SIZE_ACCESSORS">
        <div>Size = {{ size }}</div>
        <WizIcon :icon="WizINotification" :size="size" />
      </template>
    </div>
  `,
});
Size.parameters = {
  docs: {
    description: {
      story:
        "Icon のサイズを指定することができます。選択肢はVariablesのFontSizeを参照してください。",
    },
    source: {
      code: `
<template>
  <div style="display: grid; grid-template-columns: max-content max-content; grid-gap: 1rem; align-items: center;">
    <template v-for="size in FONT_SIZE_ACCESSORS">
      <div>Size = {{ size }}</div>
      <WizIcon :icon="WizINotification" :size="size" />
    </template>
  </div>
</template>
      `,
    },
  },
};

export const Color: StoryFn = () => ({
  components: { WizIcon },
  setup: () => ({
    COLOR_MAP_ACCESSORS,
    WizINotification,
  }),
  template: `
    <div style="display: grid; grid-template-columns: max-content max-content; grid-gap: 1rem; align-items: center;">
      <template v-for="color in COLOR_MAP_ACCESSORS">
        <div>Color = {{ color }}</div>
        <WizIcon :icon="WizINotification" :color="color" />
      </template>
    </div>
  `,
});
Color.parameters = {
  docs: {
    description: {
      story:
        "Icon の色を指定することができます。選択肢はVariablesのColorKeysを参照してください。",
    },
    source: {
      code: `
<template>
  <div style="display: grid; grid-template-columns: max-content max-content; grid-gap: 1rem; align-items: center;">
    <template v-for="color in COLOR_MAP_ACCESSORS">
      <div>Color = {{ color }}</div>
      <WizIcon :icon="WizINotification" :color="color" />
    </template>
  </div>
</template>
      `,
    },
  },
};

export const Icon: StoryFn = () => ({
  components: { WizIcon },
  setup: () => ({
    Icons,
  }),
  template: `
    <div style="display: grid; grid-template-columns: max-content max-content; grid-gap: 1rem; align-items: center;">
      <template v-for="icon in Object.values(Icons)">
        <div>Icon = {{ icon.name }}</div>
        <WizIcon :icon="icon" />
      </template>
    </div>
  `,
});
Icon.parameters = {
  docs: {
    description: {
      story: "Icon は次のように指定します。",
    },
    source: {
      code: `
<template>
  <div style="display: grid; grid-template-columns: max-content max-content; grid-gap: 1rem; align-items: center;">
    <template v-for="icon in Object.values(Icons)">
      <div>Icon = {{ icon.name }}</div>
      <WizIcon :icon="icon" />
    </template>
  </div>
</template>
      `,
    },
  },
};
