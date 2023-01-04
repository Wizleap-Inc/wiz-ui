import { StoryFn, Meta } from "@storybook/vue3";

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
} as Meta<typeof WizIconButton>;

export const Default: StoryFn<typeof WizIconButton> = (args) => ({
  components: { WizIconButton },
  setup: () => ({ args, WizISend }),
  template: `
    <div><WizIconButton :icon="WizISend" @click="onClick('Default')" /></div>
  `,
});

export const Variant: StoryFn<typeof WizIconButton> = (args) => ({
  components: { WizIconButton },
  setup: () => ({ args, WizISend }),
  template: `
    <div style="display: grid; grid-template-columns: max-content max-content; grid-gap: 1rem; align-items: center;">
      <div><WizIconButton variant="primary" :icon="WizISend" @click="onClick('primary')" /></div>
      <div>variant = primary</div>
      <div><WizIconButton variant="sub" :icon="WizISend" @click="onClick('sub')" /></div>
      <div>variant = sub</div>
      <div><WizIconButton variant="transparent" :icon="WizISend" @click="onClick('transparent')" /></div>
      <div>variant = transparent</div>
      <div><WizIconButton variant="link" :icon="WizISend" @click="onClick('link')" /></div>
      <div>variant = link</div>
    </div>
  `,
});

export const Size: StoryFn<typeof WizIconButton> = (args) => ({
  components: { WizIconButton },
  setup: () => ({ args, WizISend }),
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

export const Disabled: StoryFn<typeof WizIconButton> = (args) => ({
  components: { WizIconButton },
  setup: () => ({ args, WizISend }),
  template: `
    <div style="display: grid; grid-template-columns: max-content max-content; grid-gap: 1rem; align-items: center;">
      <div><WizIconButton disabled :icon="WizISend" @click="onClick('primary disabled')" /></div>
      <div>disabled = true, variant = primary</div>
      <div><WizIconButton disabled variant="sub" :icon="WizISend" @click="onClick('sub disabled')" /></div>
      <div>disabled = true, variant = sub</div>
      <div><WizIconButton disabled variant="transparent" :icon="WizISend" @click="onClick('transparent disabled')" /></div>
      <div>disabled = true, variant = transparent</div>
      <div><WizIconButton disabled variant="link" :icon="WizISend" @click="onClick('link disabled')" /></div>
      <div>disabled = true, variant = link</div>
    </div>
  `,
});
