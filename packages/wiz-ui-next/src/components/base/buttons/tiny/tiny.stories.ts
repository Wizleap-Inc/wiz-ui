import { expect } from "@storybook/jest";
import { userEvent, waitFor, within } from "@storybook/testing-library";
import { StoryFn, Meta } from "@storybook/vue3";

import { WizIAdd } from "@/components/icons";

import WizTinyButton from "./tiny.vue";

export default {
  title: "Base/Buttons/Tiny",
  component: WizTinyButton,
  argTypes: {
    selectable: {
      control: { type: "boolean" },
    },
    active: {
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

const Template: StoryFn<typeof WizTinyButton> = (args) => ({
  components: { WizTinyButton },
  setup: () => ({ args }),
  template: `<WizTinyButton v-bind="args" @click="() => args.click">{{ "保存する" }}</WizTinyButton>`,
});

export const Default = Template.bind({});

Default.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const button = canvas.getByRole("button");
  await userEvent.click(button);
  await waitFor(() => expect(button).toHaveFocus());
};

export const Selectable = Template.bind({});
Selectable.args = {
  selectable: true,
  active: false,
};

Selectable.parameters = {
  docs: {
    description: {
      story:
        "ボタンのクリックを `disabled`に設定できます。 default は `true` です。",
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

export const Active = Template.bind({});
Active.args = {
  selectable: true,
  active: false,
};

Active.parameters = {
  docs: {
    description: {
      story:
        "ボタンのOn/Offを `active`に設定できます。 default は `false` です。",
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
