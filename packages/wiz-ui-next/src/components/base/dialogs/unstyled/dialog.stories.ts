 
import { Meta, StoryFn } from "@storybook/vue3";
import { defineComponent, ref } from "vue";

import { WizBox, WizHStack, WizText, WizTextButton } from "@/components";
import { WizIBusinessCenter, WizIClose } from "@/components/icons";

import { WizUnstyledDialog } from ".";

export default {
  title: "Base/Dialogs/UnstyledDialog",
  component: WizUnstyledDialog,
  argTypes: {
    value: {
      control: { type: "boolean" },
    },
  },
} as Meta<typeof WizUnstyledDialog>;

const ExampleComponent = defineComponent({
  components: { WizBox, WizHStack, WizText },
  template: `
  <WizBox bgColor="white.800" minWidth="300px" minHeight="300px">
    <WizHStack justify="center" align="center" p="xl">
      <WizText >Dialog Content</WizText>
    </WizHStack>
  </WizBox>
  `,
});

const Template: StoryFn<typeof WizUnstyledDialog> = (args) => ({
  components: {
    WizUnstyledDialog,
    WizText,
    WizTextButton,
    ExampleComponent,
  },
  setup() {
    const isOpen = ref(false);
    return { isOpen, WizIClose, WizIBusinessCenter, args };
  },
  template: `
  <div>
    <WizUnstyledDialog v-bind="args" v-model="isOpen">
      <ExampleComponent />
    </WizUnstyledDialog>
    <button @click="isOpen = true">Open</button>
    <div style="height: 200vh"></div>
  </div>
  `,
});

export const Default = Template.bind({});
Default.args = {};
