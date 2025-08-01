/* eslint-disable vue/one-component-per-file */
import { Meta, StoryFn } from "@storybook/vue3";
import { defineComponent, ref } from "vue";

import { WizIconButton, WizText, WizTextButton } from "@/components";
import { WizTag } from "@/components/base/tag";
import { WizIBusinessCenter, WizIClose } from "@/components/icons";

import { WizDialog } from ".";

export default {
  title: "Base/Dialog",
  component: WizDialog,
  argTypes: {
    value: {
      control: { type: "boolean" },
    },
    title: {
      control: { type: "text" },
    },
    maxWidth: {
      control: { type: "text" },
    },
    align: {
      control: { type: "select" },
      options: ["start", "center", "end"],
    },
  },
} as Meta<typeof WizDialog>;

const ExampleTitleComponent = defineComponent({
  components: { WizTag, WizText },
  template: `
  <div style="display: flex; align-items: center; gap: 8px;">
    <WizTag color="gray.300" label="Tag" />
    <WizText bold color="gray.700">Dialog Title From Slot</WizText>
  </div>
  `,
});

const ExampleComponent = defineComponent({
  components: { WizText },
  template: `
  <div>
    <WizText>Dialog Content</WizText>
  </div>
  `,
});

const ExampleFooterComponent = defineComponent({
  components: { WizTextButton },
  template: `
  <div>
    <WizTextButton>SUBMIT</WizTextButton>
  </div>
  `,
});

const Template: StoryFn<typeof WizDialog> = (args) => ({
  components: {
    WizDialog,
    WizText,
    WizTextButton,
    ExampleComponent,
    ExampleTitleComponent,
    ExampleFooterComponent,
  },
  setup() {
    const isOpen = ref(false);
    return { isOpen, WizIClose, WizIBusinessCenter, args };
  },
  template: `
  <div>
    <WizDialog v-bind="args" :modelValue="true">
      <template #title>
        <ExampleTitleComponent />
      </template>
      <ExampleComponent />
      <template #footer>
        <ExampleFooterComponent />
      </template>
    </WizDialog>
    <button>Open</button>
    <div style="height: 200vh"></div>
  </div>
  `,
});

export const Default = Template.bind({});
Default.args = {};

export const MaxWidth = Template.bind({});
MaxWidth.args = {
  maxWidth: "300px",
};
MaxWidth.parameters = {
  docs: {
    description: {
      story: "最大幅を指定することができます。",
    },
    source: {
      code: `
<template>
  <div>
    <WizDialog maxWidth="300px" v-model="isOpen">
      <template #title v-if="slotTitle">
        <component :is="slotTitle" />
      </template>
      <component :is="slotDefault" />
      <template #footer v-if="slotFooter">
        <component :is="slotFooter" />
      </template>
    </WizDialog>
    <button @click="isOpen = true">Open</button>
    <div style="height: 200vh"></div>
  </div>
</template>
      `,
    },
  },
};

export const Title = Template.bind({});
Title.args = {
  title: "Dialog Title From Props",
};
Title.parameters = {
  docs: {
    description: {
      story: "Dialog の タイトル名を指定することができます。",
    },
    source: {
      code: `
<template>
  <div>
    <WizDialog title="Dialog Title" v-model="isOpen">
      <template #title v-if="slotTitle">
        <component :is="slotTitle" />
      </template>
      <component :is="slotDefault" />
      <template #footer v-if="slotFooter">
        <component :is="slotFooter" />
      </template>
    </WizDialog>
    <button @click="isOpen = true">Open</button>
    <div style="height: 200vh"></div>
  </div>
</template>
      `,
    },
  },
};

export const Align = Template.bind({});
Align.args = {
  align: "center",
};
Align.parameters = {
  docs: {
    description: {
      story:
        "`align` を指定することができます。選択肢は `start`, `center`, `end` の中から選択できます。",
    },
    source: {
      code: `
<template>
  <div>
    <WizDialog maxWidth="300px" align="center" v-model="isOpen">
      <template #title v-if="slotTitle">
        <component :is="slotTitle" />
      </template>
      <component :is="slotDefault" />
      <template #footer v-if="slotFooter">
        <component :is="slotFooter" />
      </template>
    </WizDialog>
    <button @click="isOpen = true">Open</button>
    <div style="height: 200vh"></div>
  </div>
</template>
      `,
    },
  },
};

