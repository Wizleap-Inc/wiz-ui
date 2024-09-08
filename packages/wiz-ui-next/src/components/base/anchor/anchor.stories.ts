import { Meta, StoryFn } from "@storybook/vue3";
import {
  COLOR_MAP_ACCESSORS,
  FONT_SIZE_ACCESSORS,
  FONT_WEIGHT_ACCESSORS,
} from "@wizleap-inc/wiz-ui-constants";

import WizIArrowRight from "../../icons/arrow-right.vue";

import WizAnchor from "./anchor.vue";

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
    },
    fontWeight: {
      control: { type: "select" },
      options: FONT_WEIGHT_ACCESSORS,
    },
    color: {
      control: { type: "select" },
      options: COLOR_MAP_ACCESSORS,
    },
    iconPosition: {
      control: { type: "select" },
      options: ["left", "right"],
    },
    openInNewTab: {
      control: { type: "boolean" },
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
    },
    onClick: {
      action: "onClick",
    },
  },
} as Meta<typeof WizAnchor>;

const Template: StoryFn<typeof WizAnchor> = (args) => ({
  components: { WizAnchor },
  setup: () => ({ args }),
  template: `<WizAnchor v-bind="args">○○へ飛ぶ</WizAnchor>`,
});

export const Default = Template.bind({});
Default.args = {
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
  to: "#",
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
  to: "#",
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
  to: "#",
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
  to: "#",
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
  to: "#",
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
