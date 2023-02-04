import { StoryFn } from "@storybook/vue";
import { FONT_SIZE_ACCESSORS } from "@wizleap-inc/wiz-ui-constants";

import { WizIClose } from "../../icons";

import WizTag from "./tag.vue";

export default {
  title: "Base/Tag",
  component: WizTag,
  argTypes: {
    fontSize: {
      control: { type: "select" },
      options: FONT_SIZE_ACCESSORS,
    },
    fontWeight: {
      control: { type: "select" },
      options: ["normal", "bold"],
    },
    variant: {
      control: { type: "select" },
      options: ["info", "error", "success", "mono"],
    },
    label: {
      control: { type: "text" },
    },
    width: {
      control: { type: "text" },
    },
  },
};

const Template: StoryFn = (_, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { WizTag },
  template: `<WizTag v-bind="$props" />`,
});

export const Default = Template.bind({});
Default.args = {
  label: "タグ",
};
Default.parameters = {
  docs: {
    source: {
      code: `
<template>
  <WizTag label="タグ" />
</template>
      `,
    },
  },
};

export const Bold = Template.bind({});
Bold.args = {
  label: "タグ",
  fontWeight: "bold",
};
Bold.parameters = {
  docs: {
    description: {
      story: "Bold を指定することで、文字を強調することができます。",
    },
    source: {
      code: `
<template>
  <WizTag label="タグ" fontWeight="bold" />
</template>
      `,
    },
  },
};

export const WithIcon = Template.bind({});
WithIcon.args = {
  label: "タグ",
  icon: WizIClose,
};
WithIcon.parameters = {
  docs: {
    description: {
      story:
        "アイコンを指定することができます。`WizI`というPrefixのコンポーネントがアイコンなのでそれを渡してください。選択肢はIconsを参照してください。",
    },
    source: {
      code: `
<template>
  <WizTag label="タグ" :icon="WizIClose" />
</template>
      `,
    },
  },
};

export const Width = Template.bind({});
Width.args = {
  label: "タグ",
  width: "100px",
};
Width.parameters = {
  docs: {
    description: {
      story: "`width` を指定することで、幅を指定することができます。",
    },
    source: {
      code: `
<template>
  <WizTag label="タグ" width="100px" />
</template>
      `,
    },
  },
};

export const Variant: StoryFn = (_, { argTypes }) => ({
  props: Object.keys(argTypes),
  setup: () => ({ WizIClose }),
  components: { WizTag },
  template: `
    <div style="display: grid; grid-template-columns: max-content max-content; grid-gap: 1rem; align-items: center;">
      <WizTag label="必須" variant="info" :icon="WizIClose" />
      <div>variant="info"</div>
      <WizTag label="自動失注" variant="error" :icon="WizIClose" />
      <div>variant="error"</div>
      <WizTag label="申請完了" variant="success" :icon="WizIClose" />
      <div>variant="success"</div>
      <WizTag label="11/11(月)" variant="mono" :icon="WizIClose" />
      <div>variant="mono"</div>
    </div>
  `,
});
Variant.parameters = {
  docs: {
    description: {
      story:
        "`variant` により、IconButton の色を決められたテーマ色に変更することができます。`info`, `error`, `success`, `mono`, から選択できます。 default は`info` です。",
    },
  },
  source: {
    code: `
<template>
  <div style="display: grid; grid-template-columns: max-content max-content; grid-gap: 1rem; align-items: center;">
    <WizTag label="必須" variant="info" :icon="WizIClose" />
    <div>variant="info"</div>
    <WizTag label="自動失注" variant="error" :icon="WizIClose" />
    <div>variant="error"</div>
    <WizTag label="申請完了" variant="success" :icon="WizIClose" />
    <div>variant="success"</div>
    <WizTag label="11/11(月)" variant="mono" :icon="WizIClose" />
    <div>variant="mono"</div>
  </div>
</template>
      `,
  },
};
