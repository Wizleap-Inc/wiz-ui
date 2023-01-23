import { Meta, StoryFn } from "@storybook/vue3";

import { WizText } from "@/components";

import { WizMeterGraph } from ".";

export default {
  title: "Base/Graphs/Meter",
  component: WizMeterGraph,
  argTypes: {
    percentage: {
      control: { type: "number" },
    },
  },
} as Meta<typeof WizMeterGraph>;

interface Option {
  percentage: number;
  slot: string;
}

const CODE_TEMPLATE = ({ percentage, slot }: Partial<Option>) => `
<script setup lang="ts">
import { WizMeterGraph } from "@wizleap-inc/wiz-ui";
</script>

<template>
  <WizMeterGraph ${percentage ? `percentage="${percentage}"` : ""}>
    ${slot || ""}
  </WizMeterGraph>
</template>
`;

const Template: StoryFn<typeof WizMeterGraph> = (args) => ({
  setup: () => ({ args }),
  components: { WizMeterGraph },
  template: `
    <WizMeterGraph v-bind="args"/>
  `,
});

export const Default = Template.bind({});
Default.args = {
  percentage: 56,
};
Default.parameters = {
  docs: {
    source: {
      code: CODE_TEMPLATE({ percentage: 56 }),
    },
  },
};

export const Slot: StoryFn<typeof WizMeterGraph> = (args) => ({
  setup: () => ({ args }),
  components: { WizMeterGraph, WizText },
  template: `
    <WizMeterGraph v-bind="args">
      <WizText>ここはSlotです</WizText>
    </WizMeterGraph>
  `,
});
Slot.args = {
  percentage: 56,
};
Slot.parameters = {
  docs: {
    source: {
      code: CODE_TEMPLATE({
        percentage: 56,
        slot: "<WizText>ここはSlotです</WizText>",
      }),
    },
  },
};
