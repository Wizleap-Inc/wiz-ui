import { StoryFn, Meta } from "@storybook/vue3";

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
} as Meta<typeof WizMessageBox>;

const Template: StoryFn<typeof WizMessageBox> = (args) => ({
  components: { WizMessageBox, WizText },
  setup: () => ({ args }),
  template: `
    <WizMessageBox v-bind="args">
      <WizText>
        テキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト
      </WizText>
    </WizMessageBox>
  `,
});

export const Information = Template.bind({});
Information.args = {
  title: "ヘッダーヘッダーヘッダー",
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
  icon: WizIClose,
};

export const Expand = Template.bind({});
Expand.args = {
  title: "ヘッダーヘッダーヘッダー",
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