export const HideClose = Template.bind({});
HideClose.args = {
  hideClose: true,
};
HideClose.parameters = {
  docs: {
    description: {
      story: "Dialog の 閉じるボタンを非表示にすることができます。",
    },
    source: {
      code: `
<template>
  <div>
    <WizDialog hideClose v-model="isOpen">
      <template #title v-if="slotTitle">
        <component :is="slotTitle" />
      </template>
      <component :is="slotDefault" />
      <template #footer v-if="slotFooter">
        <component :is="slotFooter" />
      </template>
    </WizDialog>
    <button @click="isOpen = true">Open</button>
    <div style="height: 200vh"></div>
  </div>
</template>
      `,
    },
  },
};

export const Playground: StoryFn<typeof WizDialog> = (args) => ({
  components: {
    WizDialog,
    WizText,
    WizTextButton,
    ExampleComponent,
    ExampleTitleComponent,
    ExampleFooterComponent,
  },
  setup() {
    const isOpen = ref(false);
    return { isOpen, WizIClose, WizIBusinessCenter, args };
  },
  template: `
  <div>
    <WizDialog v-bind="args" v-model="isOpen">
      <template #title>
        <ExampleTitleComponent />
      </template>
      <ExampleComponent />
      <template #footer>
        <ExampleFooterComponent />
      </template>
    </WizDialog>
    <button @click="isOpen = true">Open</button>
    <div style="height: 200vh"></div>
  </div>
  `,
});

export const NestedDialog: StoryFn<typeof WizDialog> = (args) => ({
  components: {
    WizDialog,
    WizIconButton,
    WizTextButton,
    WizText,
  },
  setup() {
    const isOpen = ref(false);
    const isOpen2 = ref(false);
    const isOpen3 = ref(false);
    return { isOpen, isOpen2, isOpen3, WizIClose, args };
  },
  template: `
  <div>
    <WizDialog v-bind="args" v-model="isOpen" title="Dialog 1">
      <WizText>Dialog 1</WizText>
      <template #footer>
        <WizTextButton @click="isOpen2 = true">Open Dialog 2</WizTextButton>
      </template>
    </WizDialog>
    <WizDialog v-bind="args" v-model="isOpen2" title="Dialog 2" maxWidth="300px">
      <WizText>Dialog 2</WizText>
      <template #footer>
        <WizTextButton @click="isOpen3 = true">Open Dialog 3</WizTextButton>
      </template>
    </WizDialog>
    <WizDialog v-bind="args" v-model="isOpen3" title="Dialog 3">
      <WizText>Dialog 3</WizText>
    </WizDialog>
    <button @click="isOpen = true">Open</button>
    <div style="height: 200vh"></div>
  </div>
  `,
});
NestedDialog.parameters = {
  docs: {
    description: {
      story: "dialog の中に dialog コンポーネントを設定することもできます。",
    },
    source: {
      code: `
<template>
  <div>
    <WizDialog v-bind="$props" v-model="isOpen" title="Dialog 1">
      <WizText>Dialog 1</WizText>
      <template #footer>
        <WizTextButton @click="isOpen2 = true">Open Dialog 2</WizTextButton>
      </template>
    </WizDialog>
    <WizDialog v-bind="$props" v-model="isOpen2" title="Dialog 2" maxWidth="300px">
      <WizText>Dialog 2</WizText>
      <template #footer>
        <WizTextButton @click="isOpen3 = true">Open Dialog 3</WizTextButton>
      </template>
    </WizDialog>
    <WizDialog v-bind="$props" v-model="isOpen3" title="Dialog 3">
      <WizText>Dialog 3</WizText>
    </WizDialog>
    <button @click="isOpen = true">Open</button>
    <div style="height: 200vh"></div>
  </div>
</template>
      `,
    },
  },
};
