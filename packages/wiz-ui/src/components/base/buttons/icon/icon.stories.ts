import { StoryFn } from "@storybook/vue";

import { WizISend } from "@/components/icons";

import { WizIconButton } from ".";

export default {
  title: "Base/Buttons/Icon",
  component: WizIconButton,
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["primary", "sub"],
    },
    onClick: {
      action: "onClick",
    },
  },
};

export const Default: StoryFn = (_, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { WizIconButton },
  setup: () => ({ WizISend }),
  template: `
    <div><WizIconButton :icon="WizISend" @click="onClick('Default')" /></div>
  `,
});

export const Variant: StoryFn = (_, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { WizIconButton },
  setup: () => ({ WizISend }),
  template: `
    <div style="display: grid; grid-template-columns: max-content max-content; grid-gap: 1rem; align-items: center;">
      <div><WizIconButton variant="primary" :icon="WizISend" @click="onClick('primary')" /></div>
      <div>variant = primary</div>
      <div><WizIconButton variant="sub" :icon="WizISend" @click="onClick('sub')" /></div>
      <div>variant = sub</div>
      <div><WizIconButton variant="transparent" :icon="WizISend" @click="onClick('transparent')" /></div>
      <div>variant = transparent</div>
    </div>
  `,
});

export const Size: StoryFn = (_, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { WizIconButton },
  setup: () => ({ WizISend }),
  template: `
    <div style="display: grid; grid-template-columns: max-content max-content; grid-gap: 1rem; align-items: center;">
      <div><WizIconButton size="sm" :icon="WizISend" @click="onClick('sm')" /></div>
      <div>size = sm</div>
      <div><WizIconButton size="md" :icon="WizISend" @click="onClick('md')" /></div>
      <div>size = md</div>
      <div><WizIconButton size="lg" :icon="WizISend" @click="onClick('lg')" /></div>
      <div>size = lg</div>
    </div>
  `,
});

export const Disabled: StoryFn = (_, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { WizIconButton },
  setup: () => ({ WizISend }),
  template: `
    <div style="display: grid; grid-template-columns: max-content max-content; grid-gap: 1rem; align-items: center;">
      <div><WizIconButton disabled :icon="WizISend" @click="onClick('primary disabled')" /></div>
      <div>disabled = true, variant = primary</div>
      <div><WizIconButton disabled variant="sub" :icon="WizISend" @click="onClick('sub disabled')" /></div>
      <div>disabled = true, variant = sub</div>
      <div><WizIconButton disabled variant="transparent" :icon="WizISend" @click="onClick('transparent disabled')" /></div>
      <div>disabled = true, variant = transparent</div>
    </div>
  `,
});
