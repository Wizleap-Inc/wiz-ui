import { StoryFn } from "@storybook/vue";

import { WizText, WizVStack, WizHStack, WizBox } from "@/components";

import { WizNotificationCard } from ".";

export default {
  title: "Custom/Notification/Card",
  component: WizNotificationCard,
  argTypes: {
    title: {
      control: { type: "text" },
    },
    timestamp: {
      control: { type: "date" },
    },
    variant: {
      control: { type: "select" },
      options: ["primary", "secondary"],
    },
  },
};

const Template: StoryFn = (_, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { WizNotificationCard },
  template: `
  <div style="width: 300px;">
    <WizNotificationCard v-bind="$props">{{ slot }}</WizNotificationCard>
  </div>
  `,
});

export const Default = Template.bind({});
Default.args = {
  title:
    "ほげほげほげほげほげほげほげほげほげほげほげほげほげほげほげほげほげほげほげほげほげほげほげほげほげ",
  timestamp: new Date("2021-01-01 00:00:00"),
};

const PrimaryTemplate: StoryFn = (_, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { WizNotificationCard, WizVStack, WizHStack, WizText, WizBox },
  template: `
  <div style="width: 300px;">
    <WizNotificationCard v-bind="$props">
      <WizHStack gap="xl">
        <WizVStack gap="xs">
          <WizText bold fontSize="xs" color="gray.700">情報1</WizText>
          <WizText bold fontSize="xs" color="gray.700">データ1</WizText>
        </WizVStack>
        <WizVStack gap="xs">
          <WizText bold fontSize="xs" color="gray.700">情報2</WizText>
          <WizText bold fontSize="xs" color="gray.700">データ2</WizText>
        </WizVStack>
      </WizHStack>
    </WizNotificationCard>
  </div>
  `,
});

export const Primary = PrimaryTemplate.bind({});
Primary.args = {
  title:
    "ほげほげほげほげほげほげほげほげほげほげほげほげほげほげほげほげほげほげほげほげほげほげほげほげほげ",
  timestamp: new Date("2021-01-01 00:00:00"),
  variant: "primary",
};
