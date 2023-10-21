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
    <div><WizIconButton :label="args.label" :icon="WizISend" @click="args.onClick('Default')" /></div>
  `,
});
Default.args = {
  ariaLabel: "send",
};

export const Variant: StoryFn<typeof WizIconButton> = (args) => ({
  components: { WizIconButton },
  setup: () => ({ args, WizISend }),
  template: `
    <div style="display: grid; grid-template-columns: max-content max-content; grid-gap: 1rem; align-items: center;">
      <div><WizIconButton ariaLabel="primary" variant="primary" :icon="WizISend" @click="args.onClick('primary')" /></div>
      <div>variant = primary</div>
      <div><WizIconButton ariaLabel="sub" variant="sub" :icon="WizISend" @click="args.onClick('sub')" /></div>
      <div>variant = sub</div>
      <div><WizIconButton ariaLabel="transparent" variant="transparent" :icon="WizISend" @click="args.onClick('transparent')" /></div>
      <div>variant = transparent</div>
      <div><WizIconButton ariaLabel="link" variant="link" :icon="WizISend" @click="args.onClick('link')" /></div>
      <div>variant = link</div>
    </div>
  `,
});

Variant.parameters = {
  docs: {
    description: {
      story:
        "`variant` により、IconButton の色を決められたテーマ色に変更することができます。'primary', 'sub', 'transparent', 'link', から選択できます。 default は`primary` です。",
    },
    source: {
      code: `
<template>
  <div style="display: grid; grid-template-columns: max-content max-content; grid-gap: 1rem; align-items: center;">
    <div><WizIconButton ariaLabel="primary" variant="primary" :icon="WizISend" @click="args.onClick('primary')" /></div>
    <div>variant = primary</div>
    <div><WizIconButton ariaLabel="sub" variant="sub" :icon="WizISend" @click="args.onClick('sub')" /></div>
    <div>variant = sub</div>
    <div><WizIconButton ariaLabel="transparent" variant="transparent" :icon="WizISend" @click="args.onClick('transparent')" /></div>
    <div>variant = transparent</div>
    <div><WizIconButton ariaLabel="link" variant="link" :icon="WizISend" @click="args.onClick('link')" /></div>
    <div>variant = link</div>
  </div>
</template>
      `,
    },
  },
};

export const Size: StoryFn<typeof WizIconButton> = (args) => ({
  components: { WizIconButton },
  setup: () => ({ args, WizISend }),
  template: `
    <div style="display: grid; grid-template-columns: max-content max-content; grid-gap: 1rem; align-items: center;">
      <div><WizIconButton ariaLabel="sm" size="sm" :icon="WizISend" @click="args.onClick('sm')" /></div>
      <div>size = sm</div>
      <div><WizIconButton ariaLabel="md" size="md" :icon="WizISend" @click="args.onClick('md')" /></div>
      <div>size = md</div>
      <div><WizIconButton ariaLabel="lg" size="lg" :icon="WizISend" @click="args.onClick('lg')" /></div>
      <div>size = lg</div>
    </div>
  `,
});

Size.parameters = {
  docs: {
    description: {
      story:
        "ボタンの大きさを指定することができます。 'sm', 'md', 'lg', xl' から選択できます。default は `md` です。",
    },
    source: {
      code: `
<template>
  <div style="display: grid; grid-template-columns: max-content max-content; grid-gap: 1rem; align-items: center;">
    <div><WizIconButton ariaLabel="sm" size="sm" :icon="WizISend" @click="args.onClick('sm')" /></div>
    <div>size = sm</div>
    <div><WizIconButton ariaLabel="md" size="md" :icon="WizISend" @click="args.onClick('md')" /></div>
    <div>size = md</div>
    <div><WizIconButton ariaLabel="lg" size="lg" :icon="WizISend" @click="args.onClick('lg')" /></div>
    <div>size = lg</div>
  </div>
</template>
      `,
    },
  },
};

export const Disabled: StoryFn<typeof WizIconButton> = (args) => ({
  components: { WizIconButton },
  setup: () => ({ args, WizISend }),
  template: `
    <div style="display: grid; grid-template-columns: max-content max-content; grid-gap: 1rem; align-items: center;">
      <div><WizIconButton disabled ariaLabel="send" :icon="WizISend" @click="args.onClick('primary disabled')" /></div>
      <div>disabled = true, variant = primary</div>
      <div><WizIconButton disabled ariaLabel="sub" variant="sub" :icon="WizISend" @click="args.onClick('sub disabled')" /></div>
      <div>disabled = true, variant = sub</div>
      <div><WizIconButton disabled ariaLabel="transparent" variant="transparent" :icon="WizISend" @click="args.onClick('transparent disabled')" /></div>
      <div>disabled = true, variant = transparent</div>
      <div><WizIconButton disabled ariaLabel="link" variant="link" :icon="WizISend" @click="args.onClick('link disabled')" /></div>
      <div>disabled = true, variant = link</div>
    </div>
  `,
});

Disabled.parameters = {
  docs: {
    description: {
      story:
        "ボタンのクリックを `disabled`に設定できます。 default は `false` です。",
    },
    source: {
      code: `
<template>
  <div style="display: grid; grid-template-columns: max-content max-content; grid-gap: 1rem; align-items: center;">
    <div><WizIconButton disabled ariaLabel="send" :icon="WizISend" @click="args.onClick('primary disabled')" /></div>
    <div>disabled = true, variant = primary</div>
    <div><WizIconButton disabled ariaLabel="sub" variant="sub" :icon="WizISend" @click="args.onClick('sub disabled')" /></div>
    <div>disabled = true, variant = sub</div>
    <div><WizIconButton disabled ariaLabel="transparent" variant="transparent" :icon="WizISend" @click="args.onClick('transparent disabled')" /></div>
    <div>disabled = true, variant = transparent</div>
    <div><WizIconButton disabled ariaLabel="link" variant="link" :icon="WizISend" @click="args.onClick('link disabled')" /></div>
    <div>disabled = true, variant = link</div>
  </div>
</template>
      `,
    },
  },
};
