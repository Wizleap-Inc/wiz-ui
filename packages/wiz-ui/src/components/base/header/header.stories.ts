import { StoryFn } from "@storybook/vue";
import { provide } from "vue";

import { WizTextButton } from "@/components";
import { THEME } from "@/constants";
import { SPACING_ACCESSORS } from "@/constants/styles/spacing";
import { globalKey, useGlobalProvider } from "@/providers";

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
    (story: StoryFn) => ({
      components: { story },
      setup() {
        provide(globalKey, useGlobalProvider());
      },
      template: `<story />`,
    }),
  ],
};

const Template: StoryFn = (_, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { WizHeader },
  template: `
    <wiz-header v-bind="$props"/>
  `,
});

export const Default = Template.bind({});

const LeftSlotTemplate: StoryFn = (_, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { WizHeader, WizTextButton },
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

const RightSlotTemplate: StoryFn = (_, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { WizHeader, WizTextButton },
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

export const Fixed: StoryFn = () => ({
  components: { WizHeader, WizTextButton },
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
