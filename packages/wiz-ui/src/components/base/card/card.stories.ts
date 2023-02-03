import { StoryFn } from "@storybook/vue";
import {
  COLOR_MAP_ACCESSORS,
  SPACING_ACCESSORS,
} from "@wizleap-inc/wiz-ui-constants";

import {
  WizTextButton,
  WizTooltip,
  WizIcon,
  WizHStack,
  WizIHelp,
} from "@/components";

import WizCard from "./card.vue";

export default {
  title: "Base/Card",
  component: WizCard,
  argTypes: {
    p: {
      control: { type: "select" },
      options: SPACING_ACCESSORS,
    },
    px: {
      control: { type: "select" },
      options: SPACING_ACCESSORS,
    },
    py: {
      control: { type: "select" },
      options: SPACING_ACCESSORS,
    },
    backgroundColor: {
      control: { type: "select" },
      options: COLOR_MAP_ACCESSORS,
    },
    shadow: {
      control: { type: "boolean" },
    },
    border: {
      control: { type: "boolean" },
    },
    align: {
      control: { type: "select" },
      options: ["start", "center", "end"],
    },
    gap: {
      control: { type: "select" },
      options: SPACING_ACCESSORS,
    },
  },
};

const Template: StoryFn<typeof WizCard> = (_, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { WizCard, WizTextButton },
  template: `<WizCard v-bind="$props">
      defaultスロット
    </WizCard>`,
});

export const Default = Template.bind({});

export const Shadow = Template.bind({});
Shadow.args = {
  shadow: true,
  gap: "md",
};
Shadow.parameters = {
  docs: {
    description: {
      story: "`shadow` を指定することができます。",
    },
    source: {
      code: `
<template>
  <WizCard shadow>
    <template #mainHeaderArea>mainHeaderAreaスロット</template>
    <template #subHeaderArea>subHeaderAreaスロット</template>
    defaultスロット
    <template #footer><WizTextButton>保存する</WizTextButton></template>
  </WizCard>
</template>
      `,
    },
  },
};

export const Border = Template.bind({});
Border.args = {
  border: true,
};
Border.parameters = {
  docs: {
    description: {
      story: "`border` を指定することができます。",
    },
    source: {
      code: `
<template>
  <WizCard border>
      <template #mainHeaderArea>mainHeaderAreaスロット</template>
      <template #subHeaderArea>subHeaderAreaスロット</template>
      defaultスロット
      <template #footer><WizTextButton>保存する</WizTextButton></template>
    </WizCard>
</template>
      `,
    },
  },
};

export const Align = Template.bind({});
Align.args = {
  align: "center",
};
Align.parameters = {
  docs: {
    description: {
      story:
        "`align` を指定することができます。選択肢は `start`, `center`, `end` の中から選択できます。",
    },
    source: {
      code: `
<template>
  <WizCard v-bind="args">
      <template #mainHeaderArea>mainHeaderAreaスロット</template>
      <template #subHeaderArea>subHeaderAreaスロット</template>
      defaultスロット
      <template #footer><WizTextButton>保存する</WizTextButton></template>
    </WizCard>
</template>
      `,
    },
  },
};

export const Gap = Template.bind({});
Gap.args = {
  gap: "xl",
};
Gap.parameters = {
  docs: {
    description: {
      story:
        "`gap` を指定することができます。選択肢はSpacingKeysの中から選択できます。",
    },
    source: {
      code: `
<template>
  <WizCard gap="xl">
      <template #mainHeaderArea>mainHeaderAreaスロット</template>
      <template #subHeaderArea>subHeaderAreaスロット</template>
      defaultスロット
      <template #footer><WizTextButton>保存する</WizTextButton></template>
    </WizCard>
</template>
      `,
    },
  },
};

export const MainHeaderArea: StoryFn<typeof WizCard> = (_, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { WizCard },
  template: `<WizCard v-bind="$props">
      <template #mainHeaderArea>mainHeaderAreaスロット</template>
      defaultスロット
    </WizCard>`,
});

MainHeaderArea.parameters = {
  docs: {
    description: {
      story: "カード内部にヘッダーを追加することができる。",
    },
    source: {
      code: `<WizCard v-bind="args">
      <template #mainHeaderArea>mainHeaderAreaスロット</template>
      defaultスロット
    </WizCard>`,
    },
  },
};

export const MainHeaderAreaWithHint: StoryFn<typeof WizCard> = (
  _,
  { argTypes }
) => ({
  props: Object.keys(argTypes),
  components: { WizCard, WizTooltip, WizIcon, WizHStack },
  setup: () => ({ WizIHelp }),
  template: `<WizCard v-bind="$props">
      <template #mainHeaderArea>
        <WizHStack align="center">
          mainHeaderAreaスロット
          <WizTooltip content="これはヒントです">
            <WizIcon :icon="WizIHelp" color="gray.600" size="lg" />
          </WizTooltip>
        </WizHStack>
      </template>
      defaultスロット
    </WizCard>`,
});

MainHeaderAreaWithHint.parameters = {
  docs: {
    description: {
      story: "ヘッダーに補足説明 (ヒント) を指定することができる。",
    },
    source: {
      code: `<WizCard v-bind="args">
      <template #mainHeaderArea>
        <WizHStack align="center">
          mainHeaderAreaスロット
          <WizTooltip content="これはヒントです">
            <WizIcon :icon="WizIHelp" color="gray.600" size="lg" />
          </WizTooltip>
        </WizHStack>
      </template>
      defaultスロット
    </WizCard>`,
    },
  },
};

export const SubHeaderArea: StoryFn<typeof WizCard> = (_, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { WizCard },
  template: `<WizCard v-bind="$props">
      <template #subHeaderArea>subHeaderAreaスロット</template>
      defaultスロット
    </WizCard>`,
});

SubHeaderArea.parameters = {
  docs: {
    description: {
      story: "カード内部に SubHeader を設定することができます。",
    },
    source: {
      code: `<WizCard v-bind="args">
      <template #subHeaderArea>subHeaderAreaスロット</template>
      defaultスロット
    </WizCard>`,
    },
  },
};

export const Footer: StoryFn<typeof WizCard> = (_, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { WizCard, WizTextButton },
  template: `<WizCard v-bind="$props">
      defaultスロット
      <template #footer><WizTextButton>保存する</WizTextButton></template>
    </WizCard>`,
});
Footer.parameters = {
  docs: {
    description: {
      story: "カードの内部にFooterを設定することができます。",
    },
    source: {
      code: `
<template>
  <WizCard >
      defaultスロット
      <template #footer><WizTextButton>保存する</WizTextButton></template>
    </WizCard>
</template>
      `,
    },
  },
};
