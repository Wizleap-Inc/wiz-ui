import { StoryFn } from "@storybook/vue";

import { WizIAdd, WizIRemove } from "@/components/icons";

import { WizToggleButton } from ".";

export default {
  title: "Base/Buttons/Toggle",
  component: WizToggleButton,
  argTypes: {
    inActiveIcon: {
      control: { type: "object" },
    },
    activeIcon: {
      control: { type: "object" },
    },
    disabled: {
      control: { type: "boolean" },
    },
    rounded: {
      control: { type: "boolean" },
    },
    size: {
      control: { type: "select" },
      options: ["sm", "md", "lg"],
    },
    onClick: {
      action: "onClick",
    },
  },
};

const Template: StoryFn = (_, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { WizToggleButton },
  setup: () => ({ WizIAdd, WizIRemove }),
  template: `
    <WizToggleButton v-bind="$props" :inActiveIcon="WizIAdd" :activeIcon="WizIRemove" @click="onClick('Default')">{{ slotDefault }}</WizToggleButton>
  `,
});

export const Default = Template.bind({});
Default.args = {
  slotDefault: "顧客データ追加",
};

export const Disabled = Template.bind({});
Disabled.args = {
  disabled: true,
  slotDefault: "顧客データ追加",
};

Disabled.parameters = {
  docs: {
    description: {
      story:
        "ボタンのクリックを `disabled`に設定できます。 default は `false` です。",
    },
    source: {
      code: `
<template>
  <WizToggleButton disabled>{{ "顧客データ追加" }}</WizToggleButton>
</template>
      `,
    },
  },
};

export const Angled = Template.bind({});
Angled.args = {
  rounded: false,
  slotDefault: "顧客データ追加",
};
Angled.parameters = {
  docs: {
    description: {
      story: "ボタンの形を矩形にすることができます。",
    },
    source: {
      code: `
<template>
  <WizToggleButton rounded>{{ "顧客データ追加" }}</WizToggleButton>
</template>
      `,
    },
  },
};

export const Size: StoryFn = (_, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { WizToggleButton },
  setup: () => ({ WizIAdd, WizIRemove }),
  template: `
    <div style="display: grid; grid-template-columns: max-content max-content; grid-gap: 1rem; align-items: center;">
      <WizToggleButton size="sm" :inActiveIcon="WizIAdd" :activeIcon="WizIRemove" @click="onClick('Small')">{{ "顧客データ追加" }}</WizToggleButton>
      <div>size = sm</div>
      <WizToggleButton size="md" :inActiveIcon="WizIAdd" :activeIcon="WizIRemove" @click="onClick('Medium')">{{ "顧客データ追加" }}</WizToggleButton>
      <div>size = md</div>
      <WizToggleButton size="lg" :inActiveIcon="WizIAdd" :activeIcon="WizIRemove" @click="onClick('Large')">{{ "顧客データ追加" }}</WizToggleButton>
      <div>size = lg</div>
    </div>
  `,
});

Size.parameters = {
  docs: {
    description: {
      story:
        "ボタンの大きさを指定することができます。 'sm', 'md', 'lg' から選択できます。default は `md` です。",
    },
    source: {
      code: `
<template>
  <div style="display: grid; grid-template-columns: max-content max-content; grid-gap: 1rem; align-items: center;">
    <WizToggleButton size="sm" :inActiveIcon="WizIAdd" :activeIcon="WizIRemove" @click="args.onClick('Small')">{{ "顧客データ追加" }}</WizToggleButton>
    <div>size = sm</div>
    <WizToggleButton size="md" :inActiveIcon="WizIAdd" :activeIcon="WizIRemove" @click="args.onClick('Medium')">{{ "顧客データ追加" }}</WizToggleButton>
    <div>size = md</div>
    <WizToggleButton size="lg" :inActiveIcon="WizIAdd" :activeIcon="WizIRemove" @click="args.onClick('Large')">{{ "顧客データ追加" }}</WizToggleButton>
    <div>size = lg</div>
  </div>
</template>
      `,
    },
  },
};
