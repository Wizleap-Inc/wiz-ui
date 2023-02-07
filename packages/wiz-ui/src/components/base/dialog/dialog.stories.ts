import { StoryFn } from "@storybook/vue";
import Vue, { ref } from "vue";

import { WizIconButton, WizTextButton, WizText } from "@/components";
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
};

const Template: StoryFn = (_, { argTypes }) => ({
  props: [...Object.keys(argTypes), "slotDefault", "slotTitle", "slotFooter"],
  components: {
    WizDialog,
    WizText,
    WizTextButton,
  },
  setup() {
    const isOpen = ref(false);
    return { isOpen, WizIClose, WizIBusinessCenter };
  },
  template: `
  <div>
    <WizDialog v-bind="$props" v-model="isOpen">
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
  title: "Dialog Title",
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

const ExampleTitleComponent = Vue.component("CustomHeader", {
  components: { WizTag, WizText },
  template: `
  <div style="display: flex; align-items: center; gap: 8px;">
    <WizTag color="gray.300" label="Tag" />
    <WizText bold color="gray.700">Custom Header</WizText>
  </div>
  `,
});

export const SlotTitle = Template.bind({});
SlotTitle.args = {
  slotTitle: ExampleTitleComponent,
};
SlotTitle.parameters = {
  docs: {
    description: {
      story:
        "Dialog の ヘッダーのデザインをカスタマイズしたい場合に指定します。slotTitle 内部は Vue コンポーネントで指定することができます。",
    },
    source: {
      code: `
// Customize Title Component
Vue.component("CustomHeader", {
  components: { WizTag, WizText },
  template: "
  <div style="display: flex; align-items: center; gap: 8px;">
    <WizTag color="gray.300" label="Tag" />
    <WizText bold color="gray.700">Custom Header</WizText>
  </div>
  ",
});

<template>
  <div>
    <WizDialog maxWidth="300px" :slotTitle="ExampleTitleComponent" v-model="isOpen">
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

const ExampleComponent = Vue.component("ExampleComponent", {
  components: { WizText },
  template: `
  <div>
    <WizText>Dialog Content</WizText>
  </div>
  `,
});

export const Slot = Template.bind({});
Slot.args = {
  slotDefault: ExampleComponent,
};
Slot.parameters = {
  docs: {
    description: {
      story:
        "Dialog の Body をカスタマイズしたい場合に指定します。slotDefault 内部は Vue コンポーネントで指定することができます。",
    },
    source: {
      code: `
// Customize Body Component
const ExampleComponent = Vue.component("ExampleComponent", {
  components: { WizText },
  template: "
  <div>
    <WizText>Dialog Content</WizText>
  </div>
  ",
});

<template>
  <div>
    <WizDialog maxWidth="300px" :slotDefault="ExampleComponent" v-model="isOpen">
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

const ExampleFooterComponent = Vue.component("ExampleFooterComponent", {
  components: { WizTextButton },
  template: `
  <div>
    <WizTextButton>SUBMIT</WizTextButton>
  </div>
  `,
});

export const SlotFooter = Template.bind({});
SlotFooter.args = {
  slotFooter: ExampleFooterComponent,
};
SlotFooter.parameters = {
  docs: {
    description: {
      story:
        "Dialog の Footer をカスタマイズしたい場合に指定します。slotFooter 内部は Vue コンポーネントで指定することができます。",
    },
    source: {
      code: `
// Customize Footer Component
const ExampleFooterComponent = Vue.component("ExampleFooterComponent", {
  components: { WizTextButton },
  template: "
  <div>
    <WizTextButton>SUBMIT</WizTextButton>
  </div>
  ",
});

<template>
  <div>
    <WizDialog maxWidth="300px" :slotFooter="ExampleComponent" v-model="isOpen">
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
  slotFooter: ExampleFooterComponent,
};
SlotFooter.parameters = {
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

export const Example = Template.bind({});
Example.args = {
  title: "Dialog Title",
  slotDefault: ExampleComponent,
  slotFooter: ExampleFooterComponent,
};

export const NestedDialog: StoryFn = (_, { argTypes }) => ({
  props: Object.keys(argTypes),
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
    return { isOpen, isOpen2, isOpen3, WizIClose };
  },
  template: `
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
