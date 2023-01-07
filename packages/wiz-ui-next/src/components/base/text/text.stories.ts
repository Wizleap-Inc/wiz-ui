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

export const LineHeight = Template.bind({});
LineHeight.args = {
  as: "p",
  whiteSpace: "preLine",
  lineHeight: "xl",
};

export const FontSize = Template.bind({});
FontSize.args = {
  as: "p",
  fontSize: "xl",
};

export const Color = Template.bind({});
Color.args = {
  as: "p",
  color: "blue.800",
};

export const DummyValue = Template.bind({});
DummyValue.args = {
  dummyValue: "ABCDEFG",
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
