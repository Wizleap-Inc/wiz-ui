import { StoryFn, Meta } from "@storybook/vue3";
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
  },
  decorators: [
    () => ({
      template: `<story />`,
    }),
  ],
} as Meta<typeof WizHeader>;

const Template: StoryFn<typeof WizHeader> = (args) => ({
  components: { WizHeader },
  setup: () => ({ args }),
  template: `
    <wiz-header v-bind="$props"/>
  `,
});

export const Default = Template.bind({});

const LeftSlotTemplate: StoryFn<typeof WizHeader> = (args) => ({
  components: { WizHeader, WizTextButton },
  setup: () => ({ args }),
  template: `
    <wiz-header v-bind="$props">
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

const RightSlotTemplate: StoryFn<typeof WizHeader> = (args) => ({
  components: { WizHeader, WizTextButton },
  setup: () => ({ args }),
  template: `
    <wiz-header v-bind="$props">
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

export const Fixed: StoryFn<typeof WizHeader> = (args) => ({
  components: { WizHeader, WizTextButton },
  setup: () => ({ args }),
  template: `
    <div style="height: 200vh">
      <wiz-header sticky>
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
