import { Meta, StoryFn } from "@storybook/vue3";
import { COLOR_MAP_ACCESSORS } from "@wizleap-inc/wiz-ui-constants";

import { WizAvatar } from ".";

export default {
  title: "Base/Avatar",
  component: WizAvatar,
  argTypes: {
    name: {
      control: { type: "text" },
    },
    size: {
      control: { type: "select" },
      options: ["md", "lg", "xl", "xl2", "xl3", "xl4"],
    },
    color: {
      control: { type: "select" },
      options: COLOR_MAP_ACCESSORS,
    },
    bgColor: {
      control: { type: "select" },
      options: COLOR_MAP_ACCESSORS,
    },
    src: {
      control: { type: "text" },
    },
    ariaLabel: {
      control: { type: "text" },
    },
    alt: {
      control: { type: "text" },
    },
    fallback: {
      control: { type: "text" },
    },
    clickable: {
      control: { type: "boolean" },
    },
    click: {
      action: "click",
    },
  },
} as Meta<typeof WizAvatar>;

const Template: StoryFn<typeof WizAvatar> = (args) => ({
  components: { WizAvatar },
  setup: () => ({ args }),
  template: `<WizAvatar v-bind="args" @click="args.click" />`,
});

export const HaveImage = Template.bind({});
HaveImage.args = {
  src: "./public/images/avatar-1.png",
  ariaLabel: "avatar",
  alt: "avatar",
};

HaveImage.parameters = {
  docs: {
    description: {
      story: "イメージの表示に成功したときに画像が表示されます。",
    },
    source: {
      code: `
<template>
  <WizAvatar src="./public/images/avatar-1.png" alt="avatar"/>
</template>
      `,
    },
  },
};

export const FailToLoadImage = Template.bind({});
FailToLoadImage.args = {
  src: "./public/images/avatar-0.png",
  ariaLabel: "avatar",
  name: "山田 tarou",
  alt: "avatar",
};

FailToLoadImage.parameters = {
  docs: {
    description: {
      story:
        "イメージの表示に失敗した場合は、画像の代わりに `alt` で指定した代替テキストが表示されます。",
    },
    source: {
      code: `
<template>
  <WizAvatar src="./public/images/avatar-0.png" name="avatar"/>
</template>
      `,
    },
  },
};

export const FailToLoadImageWithFallback = Template.bind({});
FailToLoadImageWithFallback.args = {
  src: "./public/images/avatar-0.png",
  ariaLabel: "avatar",
  alt: "avatar",
  fallback: "田",
};

FailToLoadImageWithFallback.parameters = {
  docs: {
    description: {
      story:
        "`fallback` を設定した場合、画像の表示に失敗した際に、`alt`の代わりに `fallback` で指定されたテキストが表示されます。（廃止予定）",
    },
    source: {
      code: `
<template>
  <WizAvatar src="./public/images/avatar-0.png" alt="avatar" fallback="田"/>
</template>
      `,
    },
  },
};

export const Clickable = Template.bind({});
Clickable.args = {
  src: "./public/images/avatar-1.png",
  ariaLabel: "avatar",
  alt: "avatar",
  clickable: true,
};

Clickable.parameters = {
  docs: {
    description: {
      story:
        "`clickable`を `true` にすることで、`onClick` を有効にすることができます。",
    },
    source: {
      code: `
<template>
  <WizAvatar src="./public/images/avatar-1.png" alt="avatar"/>
</template>
      `,
    },
  },
};
