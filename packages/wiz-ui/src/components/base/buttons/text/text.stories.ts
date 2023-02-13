import { expect } from "@storybook/jest";
import { userEvent, waitFor, within } from "@storybook/testing-library";
import { StoryFn } from "@storybook/vue";

import { WizIAdd } from "@/components/icons";

import WizTextButton from "./text.vue";

export default {
  title: "Base/Buttons/Text",
  component: WizTextButton,
  argTypes: {
    disabled: {
      control: { type: "boolean" },
    },
    rounded: {
      control: { type: "boolean" },
    },
    expand: {
      control: { type: "boolean" },
    },
    variant: {
      control: { type: "select" },
      options: ["primary", "sub"],
    },
    size: {
      control: { type: "select" },
      options: ["xs", "sm", "md", "lg"],
    },
    icon: {
      control: { type: "object" },
    },
    iconPosition: {
      control: { type: "select" },
      options: ["left", "right"],
    },
    click: {
      action: "click",
    },
  },
};

const Template: StoryFn = (_, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { WizTextButton },
  template: `<WizTextButton v-bind="$props" @click="click">{{ "保存する" }}</WizTextButton>`,
});

export const Default = Template.bind({});

Default.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const button = canvas.getByRole("button");
  await userEvent.click(button);
  await waitFor(() => expect(button).toHaveFocus());
};

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
  <WizTextButton disabled @click="click">{{ "保存する" }}</WizTextButton>
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
  <WizTextButton rounded @click="click">{{ "保存する" }}</WizTextButton>
</template>
      `,
    },
  },
};

export const Expand = Template.bind({});
Expand.args = {
  expand: true,
};

Expand.parameters = {
  docs: {
    description: {
      story: "`expand` を指定すると、ボタンは幅いっぱいに広がります。 ",
    },
    source: {
      code: `
<template>
  <WizTextButton expand @click="click">{{ "保存する" }}</WizTextButton>
</template>
      `,
    },
  },
};

export const Icon = Template.bind({});
Icon.args = {
  icon: WizIAdd,
};

Icon.parameters = {
  docs: {
    description: {
      story:
        "アイコンを指定することができます。`WizI`というPrefixのコンポーネントがアイコンなのでそれを渡してください。選択肢はIconsを参照してください。",
    },
    source: {
      code: `
<template>
  <WizTextButton :icon="WizIAdd" @click="click">{{ "保存する" }}</WizTextButton>
</template>
      `,
    },
  },
};

export const IconPosition = Template.bind({});
IconPosition.args = {
  icon: WizIAdd,
  iconPosition: "right",
};

IconPosition.parameters = {
  docs: {
    description: {
      story: `
アイコンの配置を指定することができます。
- left: 左寄せ
- right: 右寄せ
`,
    },
    source: {
      code: `
<template>
  <WizTextButton :icon="WizIAdd" iconPosition="right" @click="click">{{ "保存する" }}</WizTextButton>
</template>
      `,
    },
  },
};

export const Variant: StoryFn = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { WizTextButton },
  template: `
    <div style="display: grid; grid-template-columns: max-content max-content; grid-gap: 1rem; align-items: center;">
      <WizTextButton variant="primary">保存する</WizTextButton>
      <div>variant = primary</div>
      <WizTextButton variant="sub">保存する</WizTextButton>
      <div>variant = sub</div>
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
    <WizTextButton variant="primary">保存する</WizTextButton>
    <div>variant = primary</div>
    <WizTextButton variant="sub">保存する</WizTextButton>
    <div>variant = sub</div>
  </div>
</template>
      `,
    },
  },
};

export const Size: StoryFn = (_, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { WizTextButton },
  template: `
    <div style="display: grid; grid-template-columns: max-content max-content; grid-gap: 1rem; align-items: center;">
      <WizTextButton size="xs">保存する</WizTextButton>
      <div>size = xs</div>
      <WizTextButton size="sm">保存する</WizTextButton>
      <div>size = sm</div>
      <WizTextButton size="md">保存する</WizTextButton>
      <div>size = md</div>
      <WizTextButton size="lg">保存する</WizTextButton>
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
    <WizTextButton size="sm" :inActiveIcon="WizIAdd" :activeIcon="WizIRemove" @click="args.onClick('Small')">{{ "顧客データ追加" }}</WizTextButton>
    <div>size = sm</div>
    <WizTextButton size="md" :inActiveIcon="WizIAdd" :activeIcon="WizIRemove" @click="args.onClick('Medium')">{{ "顧客データ追加" }}</WizTextButton>
    <div>size = md</div>
    <WizTextButton size="lg" :inActiveIcon="WizIAdd" :activeIcon="WizIRemove" @click="args.onClick('Large')">{{ "顧客データ追加" }}</WizTextButton>
    <div>size = lg</div>
  </div>
</template>
      `,
    },
  },
};
