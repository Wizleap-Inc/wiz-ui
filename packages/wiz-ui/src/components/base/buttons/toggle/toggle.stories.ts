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

export const Angled = Template.bind({});
Angled.args = {
  rounded: false,
  slotDefault: "顧客データ追加",
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
