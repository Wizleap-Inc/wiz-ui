import { StoryFn } from "@storybook/vue";

import { WizText } from "@/components";

import { WizIClose } from "../../icons";

import WizMessageBox from "./message-box.vue";

export default {
  title: "Base/MessageBox",
  component: WizMessageBox,
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["information", "caution", "warning"],
    },
    expand: {
      control: { type: "boolean" },
    },
  },
};

const Template: StoryFn = (_, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { WizMessageBox, WizText },
  template: `<WizMessageBox v-bind="$props"><WizText>{{ slot }}</WizText></WizMessageBox>`,
});

export const Information = Template.bind({});
Information.args = {
  title: "ヘッダーヘッダーヘッダー",
  slot: "テキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト",
  variant: "information",
};
Information.parameters = {
  docs: {
    description: {
      story: "Message のスタイルを `information` は次のとおりです。",
    },
    source: {
      code: `
<template>
  <WizMessageBox title="ヘッダーヘッダーヘッダー" variant="information">
    <WizText>
      テキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト
    </WizText>
  </WizMessageBox>
</template>
      `,
    },
  },
};

export const Caution = Template.bind({});
Caution.args = {
  title: "ヘッダーヘッダーヘッダー",
  slot: "テキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト",
  variant: "caution",
};
Caution.parameters = {
  docs: {
    description: {
      story: "Message のスタイルの `caution` は次のとおりです。",
    },
    source: {
      code: `
<template>
  <WizMessageBox title="ヘッダーヘッダーヘッダー" variant="caution">
    <WizText>
      テキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト
    </WizText>
  </WizMessageBox>
</template>
      `,
    },
  },
};

export const Warning = Template.bind({});
Warning.args = {
  title: "ヘッダーヘッダーヘッダー",
  slot: "テキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト",
  variant: "warning",
};
Warning.parameters = {
  docs: {
    description: {
      story: "Message のスタイルを `warning` は次のとおりです。",
    },
    source: {
      code: `
<template>
  <WizMessageBox title="ヘッダーヘッダーヘッダー" variant="warning">
    <WizText>
      テキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト
    </WizText>
  </WizMessageBox>
</template>
      `,
    },
  },
};

export const WithIcon = Template.bind({});
WithIcon.args = {
  title: "ヘッダーヘッダーヘッダー",
  slot: "テキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト",
  icon: WizIClose,
};
WithIcon.parameters = {
  docs: {
    description: {
      story: "MessageBox に Icon を付与することができます。",
    },
    source: {
      code: `
<template>
  <WizMessageBox title="ヘッダーヘッダーヘッダー" variant="information" :icon="WizIClose">
    <WizText>
      テキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト
    </WizText>
  </WizMessageBox>
</template>
      `,
    },
  },
};

export const Expand = Template.bind({});
Expand.args = {
  title: "ヘッダーヘッダーヘッダー",
  slot: "テキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト",
  expand: true,
};
Expand.parameters = {
  docs: {
    description: {
      story: "コンポーネントを幅いっぱいに広げるように指定することができます。",
    },
    source: {
      code: `
<template>
  <WizMessageBox title="ヘッダーヘッダーヘッダー" variant="information" expand>
    <WizText>
      テキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト
    </WizText>
  </WizMessageBox>
</template>
      `,
    },
  },
};
