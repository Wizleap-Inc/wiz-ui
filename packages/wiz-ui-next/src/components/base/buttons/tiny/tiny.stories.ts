import { StoryFn, Meta } from "@storybook/vue3";

import { WizIAdd } from "@/components/icons";

import WizTinyButton from "./tiny.vue";

export default {
  title: "Base/Buttons/Tiny",
  component: WizTinyButton,
  argTypes: {
    clickable: {
      control: { type: "boolean" },
    },
    active: {
      control: { type: "boolean" },
    },
    width: {
      control: { type: "text" },
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

export const Clickable = Template.bind({});
Clickable.args = {
  clickable: true,
  active: false,
};

Clickable.parameters = {
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
  clickable: false,
  active: true,
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

export const Icon = Template.bind({});
Icon.args = {
  icon: WizIAdd,
  clickable: true,
  active: true,
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
  clickable: true,
  active: true,
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
