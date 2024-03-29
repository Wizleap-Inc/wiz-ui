import { Meta, StoryFn } from "@storybook/vue3";
import { SPACING_ACCESSORS } from "@wizleap-inc/wiz-ui-constants";
import { ref } from "vue";

import { WizTextButton } from "@/components";

import { WizDropdown, WizDropdownItem } from ".";

export default {
  title: "Base/Dropdown",
  component: WizDropdown,
  subcomponents: { WizDropdownItem },
  argTypes: {
    click: {
      action: "click",
    },
    skeleton: {
      control: { type: "boolean" },
    },
    gap: {
      control: { type: "select" },
      options: SPACING_ACCESSORS,
    },

    isDirectionFixed: {
      control: { type: "boolean" },
    },
  },
} as Meta<typeof WizDropdown>;

const Template: StoryFn<typeof WizDropdown> = (args) => ({
  components: { WizDropdown, WizDropdownItem, WizTextButton },
  setup() {
    const isOpen = ref(true);
    return { isOpen, args };
  },
  template: `
    <WizDropdown v-bind="args" v-model="isOpen">
      <WizTextButton @click="isOpen = !isOpen" name="trigger">Click me</WizTextButton>
      <template #options>
        <WizDropdownItem @click="args.click">選択肢1</WizDropdownItem>
        <WizDropdownItem @click="args.click">選択肢2</WizDropdownItem>
        <WizDropdownItem @click="args.click">選択肢3</WizDropdownItem>
        <WizDropdownItem @click="args.click" disabled>選択肢4</WizDropdownItem>
        <WizDropdownItem @click="args.click">選択肢5</WizDropdownItem>
      </template>
    </WizDropdown>
  `,
});

export const Default = Template.bind({});

export const Skeleton = Template.bind({});
Skeleton.args = {
  skeleton: true,
};
Skeleton.parameters = {
  docs: {
    description: {
      story:
        "Dropdown の選択肢にスケルトンスクリーンを指定することができます。",
    },
    source: {
      code: `
<template>
  <WizDropdown skelton v-model="isOpen">
      <WizTextButton @click="isOpen = !isOpen" name="trigger">Click me</WizTextButton>
      <template #options>
        <WizDropdownItem @click="click">選択肢1</WizDropdownItem>
        <WizDropdownItem @click="click">選択肢2</WizDropdownItem>
        <WizDropdownItem @click="click">選択肢3</WizDropdownItem>
      </template>
    </WizDropdown>
</template>
      `,
    },
  },
};
export const Gap = Template.bind({});
Gap.args = {
  gap: "lg",
};

Gap.parameters = {
  docs: {
    description: {
      story:
        "gap を指定することができます。選択肢はVariablesのSpacingKeysを参照してください。",
    },
    source: {
      code: `
<template>
  <WizDropdown gap="lg" v-model="isOpen">
    <WizTextButton @click="isOpen = !isOpen" name="trigger">Click me</WizTextButton>
    <template #options>
      <WizDropdownItem @click="click">選択肢1</WizDropdownItem>
      <WizDropdownItem @click="click">選択肢2</WizDropdownItem>
      <WizDropdownItem @click="click">選択肢3</WizDropdownItem>
    </template>
  </WizDropdown>
</template>
      `,
    },
  },
};

export const IsDirectionFixed = Template.bind({});
IsDirectionFixed.args = {
  isDirectionFixed: true,
};
IsDirectionFixed.parameters = {
  docs: {
    description: {
      story: `isDirectionFixed を指定することで、Popup の表示位置を固定することができます。 `,
    },
    source: {
      code: `
<template>
  <WizDropdown isDirectionFixed v-model="isOpen">
    <WizTextButton @click="isOpen = !isOpen" name="trigger">Click me</WizTextButton>
    <template #options>
      <WizDropdownItem @click="click">選択肢1</WizDropdownItem>
      <WizDropdownItem @click="click">選択肢2</WizDropdownItem>
      <WizDropdownItem @click="click">選択肢3</WizDropdownItem>
    </template>
  </WizDropdown>
</template>
      `,
    },
  },
};
