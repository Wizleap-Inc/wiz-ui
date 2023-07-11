import { StoryFn, Meta } from "@storybook/vue3";
import { FONT_SIZE_ACCESSORS } from "@wizleap-inc/wiz-ui-constants";

import { WizMenuItem } from "./";

export default {
  title: "Base/MenuItem",
  component: WizMenuItem,
  argTypes: {
    value: {
      control: {
        type: "text",
      },
    },
    expand: {
      control: {
        type: "boolean",
      },
    },
    fontSize: {
      control: { type: "select" },
      options: FONT_SIZE_ACCESSORS,
      defaultValue: "md",
    },
    click: {
      action: "click",
    },
  },
} as Meta<typeof WizMenuItem>;

const Template: StoryFn<typeof WizMenuItem> = (args) => ({
  components: { WizMenuItem },
  setup: () => ({ args }),
  template: `<div><WizMenuItem v-bind="args" @click="args.click"/></div>`,
});

export const Default = Template.bind({});
Default.args = {
  label: "テスト",
};
Default.parameters = {
  docs: {
    description: {
      story:
        "サブメニューのコンポーネントです。このコンポーネントでは、`label` パラメータが必須です。",
    },
    source: {
      code: `
<template>
  <WizMenuItem label="テスト"/>
</template>
      `,
    },
  },
};

export const Active = Template.bind({});
Active.args = {
  label: "テスト",
  active: true,
};
Active.parameters = {
  docs: {
    description: {
      story:
        "Active を設定することで、常にアクティブ化することもできます。 default 値は `false` です。",
    },
    source: {
      code: `
<template>
  <WizMenuItem label="テスト" active/>
</template>
      `,
    },
  },
};

export const Disabled = Template.bind({});
Disabled.args = {
  label: "テスト",
  clickable: false,
};
Disabled.parameters = {
  docs: {
    description: {
      story:
        "`clickable = false`  とすることで、クリックできないように設定することもできます。default 値は `true`",
    },
    source: {
      code: `
<template>
  <WizMenuItem label="テスト" clickable="false"/>
</template>
      `,
    },
  },
};

export const Expand = Template.bind({});
Expand.args = {
  label: "テスト",
  expand: true,
};
Expand.parameters = {
  docs: {
    description: {
      story:
        "`expand = true` とすることで、親要素の幅いっぱいにメニューを表示することができます。default 値は `false` です。",
    },
    source: {
      code: `
<template>
  <WizMenuItem label="テスト" expand/>
</template>
      `,
    },
  },
};

export const FontSize = Template.bind({});
FontSize.args = {
  label: "テスト",
  fontSize: "lg",
};
