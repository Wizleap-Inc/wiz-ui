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
    <div><WizIconButton :label="$props.label" :icon="WizISend" @click="onClick('Default')" /></div>
  `,
});
Default.args = {
  label: "send",
};

export const Variant: StoryFn = (_, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { WizIconButton },
  setup: () => ({ WizISend }),
  template: `
    <div style="display: grid; grid-template-columns: max-content max-content; grid-gap: 1rem; align-items: center;">
      <div><WizIconButton label="primary" variant="primary" :icon="WizISend" @click="onClick('primary')" /></div>
      <div>variant = primary</div>
      <div><WizIconButton label="sub" variant="sub" :icon="WizISend" @click="onClick('sub')" /></div>
      <div>variant = sub</div>
      <div><WizIconButton label="transparent" variant="transparent" :icon="WizISend" @click="onClick('transparent')" /></div>
      <div>variant = transparent</div>
      <div><WizIconButton label="link" variant="link" :icon="WizISend" @click="onClick('link')" /></div>
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
    <div><WizIconButton label="primary" variant="primary" :icon="WizISend" @click="onClick('primary')" /></div>
    <div>variant = primary</div>
    <div><WizIconButton label="sub" variant="sub" :icon="WizISend" @click="onClick('sub')" /></div>
    <div>variant = sub</div>
    <div><WizIconButton label="transparent" variant="transparent" :icon="WizISend" @click="onClick('transparent')" /></div>
    <div>variant = transparent</div>
    <div><WizIconButton label="link" variant="link" :icon="WizISend" @click="onClick('link')" /></div>
    <div>variant = link</div>
  </div>
</template>
      `,
    },
  },
};

export const Size: StoryFn = (_, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { WizIconButton },
  setup: () => ({ WizISend }),
  template: `
    <div style="display: grid; grid-template-columns: max-content max-content; grid-gap: 1rem; align-items: center;">
      <div><WizIconButton label="sm" size="sm" :icon="WizISend" @click="onClick('sm')" /></div>
      <div>size = sm</div>
      <div><WizIconButton label="md" size="md" :icon="WizISend" @click="onClick('md')" /></div>
      <div>size = md</div>
      <div><WizIconButton label="lg" size="lg" :icon="WizISend" @click="onClick('lg')" /></div>
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
    <div><WizIconButton label="sm" size="sm" :icon="WizISend" @click="onClick('sm')" /></div>
    <div>size = sm</div>
    <div><WizIconButton label="md" size="md" :icon="WizISend" @click="onClick('md')" /></div>
    <div>size = md</div>
    <div><WizIconButton label="lg" size="lg" :icon="WizISend" @click="onClick('lg')" /></div>
    <div>size = lg</div>
  </div>
</template>
      `,
    },
  },
};

export const Disabled: StoryFn = (_, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { WizIconButton },
  setup: () => ({ WizISend }),
  template: `
    <div style="display: grid; grid-template-columns: max-content max-content; grid-gap: 1rem; align-items: center;">
      <div><WizIconButton disabled label="send" :icon="WizISend" @click="onClick('primary disabled')" /></div>
      <div>disabled = true, variant = primary</div>
      <div><WizIconButton disabled label="sub" variant="sub" :icon="WizISend" @click="onClick('sub disabled')" /></div>
      <div>disabled = true, variant = sub</div>
      <div><WizIconButton disabled label="transparent" variant="transparent" :icon="WizISend" @click="onClick('transparent disabled')" /></div>
      <div>disabled = true, variant = transparent</div>
      <div><WizIconButton disabled label="link" variant="link" :icon="WizISend" @click="onClick('link disabled')" /></div>
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
    <div><WizIconButton disabled label="send" :icon="WizISend" @click="onClick('primary disabled')" /></div>
    <div>disabled = true, variant = primary</div>
    <div><WizIconButton disabled label="sub" variant="sub" :icon="WizISend" @click="onClick('sub disabled')" /></div>
    <div>disabled = true, variant = sub</div>
    <div><WizIconButton disabled label="transparent" variant="transparent" :icon="WizISend" @click="onClick('transparent disabled')" /></div>
    <div>disabled = true, variant = transparent</div>
    <div><WizIconButton disabled label="link" variant="link" :icon="WizISend" @click="onClick('link disabled')" /></div>
    <div>disabled = true, variant = link</div>
  </div>
</template>
      `,
    },
  },
};
