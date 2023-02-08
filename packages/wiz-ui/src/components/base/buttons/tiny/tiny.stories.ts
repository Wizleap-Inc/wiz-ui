import { expect } from "@storybook/jest";
import { userEvent, waitFor, within } from "@storybook/testing-library";
import { Meta, StoryFn } from "@storybook/vue";

import { WizIAdd } from "@/components/icons";

import WizTinyButton from "./tiny.vue";

export default {
  title: "Base/Buttons/Tiny",
  component: WizTinyButton,
  argTypes: {
    status: {
      control: { type: "select" },
      options: ["On", "Off", "disableGray", "disableTranslucent"],
    },
    rounded: {
      control: { type: "boolean" },
    },
    icon: {
      control: { type: "object" },
    },
    iconPosition: {
      control: { type: "select" },
      options: ["left", "right"],
    },
    click: {
      action: "click",
    },
  },
} as Meta<typeof WizTinyButton>;

const Template: StoryFn<typeof WizTinyButton> = (_, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { WizTinyButton },
  template: `<WizTinyButton v-bind="$props" @click="click">{{ "保存する" }}</WizTinyButton>`,
});

export const Default = Template.bind({});

Default.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const button = canvas.getByRole("button");
  await userEvent.click(button);
  await waitFor(() => expect(button).toHaveFocus());
};

export const Status = Template.bind({});
Status.args = {
  status: "Off",
};

Status.parameters = {
  docs: {
    description: {
      story:
        "ボタンの状態を設定できます．`On`または`Off`の場合は押下可能です．それ以外の場合は押下できません．",
    },
    source: {
      code: `
<template>
  <WizTinyButton disabled @click="click">{{ "保存する" }}</WizTinyButton>
</template>
      `,
    },
  },
};

export const Angled = Template.bind({});
Angled.args = {
  rounded: false,
};
Angled.parameters = {
  docs: {
    description: {
      story: "ボタンの形を矩形にすることができます。",
    },
    source: {
      code: `
<template>
  <WizTinyButton rounded @click="click">{{ "保存する" }}</WizTinyButton>
</template>
      `,
    },
  },
};

export const Icon = Template.bind({});
Icon.args = {
  icon: WizIAdd,
};

Icon.parameters = {
  docs: {
    description: {
      story:
        "アイコンを指定することができます。`WizI`というPrefixのコンポーネントがアイコンなのでそれを渡してください。選択肢はIconsを参照してください。",
    },
    source: {
      code: `
<template>
  <WizTinyButton :icon="WizIAdd" @click="click">{{ "保存する" }}</WizTinyButton>
</template>
      `,
    },
  },
};

export const IconPosition = Template.bind({});
IconPosition.args = {
  icon: WizIAdd,
  iconPosition: "right",
};

IconPosition.parameters = {
  docs: {
    description: {
      story: `
アイコンの配置を指定することができます。
- left: 左寄せ
- right: 右寄せ
`,
    },
    source: {
      code: `
<template>
  <WizTinyButton :icon="WizIAdd" iconPosition="right" @click="click">{{ "保存する" }}</WizTinyButton>
</template>
      `,
    },
  },
};
