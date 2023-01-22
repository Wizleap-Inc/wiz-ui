import { StoryFn, Meta } from "@storybook/vue3";
import { THEME, SPACING_ACCESSORS } from "@wizleap-inc/wiz-ui-constants";
import { provide } from "vue";

import { WizTextButton } from "@/components";
import { globalKey, useGlobalProvider } from "@/hooks/use-global-provider";

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
      setup() {
        provide(globalKey, useGlobalProvider());
      },
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
Default.parameters = {
  docs: {
    source: {
      code: `
<template>
  <wiz-header v-bind="$props"/>
</template>
      `,
    },
  },
};

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
LeftSlot.parameters = {
  docs: {
    description: {
      story: "ヘッダー内部の左側にコンポーネントを設定することができます。",
    },
    source: {
      code: `
<template>
  <wiz-header v-bind="$props">
    <template #left>
      <wiz-text-button>Click</wiz-text-button>
      <wiz-text-button>Click</wiz-text-button>
      <wiz-text-button>Click</wiz-text-button>
    </template>
  </wiz-header>
</template>
      `,
    },
  },
};

export const LeftSlotWithGap = LeftSlotTemplate.bind({});
LeftSlotWithGap.args = {
  gapLeft: "sm",
};
LeftSlotWithGap.parameters = {
  docs: {
    description: {
      story:
        " LeftSlot 内部でgap を指定することができます。選択肢はVariablesのSpacingKeysを参照してください。",
    },
    source: {
      code: `
<template>
  <wiz-header gapLeft="sm">
      <template #left>
        <wiz-text-button>Click</wiz-text-button>
        <wiz-text-button>Click</wiz-text-button>
        <wiz-text-button>Click</wiz-text-button>
      </template>
    </wiz-header>
</template>
      `,
    },
  },
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
RightSlot.parameters = {
  docs: {
    description: {
      story: "ヘッダー内部の右側にコンポーネントを設定することができます。",
    },
    source: {
      code: `
<template>
  <wiz-header v-bind="$props">
    <template #right>
      <wiz-text-button>Click</wiz-text-button>
      <wiz-text-button>Click</wiz-text-button>
      <wiz-text-button>Click</wiz-text-button>
    </template>
  </wiz-header>
</template>
      `,
    },
  },
};

export const RightSlotWithGap = RightSlotTemplate.bind({});
RightSlotWithGap.args = {
  gapRight: "sm",
};
RightSlotWithGap.parameters = {
  docs: {
    description: {
      story:
        "RightSlot 内部でgap を指定することができます。選択肢はVariablesのSpacingKeysを参照してください。",
    },
    source: {
      code: `
<template>
    <wiz-header gapRight="sm">
      <template #right>
        <wiz-text-button>Click</wiz-text-button>
        <wiz-text-button>Click</wiz-text-button>
        <wiz-text-button>Click</wiz-text-button>
      </template>
    </wiz-header>
</template>
      `,
    },
  },
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
Fixed.parameters = {
  docs: {
    description: {
      story: "Header を固定することができます。",
    },
    source: {
      code: `
<template>
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
</template>
      `,
    },
  },
};
