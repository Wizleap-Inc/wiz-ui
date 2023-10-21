import { StoryFn, Meta } from "@storybook/vue3";

import { WizVStack, WizHStack } from "@/components";

import { WizRadioNew } from ".";

export default {
  title: "Base/Input/RadioNew",
  component: WizRadioNew,
  argTypes: {
    checked: {
      control: { type: "boolean" },
    },
    value: {
      control: { type: "object" },
    },
    id: {
      control: { type: "string" },
    },
    name: {
      control: { type: "string" },
    },
    disabled: {
      control: { type: "boolean" },
    },
    strikeThrough: {
      control: { type: "boolean" },
    },
    bordered: {
      control: { type: "boolean" },
    },
    error: {
      control: { type: "boolean" },
    },
  },
} as Meta<typeof WizRadioNew>;

type Story = StoryFn<typeof WizRadioNew>;

export const Default: Story = () => ({
  components: { WizRadioNew },
  template: `
    <WizRadioNew>Label</WizRadioNew>
  `,
});

export const Variations: Story = () => ({
  components: { WizRadioNew, WizVStack, WizHStack },
  setup() {
    return {
      variations: [
        [
          { checked: false },
          { checked: false, disabled: true },
          { checked: false, strikeThrough: true },
        ],
        [
          { checked: true },
          { checked: true, disabled: true },
          { checked: true, strikeThrough: true },
        ],
        [
          { checked: false, bordered: true },
          { checked: false, bordered: true, disabled: true },
          { checked: false, bordered: true, error: true },
          { checked: false, bordered: true, strikeThrough: true },
        ],
        [
          { checked: true, bordered: true },
          { checked: true, bordered: true, disabled: true },
          { checked: true, bordered: true, error: true },
          { checked: true, bordered: true, strikeThrough: true },
        ],
      ],
    };
  },
  template: `
    <WizVStack gap="md">
      <WizHStack v-for="(row, i) in variations" gap="xl">
        <template v-for="(props, j) in row">
          <WizRadioNew v-bind="props" :name="i + ',' + j">Label</WizRadioNew>
        </template>
      </WizHStack>
    </WizVStack>
  `,
});
