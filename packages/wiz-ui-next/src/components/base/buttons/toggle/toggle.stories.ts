import { StoryFn, Meta } from "@storybook/vue3";

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
    modelValue: {
      control: { type: "boolean" },
    },
    onClick: {
      action: "onClick",
    },
  },
} as Meta<typeof WizToggleButton>;

const Template: StoryFn<typeof WizToggleButton> = (args) => ({
  components: { WizToggleButton },
  setup: () => ({ args, WizIAdd, WizIRemove }),
  template: `
    <WizToggleButton v-bind="args" :inActiveIcon="WizIAdd" :activeIcon="WizIRemove" @click="args.onClick('Default')">{{ "顧客データ追加" }}</WizToggleButton>
  `,
});

export const Default = Template.bind({});

export const Disabled = Template.bind({});
Disabled.args = {
  disabled: true,
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

export const On = Template.bind({});
On.args = {
  modelValue: true,
};
On.parameters = {
  docs: {
    description: {
      story: "ボタンのOn/Offを指定することができます。",
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

export const Off = Template.bind({});
Off.args = {
  modelValue: false,
};
Off.parameters = {
  docs: {
    description: {
      story: "ボタンのOn/Offを指定することができます。",
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
export const Size: StoryFn<typeof WizToggleButton> = (args) => ({
  components: { WizToggleButton },
  setup: () => ({ args, WizIAdd, WizIRemove }),
  template: `
    <div style="display: grid; grid-template-columns: max-content max-content; grid-gap: 1rem; align-items: center;">
      <WizToggleButton size="sm" :inActiveIcon="WizIAdd" :activeIcon="WizIRemove" @click="args.onClick('Small')">{{ "顧客データ追加" }}</WizToggleButton>
      <div>size = sm</div>
      <WizToggleButton size="md" :inActiveIcon="WizIAdd" :activeIcon="WizIRemove" @click="args.onClick('Medium')">{{ "顧客データ追加" }}</WizToggleButton>
      <div>size = md</div>
      <WizToggleButton size="lg" :inActiveIcon="WizIAdd" :activeIcon="WizIRemove" @click="args.onClick('Large')">{{ "顧客データ追加" }}</WizToggleButton>
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
