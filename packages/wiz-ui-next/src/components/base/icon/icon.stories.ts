import { StoryFn, Meta } from "@storybook/vue3";
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
} as Meta<typeof WizIcon>;

const Template: StoryFn<typeof WizIcon> = (args) => ({
  setup: () => ({ args }),
  components: { WizIcon },
  template: `<WizIcon v-bind="args" />`,
});

export const Default = Template.bind({});
Default.args = {
  icon: WizINotification,
};

export const Size: StoryFn<typeof WizIcon> = (args) => ({
  components: { WizIcon },
  setup: () => ({
    args,
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

export const Color: StoryFn<typeof WizIcon> = (args) => ({
  components: { WizIcon },
  setup: () => ({
    args,
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

export const Icon: StoryFn<typeof WizIcon> = (args) => ({
  components: { WizIcon },
  setup: () => ({
    args,
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
