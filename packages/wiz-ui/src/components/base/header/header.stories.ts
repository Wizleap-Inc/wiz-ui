import { StoryFn } from "@storybook/vue";
import { THEME, SPACING_ACCESSORS } from "@wizleap-inc/wiz-ui-constants";

import { WizTextButton } from "@/components";

import { WizHeader } from ".";

export default {
  title: "Base/Header",
  component: WizHeader,
  argTypes: {
    gapLeft: {
      control: { type: "select" },
      options: SPACING_ACCESSORS,
    },
    gapRight: {
      control: { type: "select" },
      options: SPACING_ACCESSORS,
    },
    sticky: {
      control: { type: "boolean" },
    },
    onToggle: {
      action: "click",
    },
  },
  decorators: [
    (story: StoryFn) => ({
      components: { story },
      template: `<story />`,
    }),
  ],
};

const Template: StoryFn = (_, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { WizHeader },
  template: `
    <wiz-header v-bind="$props" @onToggle="onToggle('menu')" />
  `,
});

export const Default = Template.bind({});

const LeftSlotTemplate: StoryFn = (_, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { WizHeader, WizTextButton },
  template: `
    <wiz-header v-bind="$props" @onToggle="onToggle('menu')">
      <template #left>
        <wiz-text-button>Click</wiz-text-button>
        <wiz-text-button>Click</wiz-text-button>
        <wiz-text-button>Click</wiz-text-button>
      </template>
    </wiz-header>
  `,
});

export const LeftSlot = LeftSlotTemplate.bind({});
export const LeftSlotWithGap = LeftSlotTemplate.bind({});
LeftSlotWithGap.args = {
  gapLeft: "sm",
};

const RightSlotTemplate: StoryFn = (_, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { WizHeader, WizTextButton },
  template: `
    <wiz-header v-bind="$props" @onToggle="onToggle('menu')">
      <template #right>
        <wiz-text-button>Click</wiz-text-button>
        <wiz-text-button>Click</wiz-text-button>
        <wiz-text-button>Click</wiz-text-button>
      </template>
    </wiz-header>
  `,
});

export const RightSlot = RightSlotTemplate.bind({});
export const RightSlotWithGap = RightSlotTemplate.bind({});
RightSlotWithGap.args = {
  gapRight: "sm",
};

export const Fixed: StoryFn = (_, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { WizHeader, WizTextButton },
  template: `
    <div style="height: 200vh">
      <wiz-header @onToggle="onToggle('menu')" sticky>
        <template #left>
          <wiz-text-button>Click</wiz-text-button>
          <wiz-text-button>Click</wiz-text-button>
          <wiz-text-button>Click</wiz-text-button>
        </template>
        <template #right>
          <wiz-text-button>Click</wiz-text-button>
          <wiz-text-button>Click</wiz-text-button>
          <wiz-text-button>Click</wiz-text-button>
        </template>
      </wiz-header>
      <div style="margin-top: ${THEME.share.HEADER_HEIGHT};">
        <h1>Scroll down</h1>
      </div>
    </div>
  `,
});
