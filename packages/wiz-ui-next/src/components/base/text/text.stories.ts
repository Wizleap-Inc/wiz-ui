import { StoryFn, Meta } from "@storybook/vue3";
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
    lineHeight: {
      control: { type: "select" },
      options: FONT_SIZE_ACCESSORS,
    },
    whiteSpace: {
      control: { type: "select" },
      options: WHITE_SPACE_MAP_ACCESSORS,
    },
    dummyValue: {
      control: { type: "text" },
    },
  },
} as Meta<typeof WizText>;

const Template: StoryFn<typeof WizText> = (args) => ({
  setup: () => ({ args, msg: "これはテキストです。\nこれはテキストです。" }),
  components: { WizText },
  template: `<WizText v-bind="args">{{ msg }}</WizText>`,
});

export const Paragraph = Template.bind({});
Paragraph.args = {
  as: "p",
};
Paragraph.parameters = {
  docs: {
    source: {
      code: `
<template>
  <WizText as="p">
    これはテキストです。 これはテキストです。
  </WizText>
</template>
      `,
    },
  },
};

export const Span = Template.bind({});
Span.args = {
  as: "span",
};

export const Bold = Template.bind({});
Bold.args = {
  as: "p",
  bold: true,
};

export const WhiteSpace = Template.bind({});
WhiteSpace.args = {
  as: "p",
  whiteSpace: "preLine",
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

export const LineHeight = Template.bind({});
LineHeight.args = {
  as: "p",
  whiteSpace: "preLine",
  lineHeight: "xl",
};
LineHeight.parameters = {
  docs: {
    description: {
      story:
        "要素内の `line-height` を指定することができます。選択肢は `FontSizeKey` から指定することができます。",
    },
    source: {
      code: `
<template>
  <WizText as="p" whiteSpace="preLine" lightHeight="xl">これはテキストです。</WizText>
</template>
      `,
    },
  },
};

export const FontSize = Template.bind({});
FontSize.args = {
  as: "p",
  fontSize: "xl",
};
FontSize.parameters = {
  docs: {
    description: {
      story:
        "要素内の `white-space` を指定することができます。選択肢は `FontSizeKey` から指定することができます。 default は `md` です。",
    },
    source: {
      code: `
<template>
  <WizText as="p" fontSize="xl">これはテキストです。</WizText>
</template>
      `,
    },
  },
};

export const Color = Template.bind({});
Color.args = {
  as: "p",
  color: "blue.800",
};
Color.parameters = {
  docs: {
    description: {
      story:
        "要素内の `white-space` を指定することができます。選択肢は `ColorKey` から指定することができます。 default は `gray.900` です。",
    },
    source: {
      code: `
<template>
  <WizText as="p" color="blue.800">これはテキストです。</WizText>
</template>
      `,
    },
  },
};

export const DummyValue = Template.bind({});
DummyValue.args = {
  dummyValue: "ABCDEFG",
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

const MaxLinesTemplate: StoryFn = (args) => ({
  setup: () => ({ args }),
  components: { WizText },
  template: `
  <div style="display: flex; gap: 1rem;">
    <div style="width: 200px;">
      <WizText v-bind="args">{{ "これはとても長いテキストです。投稿内容に依存して高さが大きくズレるため、テキストの最大行数を指定し3点ドットで対応することにします。" }}</WizText>
    </div>
    <div style="width: 200px;">
      <WizText v-bind="args">{{ "WhenMaxLinesIsSet,WizTextWillSetWordBreakToBreakAll.WhenMaxLinesIsSet,WizTextWillSetWordBreakToBreakAll.WhenMaxLinesIsSet,WizTextWillSetWordBreakToBreakAll." }}</WizText>
    </div>
 </div>
  `,
});

export const MaxLines = MaxLinesTemplate.bind({});
MaxLines.args = {
  as: "p",
  maxLines: 5,
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
