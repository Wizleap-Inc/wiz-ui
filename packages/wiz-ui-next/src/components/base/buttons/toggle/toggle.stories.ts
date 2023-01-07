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

export const Angled = Template.bind({});
Angled.args = {
  rounded: false,
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
