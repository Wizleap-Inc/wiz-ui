import { StoryFn } from "@storybook/vue";
import {
  COLOR_MAP_ACCESSORS,
  FONT_SIZE_ACCESSORS,
  FONT_WEIGHT_ACCESSORS,
} from "@wizleap-inc/wiz-ui-constants";
import StoryRouter from "storybook-vue-router";

import WizIArrowRight from "../../icons/arrow-right.vue";

import WizAnchor from "./anchor.vue";

const Home = {
  template: "<div>Home</div>",
};
const About = {
  template: "<div>About</div>",
};

export default {
  title: "Base/Anchor",
  component: WizAnchor,
  argTypes: {
    to: {
      table: {
        type: {
          summary: "string | Location",
        },
      },
    },
    fontSize: {
      control: { type: "select" },
      options: FONT_SIZE_ACCESSORS,
      defaultValue: "md",
    },
    fontWeight: {
      control: { type: "select" },
      options: FONT_WEIGHT_ACCESSORS,
      defaultValue: "normal",
    },
    color: {
      control: { type: "select" },
      options: COLOR_MAP_ACCESSORS,
      defaultValue: "blue.800",
    },
    iconPosition: {
      control: { type: "select" },
      options: ["left", "right"],
      defaultValue: "left",
    },
    openInNewTab: {
      control: { type: "boolean" },
      defaultValue: false,
    },
    icon: {
      control: { type: "object" },
    },
    default: {
      table: {
        type: {
          summary: "string | Component",
        },
      },
    },
    nowrap: {
      control: { type: "boolean" },
      defaultValue: false,
    },
  },
  decorators: [
    StoryRouter([
      { path: "/", name: "home", component: Home },
      { path: "/about", name: "about", component: About },
    ]),
  ],
};

const Template: StoryFn = (_, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { WizAnchor },
  template: `<WizAnchor v-bind="$props">{{ slotDefault }}</WizAnchor>`,
});

export const Default = Template.bind({});
Default.args = {
  slotDefault: "○○へ飛ぶ",
  to: "#",
};
Default.parameters = {
  docs: {
    description: {
      story: `
Vue RouterのRouter Linkを内包しているので、Router Linkのtoを参照してください。
toが文字列かつ、http(s)で始まる場合は、外部リンクとして<a> + hrefで出力されます。
      `,
    },
    source: {
      code: `
<template>
  <WizAnchor to="#">○○へ飛ぶ</WizAnchor>
</template>
      `,
    },
  },
};

export const Color = Template.bind({});
Color.args = {
  slotDefault: "○○へ飛ぶ",
  color: "red.800",
};
Color.parameters = {
  docs: {
    description: {
      story:
        "文字色を指定することができます。選択肢はVariablesのColorを参照してください。",
    },
    source: {
      code: `
<template>
  <WizAnchor color="red.800" to="#">○○へ飛ぶ</WizAnchor>
</template>
      `,
    },
  },
};

export const FontSize = Template.bind({});
FontSize.args = {
  slotDefault: "○○へ飛ぶ",
  fontSize: "sm",
};
FontSize.parameters = {
  docs: {
    description: {
      story:
        "文字サイズを指定することができます。選択肢はVariablesのFontSizeを参照してください。",
    },
    source: {
      code: `
<template>
  <WizAnchor fontSize="sm" to="#">○○へ飛ぶ</WizAnchor>
</template>
      `,
    },
  },
};

export const FontWight = Template.bind({});
FontWight.args = {
  slotDefault: "○○へ飛ぶ",
  fontWeight: "bold",
};
FontWight.parameters = {
  docs: {
    description: {
      story: "文字の太さを指定することができます。",
    },
    source: {
      code: `
<template>
  <WizAnchor fontWeight="bold" to="#">○○へ飛ぶ</WizAnchor>
</template>
      `,
    },
  },
};

export const Icon = Template.bind({});
Icon.args = {
  slotDefault: "○○へ飛ぶ",
  icon: WizIArrowRight,
};
Icon.parameters = {
  docs: {
    description: {
      story:
        "アイコンを指定することができます。`WizI`というPrefixのコンポーネントがアイコンなのでそれを渡してください。選択肢はIconsを参照してください。",
    },
    source: {
      code: `
import { WizIArrowRight } from "@wizleap-inc/wiz-ui";
<template>
  <WizAnchor :icon="WizIArrowRight">○○へ飛ぶ</WizAnchor>
</template>
      `,
    },
  },
};

export const IconPosition = Template.bind({});
IconPosition.args = {
  slotDefault: "○○へ飛ぶ",
  icon: WizIArrowRight,
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
import { WizIArrowRight } from "@wizleap-inc/wiz-ui";
<template>
  <WizAnchor :icon="WizIArrowRight" iconPosition="right" to="#">○○へ飛ぶ</WizAnchor>
</template>
      `,
    },
  },
};

export const OpenInNewTab = Template.bind({});
OpenInNewTab.args = {
  slotDefault: "○○へ飛ぶ",
  to: "https://wizleap.co.jp",
  openInNewTab: true,
};
OpenInNewTab.parameters = {
  docs: {
    description: {
      story: "外部リンクの場合、新しいタブで開くかどうかを指定できます。",
    },
    source: {
      code: `
<template>
  <WizAnchor to="https://wizleap.co.jp" openInNewTab>○○へ飛ぶ</WizAnchor>
</template>
      `,
    },
  },
};
