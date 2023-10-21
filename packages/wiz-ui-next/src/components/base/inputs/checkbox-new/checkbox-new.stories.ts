import { StoryFn, Meta } from "@storybook/vue3";

import { WizVStack, WizHStack } from "@/components";

import { WizCheckBoxNew } from ".";

export default {
  title: "Base/Input/CheckBoxNew",
  component: WizCheckBoxNew,
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
} as Meta<typeof WizCheckBoxNew>;

type Story = StoryFn<typeof WizCheckBoxNew>;

export const Default: Story = () => ({
  components: { WizCheckBoxNew },
  template: `
    <WizCheckBoxNew>Label</WizCheckBoxNew>
  `,
});

export const Variations: Story = () => ({
  components: { WizCheckBoxNew, WizVStack, WizHStack },
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
      <WizHStack v-for="row in variations" gap="xl">
        <template v-for="props in row">
          <WizCheckBoxNew v-bind="props">Label</WizCheckBoxNew>
        </template>
      </WizHStack>
    </WizVStack>
  `,
});
