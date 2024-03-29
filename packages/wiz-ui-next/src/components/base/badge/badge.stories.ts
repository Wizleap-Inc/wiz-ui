import { StoryFn, Meta } from "@storybook/vue3";
import {
  COLOR_MAP_ACCESSORS,
  SPACING_ACCESSORS,
} from "@wizleap-inc/wiz-ui-constants";
import { defineComponent } from "vue";

import { WizAvatar, WizIcon, WizIconButton } from "@/components";
import { WizINotification } from "@/components/icons";

import { WizBadge } from ".";

export default {
  title: "Base/Badge",
  component: WizBadge,
  argTypes: {
    hidden: {
      control: { type: "boolean" },
    },
    label: {
      control: { type: "text" },
    },
    color: {
      control: { type: "select" },
      options: COLOR_MAP_ACCESSORS,
    },
    bgColor: {
      control: { type: "select" },
      options: COLOR_MAP_ACCESSORS,
    },
    offset: {
      control: { type: "select" },
      options: SPACING_ACCESSORS,
    },
    size: {
      control: { type: "select" },
      options: ["sm", "md", "lg"],
    },
    buttonClick: {
      action: "buttonClick",
    },
  },
} as Meta<typeof WizBadge>;

const SampleBadgedComponents = defineComponent({
  components: { WizAvatar },
  template: `<WizAvatar src="./public/images/avatar-1.png" alt="avatar" />`,
});

const Template: StoryFn<typeof WizBadge> = (args, { argTypes }) => ({
  components: { WizBadge, SampleBadgedComponents },
  setup: () => ({ args, argTypes }),
  template: `<WizBadge v-bind="args"><sampleBadgedComponents /></WizBadge>`,
});

export const Default = Template.bind({});

export const Hidden = Template.bind({});
Hidden.args = {
  hidden: true,
};
Hidden.parameters = {
  docs: {
    description: {
      story:
        "`コンポーネントを非表示にすることができます。default は`false` です。",
    },
    source: {
      code: `
<template>
  <WizBadge hidden><sampleBadgedComponents /></WizBadge>
</template>
      `,
    },
  },
};

export const WithLabel = Template.bind({});
WithLabel.args = {
  label: "99+",
};
WithLabel.parameters = {
  docs: {
    description: {
      story: "Badge 内に label テキストを表示します。",
    },
    source: {
      code: `
<template>
  <WizBadge label="99+"><sampleBadgedComponents /></WizBadge>
</template>
      `,
    },
  },
};

export const WithOffset: StoryFn<typeof WizBadge> = (args) => ({
  components: { WizBadge, WizAvatar },
  setup: () => ({
    SPACING_ACCESSORS,
    args,
  }),
  template: `
    <div style="display: grid; grid-template-columns: max-content max-content; grid-gap: 1rem; align-items: center;">
      <template v-for="offset in SPACING_ACCESSORS">
        <div>Offset = {{ offset }}</div>
        <WizBadge label="99+" :offset="offset">
          <WizAvatar src="./public/images/avatar-1.png" alt="avatar" />
        </WizBadge>
      </template>
    </div>
  `,
});

WithOffset.parameters = {
  docs: {
    description: {
      story:
        "Badge の位置を変更することができます。選択肢はVariablesのSpacingを参照してください。default は `no` です。",
    },
    source: {
      code: `
<template>
  <div style="display: grid; grid-template-columns: max-content max-content; grid-gap: 1rem; align-items: center;">
      <template v-for="offset in SPACING_ACCESSORS">
        <div>Offset = {{ offset }}</div>
        <WizBadge label="99+" :offset="offset">
          <WizAvatar src="./public/images/avatar-1.png" alt="avatar" />
        </WizBadge>
      </template>
    </div>
</template>
      `,
    },
  },
};

export const WithColor: StoryFn<typeof WizBadge> = (args) => ({
  components: { WizBadge, WizAvatar },
  setup: () => ({
    COLOR_MAP_ACCESSORS,
    args,
  }),
  template: `
    <div style="display: grid; grid-template-columns: max-content max-content; grid-gap: 1rem; align-items: center;">
      <template v-for="color in COLOR_MAP_ACCESSORS">
        <div>Color = {{ color }}</div>
        <WizBadge label="99+" :color="color">
          <WizAvatar src="./public/images/avatar-1.png" alt="avatar" />
        </WizBadge>
      </template>
    </div>
  `,
});

WithColor.parameters = {
  docs: {
    description: {
      story:
        "Badge の文字色を変更することができます。選択肢はVariablesのColorを参照してください。default は `white.800` です。",
    },
    source: {
      code: `
<template>
  <div style="display: grid; grid-template-columns: max-content max-content; grid-gap: 1rem; align-items: center;">
    <template v-for="color in COLOR_MAP_ACCESSORS">
      <div>Color = {{ color }}</div>
      <WizBadge label="99+" :color="color">
        <WizAvatar src="./public/images/avatar-1.png" alt="avatar" />
      </WizBadge>
    </template>
  </div>
</template>
      `,
    },
  },
};

