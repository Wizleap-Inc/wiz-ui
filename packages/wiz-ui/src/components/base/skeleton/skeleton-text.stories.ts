import { Meta, StoryFn } from "@storybook/vue";
import {
  FONT_SIZE_ACCESSORS,
  SPACING_ACCESSORS,
} from "@wizleap-inc/wiz-ui-constants";

import { WizText } from "@/components";

import { WizSkeletonText } from ".";

export default {
  title: "Base/Skeleton/Text",
  component: WizSkeletonText,
  argTypes: {
    fontSize: {
      control: { type: "select" },
      options: FONT_SIZE_ACCESSORS,
    },
    gap: {
      control: { type: "select" },
      options: SPACING_ACCESSORS,
    },
    lines: {
      control: { type: "number" },
    },
    isLoading: {
      control: { type: "boolean" },
    },
  },
} as Meta<typeof WizSkeletonText>;

const Template: StoryFn<typeof WizSkeletonText> = (_, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { WizSkeletonText, WizText },
  template: `
  <WizSkeletonText v-bind="$props">
    <WizText>
      This Is Loaded Text
    </WizText>
  </WizSkeletonText>
`,
});

interface Props {
  fontSize: string;
  gap: string;
  lines: number;
  isLoading: boolean;
}

const CODE_TEMPLATE = ({ fontSize, gap, lines, isLoading }: Partial<Props>) => `
<template>
  <WizSkeletonText${
    (fontSize ? ` :fontSize="${fontSize}"` : "") +
    (gap ? ` :gap="${gap}"` : "") +
    (lines ? ` :lines="${lines}"` : "") +
    (isLoading ? ` :isLoading="${isLoading}"` : "")
  }>
    <WizText>
      This Is Loaded Text
    </WizText>
  </WizSkeletonText>
</template>
`;

export const Default = Template.bind({});
Default.args = {
  fontSize: "lg",
  gap: "sm",
  lines: 1,
  isLoading: true,
};
Default.parameters = {
  docs: {
    description: {
      component: `
### WizSkeletonText

テキストのスケルトンを表示するコンポーネントです。
`,
    },
    source: {
      code: CODE_TEMPLATE({}),
    },
  },
};

export const Lines = Template.bind({});
Lines.args = {
  lines: 3,
};
Lines.parameters = {
  docs: {
    description: {
      story: `
行数を指定することで、複数行のスケルトンを表示することができます。テキストであることを強調するため、最後の行の幅は80%に設定されています。
`,
    },
    source: {
      code: CODE_TEMPLATE({ lines: 3 }),
    },
  },
};

export const FontSize = Template.bind({});
FontSize.args = {
  fontSize: "xs",
  lines: 3,
};
FontSize.parameters = {
  docs: {
    description: {
      story: `
フォントサイズを指定することで、各スケルトンのサイズを変更することができます。
`,
    },
    source: {
      code: CODE_TEMPLATE({ fontSize: "xs", lines: 3 }),
    },
  },
};

export const Gap = Template.bind({});
Gap.args = {
  gap: "xl",
  lines: 3,
};
Gap.parameters = {
  docs: {
    description: {
      story: `
行間を指定することで、各スケルトンの行間を変更することができます。
`,
    },
    source: {
      code: CODE_TEMPLATE({ lines: 3, gap: "xl" }),
    },
  },
};

export const Loading = Template.bind({});
Loading.args = {
  isLoading: false,
};
Loading.parameters = {
  docs: {
    description: {
      story: `
ローディング中でない場合は、スケルトンは表示されません。その代わり、スロットされたコンテンツが表示されます。
`,
    },
    source: {
      code: CODE_TEMPLATE({ isLoading: false }),
    },
  },
};
