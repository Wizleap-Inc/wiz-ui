import { StoryFn, Meta } from "@storybook/vue3";
import { SPACING_ACCESSORS } from "@wizleap-inc/wiz-ui-constants";

import { WizIAdd } from "@/components/icons";

import WizTinyButton from "./tiny.vue";

const spacingKeys = ["p", "px", "py"];
const spacingControls = spacingKeys.reduce((acc, key) => {
  acc[key] = {
    control: { type: "select" },
    options: SPACING_ACCESSORS,
  };
  return acc;
}, {} as Record<string, any>);

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
    hover: {
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
    ...spacingControls,
  },
} as Meta<typeof WizTinyButton>;

const Template: StoryFn<typeof WizTinyButton> = (args) => ({
  components: { WizTinyButton },
  setup: () => ({ args }),
  template: `<WizTinyButton v-bind="args" @click="args.click">{{ "保存する" }}</WizTinyButton>`,
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
  <WizTinyButton disabled @click="args.click">{{ "保存する" }}</WizTinyButton>
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
  <WizTinyButton disabled @click="args.click">{{ "保存する" }}</WizTinyButton>
</template>
      `,
    },
  },
};

export const Hover: StoryFn<typeof WizTinyButton> = (_, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { WizTinyButton },
  setup() {
    return {
      main: "hover",
      patterns: [
        { hover: true, clickable: true, active: true },
        { hover: true, clickable: true, active: false },
        { hover: true, clickable: false, active: true },
        { hover: true, clickable: false, active: false },
      ],
    };
  },
  template: `
  <table>
    <tr v-for="(pattern, i) in patterns" :key="pattern[main]">
      <td style="padding: 1rem;"> {{"clickable="}}{{ pattern.clickable ? "true" : "false"}} </td>
      <td style="padding: 1rem;"> {{"active="}}{{ pattern.active ? "true" : "false"}} </td>
      <td style="padding: 1rem;"> 
        <WizTinyButton v-bind="pattern" @click="click">{{ "保存する" }}</WizTinyButton>
      </td>
    </tr>
  </table>
  `,
});

Hover.parameters = {
  docs: {
    description: {
      story:
        "hoverをtrueにすると、常時表示されます。これはStorybook上でのデモ用などInteractionのMockに使えます。",
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
  <WizTinyButton :icon="WizIAdd" @click="args.click">{{ "保存する" }}</WizTinyButton>
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
  <WizTinyButton :icon="WizIAdd" iconPosition="right" @click="args.click">{{ "保存する" }}</WizTinyButton>
</template>
      `,
    },
  },
};