export const WithBgColor: StoryFn<typeof WizBadge> = (args) => ({
  components: { WizBadge, WizAvatar },
  setup: () => ({
    COLOR_MAP_ACCESSORS,
    args,
  }),
  template: `
    <div style="display: grid; grid-template-columns: max-content max-content; grid-gap: 1rem; align-items: center;">
      <template v-for="bgColor in COLOR_MAP_ACCESSORS">
        <div>Background Color = {{ bgColor }}</div>
        <WizBadge label="99+" :bg-color="bgColor">
          <WizAvatar src="./public/images/avatar-1.png" alt="avatar" />
        </WizBadge>
      </template>
    </div>
  `,
});

WithBgColor.parameters = {
  docs: {
    description: {
      story:
        "Badge の背景の色を変更することができます選択肢はVariablesのColorを参照してください。default は `red.800` です。",
    },
    source: {
      code: `
<template>
  <div style="display: grid; grid-template-columns: max-content max-content; grid-gap: 1rem; align-items: center;">
    <template v-for="bgColor in COLOR_MAP_ACCESSORS">
      <div>Background Color = {{ bgColor }}</div>
      <WizBadge label="99+" :bg-color="bgColor">
        <WizAvatar src="./public/images/avatar-1.png" alt="avatar" />
      </WizBadge>
    </template>
  </div>
</template>
      `,
    },
  },
};

export const WithSize: StoryFn<typeof WizBadge> = (args) => ({
  components: { WizBadge, WizAvatar },
  setup: () => ({
    SIZES: ["sm", "md", "lg"],
    args,
  }),
  template: `
    <div style="display: grid; grid-template-columns: max-content max-content; grid-gap: 1rem; align-items: center;">
      <template v-for="size in SIZES">
        <div>Size = {{ size }}</div>
        <WizBadge label="99+" :size="size">
          <WizAvatar src="./public/images/avatar-1.png" alt="avatar" />
        </WizBadge>
      </template>
    </div>
  `,
});

WithSize.parameters = {
  docs: {
    description: {
      story:
        "Badge の大きさを変更することができます。`sm`, `md`, `lg` の中から選択できます。 default は `md` です。",
    },
    source: {
      code: `
<template>
  <div style="display: grid; grid-template-columns: max-content max-content; grid-gap: 1rem; align-items: center;">
    <template v-for="bgColor in COLOR_MAP_ACCESSORS">
      <div>Background Color = {{ bgColor }}</div>
      <WizBadge label="99+" :bg-color="bgColor">
        <WizAvatar src="./public/images/avatar-1.png" alt="avatar" />
      </WizBadge>
    </template>
  </div>
</template>
      `,
    },
  },
};

export const WithSlot: StoryFn<typeof WizBadge> = (args) => ({
  components: { WizBadge, WizAvatar, WizIcon },
  setup: () => ({
    WizINotification,
    args,
  }),
  template: `
    <div style="display: grid; grid-template-columns: max-content max-content; grid-gap: 1rem; align-items: center;">
      <div>Slot = WizIcon</div>
      <WizBadge label="99+">
        <WizIcon :icon="WizINotification" size="xl6" />
      </WizBadge>
      <div>Slot = WizAvatar</div>
      <WizBadge label="99+" size="sm">
        <WizAvatar src="./public/images/avatar-1.png" alt="avatar" />
      </WizBadge>
    </div>
  `,
});

WithSlot.parameters = {
  docs: {
    description: {
      story: "`<WizBadge>`にコンポーネントを内包して設定することもできます。",
    },
    source: {
      code: `
<template>
  <div style="display: grid; grid-template-columns: max-content max-content; grid-gap: 1rem; align-items: center;">
      <div>Slot = WizIcon</div>
      <WizBadge label="99+">
        <WizIcon :icon="WizINotification" size="xl6" />
      </WizBadge>
      <div>Slot = WizAvatar</div>
      <WizBadge label="99+" size="sm">
        <WizAvatar src="./public/images/avatar-1.png" alt="avatar" />
      </WizBadge>
    </div>
</template>
      `,
    },
  },
};

export const WithIconButton: StoryFn<typeof WizBadge> = (args) => ({
  components: { WizBadge, WizIconButton, WizIcon },
  setup: () => ({
    WizINotification,
    args,
  }),
  template: `
  <WizBadge label="99+">
    <WizIconButton size="xl4" :icon="WizINotification" variant="transparent" @click="args.buttonClick" />
  </WizBadge>
  `,
});

WithSlot.parameters = {
  docs: {
    description: {
      story: "`<WizBadge>` に `<WizIconButton>` を内包することもできます。",
    },
    source: {
      code: `
<template>
  <WizBadge label="99+">
    <WizIconButton size="xl4" :icon="WizINotification" variant="transparent" @click="args.buttonClick" />
  </WizBadge>
</template>
      `,
    },
  },
};
