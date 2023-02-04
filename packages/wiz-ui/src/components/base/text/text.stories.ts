import { StoryFn } from "@storybook/vue";
import {
  COLOR_MAP_ACCESSORS,
  FONT_SIZE_ACCESSORS,
  WHITE_SPACE_MAP_ACCESSORS,
} from "@wizleap-inc/wiz-ui-constants";

import WizText from "./text.vue";

export default {
  title: "Base/Text",
  component: WizText,
  argTypes: {
    as: {
      control: { type: "select" },
      options: ["p", "span"],
    },
    fontSize: {
      control: { type: "select" },
      options: FONT_SIZE_ACCESSORS,
    },
    color: {
      control: { type: "select" },
      options: COLOR_MAP_ACCESSORS,
    },
    bold: {
      control: { type: "boolean" },
    },
    maxLines: {
      control: { type: "number" },
    },
    whiteSpace: {
      control: { type: "select" },
      options: WHITE_SPACE_MAP_ACCESSORS,
    },
    dummyValue: {
      control: { type: "text" },
    },
  },
};

const Template: StoryFn = (_, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { WizText },
  template: `<WizText v-bind="$props">{{ slot }}</WizText>`,
});

export const Paragraph = Template.bind({});
Paragraph.args = {
  as: "p",
  slot: "これはテキストです。",
};
Paragraph.parameters = {
  source: {
    code: `
<template>
  <WizText as="p">これはテキストです。</WizText>
</template>
      `,
  },
};

export const Span = Template.bind({});
Span.args = {
  as: "span",
  slot: "これはテキストです。",
};
Span.parameters = {
  source: {
    code: `
<template>
  <WizText as="span">これはテキストです。</WizText>
</template>
      `,
  },
};

export const Bold = Template.bind({});
Bold.args = {
  as: "p",
  bold: true,
  slot: "これはテキストです。",
};
Bold.parameters = {
  source: {
    code: `
<template>
  <WizText as="p" bold>これはテキストです。</WizText>
</template>
      `,
  },
};

export const WhiteSpace = Template.bind({});
WhiteSpace.args = {
  as: "p",
  whiteSpace: "preLine",
  slot: "これはテキストです。\n改行を含みます。",
};
WhiteSpace.parameters = {
  docs: {
    description: {
      story:
        "要素内の `white-space` を指定することができます。選択肢は `WhiteSpacingKey` から指定することができます。 default は `normal` です。",
    },
    source: {
      code: `
<template>
  <WizText as="p" whiteSpace="preLine">これはテキストです。</WizText>
</template>
      `,
    },
  },
};

export const DummyValue = Template.bind({});
DummyValue.args = {
  dummyValue: "ABCDEFG",
  slot: "これはテキストです。",
};
DummyValue.parameters = {
  docs: {
    description: {
      story:
        "`DummyValue` を指定すると、slot の文章代わりに `dummyValue` が入力されたものにぼかされた文字が表示される。",
    },
    source: {
      code: `
<template>
  <WizText as="p" dummyValue="ABCDEFG">これはテキストです。</WizText>
</template>
      `,
    },
  },
};

const MaxLinesTemplate: StoryFn = (_, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { WizText },
  template: `
  <div style="display: flex; gap: 1rem;">
    <div style="width: 200px;">
      <WizText v-bind="$props">{{ slot1 }}</WizText>
    </div>
    <div style="width: 200px;">
      <WizText v-bind="$props">{{ slot2 }}</WizText>
    </div>
 </div>
  `,
});

export const MaxLines = MaxLinesTemplate.bind({});
MaxLines.args = {
  as: "p",
  maxLines: 5,
  slot1:
    "これはとても長いテキストです。投稿内容に依存して高さが大きくズレるため、テキストの最大行数を指定し3点ドットで対応することにします。",
  slot2:
    "WhenMaxLinesIsSet,WizTextWillSetWordBreakToBreakAll.WhenMaxLinesIsSet,WizTextWillSetWordBreakToBreakAll.WhenMaxLinesIsSet,WizTextWillSetWordBreakToBreakAll.",
};
MaxLines.parameters = {
  docs: {
    description: {
      story:
        "`maxLens` を指定すると、長文のテキストが入力された際に特定の行で省略することができます。",
    },
    source: {
      code: `
<template>
  <div style="display: flex; gap: 1rem;">
    <div style="width: 200px;">
      <WizText as="p" :maxLines="5" >
        これはとても長いテキストです。投稿内容に依存して高さが大きくズレるため、テキストの最大行数を指定し3点ドットで対応することにします。
      </WizText>
    </div>
    <div style="width: 200px;">
      <WizText v-bind="$props">
        WhenMaxLinesIsSet,WizTextWillSetWordBreakToBreakAll.WhenMaxLinesIsSet,WizTextWillSetWordBreakToBreakAll.WhenMaxLinesIsSet,WizTextWillSetWordBreakToBreakAll.
      </WizText>
    </div>
 </div>
</template>
      `,
    },
  },
};
