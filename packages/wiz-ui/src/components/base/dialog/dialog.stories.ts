import { StoryFn } from "@storybook/vue";
import { ref } from "vue";

import {
  WizIconButton,
  WizTextButton,
  WizTextInput,
  WizMessageBox,
  WizHStack,
  WizTag,
  WizText,
  WizTextArea,
  WizSelectBox,
} from "@/components";
import { WizIBusinessCenter, WizIClose } from "@/components/icons";

import { WizDialog } from ".";

export default {
  title: "Base/Dialog",
  component: WizDialog,
};

export const Default: StoryFn = (_, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: {
    WizDialog,
    WizIconButton,
    WizMessageBox,
    WizHStack,
    WizTag,
    WizText,
    WizTextArea,
    WizTextButton,
    WizTextInput,
    WizSelectBox,
  },
  setup() {
    const isOpen = ref(false);
    return { isOpen, WizIClose, WizIBusinessCenter };
  },
  template: `
  <div>
    <WizDialog v-bind="$props" v-model="isOpen">
      <template #mainHeaderArea>
        <WizText bold color="gray.700">Dialog 1</WizText>
      </template>
      <template #subHeaderArea>
        <WizIconButton variant="transparent" :icon="WizIClose" @click="isOpen = false" />
      </template>
      <WizText>Dialog 1</WizText>
      <template #footer>
        <WizTextButton @click="isOpen2 = true">Open Dialog 2</WizTextButton>
      </template>
    </WizDialog>
    <button @click="isOpen = true">Open</button>
    <div style="height: 200vh"></div>
  </div>
  `,
});

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
    return { isOpen, isOpen2, WizIClose };
  },
  template: `
  <div>
    <WizDialog v-bind="$props" v-model="isOpen">
      <template #mainHeaderArea>
        <WizText bold color="gray.700">Dialog 1</WizText>
      </template>
      <template #subHeaderArea>
        <WizIconButton variant="transparent" :icon="WizIClose" @click="isOpen = false" />
      </template>
      <WizText>Dialog 1</WizText>
      <template #footer>
        <WizTextButton @click="isOpen2 = true">Open Dialog 2</WizTextButton>
      </template>
    </WizDialog>
    <WizDialog v-bind="$props" v-model="isOpen2">
      <template #mainHeaderArea>
        <WizText bold color="gray.700">Dialog 2</WizText>
      </template>
      <template #subHeaderArea>
        <WizIconButton variant="transparent" :icon="WizIClose" @click="isOpen2 = false" />
      </template>
      <WizText>Dialog 2</WizText>
    </WizDialog>
    <button @click="isOpen = true">Open</button>
    <div style="height: 200vh"></div>
  </div>
  `,
});
