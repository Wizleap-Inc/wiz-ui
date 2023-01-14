import { StoryFn } from "@storybook/vue";
import {
  COLOR_MAP_ACCESSORS,
  SPACING_ACCESSORS,
} from "@wizleap-inc/wiz-ui-constants";
import Vue from "vue";

import { WizAvatar, WizIcon, WizIconButton } from "@/components";
import { WizINotification } from "@/components/icons";

import { WizBadge } from ".";

export default {
  title: "Base/Badge",
  component: WizBadge,
  argTypes: {
    hidden: {
      control: { type: "boolean" },
    },
    label: {
      control: { type: "text" },
    },
    color: {
      control: { type: "select" },
      options: COLOR_MAP_ACCESSORS,
    },
    bgColor: {
      control: { type: "select" },
      options: COLOR_MAP_ACCESSORS,
    },
    offset: {
      control: { type: "select" },
      options: SPACING_ACCESSORS,
    },
    size: {
      control: { type: "select" },
      options: ["sm", "md", "lg"],
    },
  },
};

const Template: StoryFn = (_, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { WizBadge },
  template: `<WizBadge v-bind="$props"><component :is="slotDefault" /></WizBadge>`,
});

const sampleBadgedComponents = Vue.component("SampleBadgedComponents", {
  components: { WizAvatar },
  template: `<WizAvatar src="./public/images/avatar-1.png" alt="avatar" />`,
});

export const Default = Template.bind({});
Default.args = {
  slotDefault: sampleBadgedComponents,
};

export const Hidden = Template.bind({});
Hidden.args = {
  hidden: true,
  slotDefault: sampleBadgedComponents,
};

export const WithLabel = Template.bind({});
WithLabel.args = {
  label: "99+",
  slotDefault: sampleBadgedComponents,
};

export const WithOffset: StoryFn = () => ({
  components: { WizBadge, WizAvatar },
  setup: () => ({
    SPACING_ACCESSORS,
  }),
  template: `
    <div style="display: grid; grid-template-columns: max-content max-content; grid-gap: 1rem; align-items: center;">
      <template v-for="offset in SPACING_ACCESSORS">
        <div>Offset = {{ offset }}</div>
        <WizBadge label="99+" :offset="offset">
          <WizAvatar src="./public/images/avatar-1.png" alt="avatar" />
        </WizBadge>
      </template>
    </div>
  `,
});

export const WithColor: StoryFn = () => ({
  components: { WizBadge, WizAvatar },
  setup: () => ({
    COLOR_MAP_ACCESSORS,
  }),
  template: `
    <div style="display: grid; grid-template-columns: max-content max-content; grid-gap: 1rem; align-items: center;">
      <template v-for="color in COLOR_MAP_ACCESSORS">
        <div>Color = {{ color }}</div>
        <WizBadge label="99+" :color="color">
          <WizAvatar src="./public/images/avatar-1.png" alt="avatar" />
        </WizBadge>
      </template>
    </div>
  `,
});

export const WithBgColor: StoryFn = () => ({
  components: { WizBadge, WizAvatar },
  setup: () => ({
    COLOR_MAP_ACCESSORS,
  }),
  template: `
    <div style="display: grid; grid-template-columns: max-content max-content; grid-gap: 1rem; align-items: center;">
      <template v-for="bgColor in COLOR_MAP_ACCESSORS">
        <div>Background Color = {{ bgColor }}</div>
        <WizBadge label="99+" :bg-color="bgColor">
          <WizAvatar src="./public/images/avatar-1.png" alt="avatar" />
        </WizBadge>
      </template>
    </div>
  `,
});

export const WithSize: StoryFn = () => ({
  components: { WizBadge, WizAvatar },
  setup: () => ({
    SIZES: ["sm", "md", "lg"],
  }),
  template: `
    <div style="display: grid; grid-template-columns: max-content max-content; grid-gap: 1rem; align-items: center;">
      <template v-for="size in SIZES">
        <div>Size = {{ size }}</div>
        <WizBadge label="99+" :size="size">
          <WizAvatar src="./public/images/avatar-1.png" alt="avatar" />
        </WizBadge>
      </template>
    </div>
  `,
});

export const WithSlot: StoryFn = () => ({
  components: { WizBadge, WizAvatar, WizIcon },
  setup: () => ({
    WizINotification,
  }),
  template: `
    <div style="display: grid; grid-template-columns: max-content max-content; grid-gap: 1rem; align-items: center;">
      <div>Slot = WizIcon</div>
      <WizBadge label="99+">
        <WizIcon :icon="WizINotification" size="xl6" />
      </WizBadge>
      <div>Slot = WizAvatar</div>
      <WizBadge label="99+" size="sm">
        <WizAvatar src="./public/images/avatar-1.png" alt="avatar" />
      </WizBadge>

    </div>
  `,
});

export const WithIconButton: StoryFn<typeof WizBadge> = (_, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { WizBadge, WizIconButton, WizIcon },
  setup: () => ({
    WizINotification,
  }),
  template: `
  <WizBadge label="99+">
    <WizIconButton size="xl4" :icon="WizINotification" variant="transparent"/>
  </WizBadge>
  `,
});
