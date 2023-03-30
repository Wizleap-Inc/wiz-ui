import { StoryFn } from "@storybook/vue";
import { provide } from "vue";

import { WizIDashboard } from "@/components/icons";
import { globalKey, useGlobalProvider } from "@/hooks/use-global-provider";

import { WizNavItem } from ".";

export default {
  title: "Base/Navigation/Item",
  component: WizNavItem,
  argTypes: {
    icon: {
      control: { type: "object" },
    },
    label: {
      control: { type: "text" },
    },
    active: {
      control: { type: "boolean" },
    },
    to: {
      control: { type: "text" },
    },
  },
  decorators: [
    (story: StoryFn) => ({
      components: { story },
      setup() {
        provide(globalKey, useGlobalProvider());
      },
      template: `<story />`,
    }),
  ],
};

const Template: StoryFn = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { WizNavItem },
  setup() {
    return { args };
  },
  template: `
  <div>
    <WizNavItem v-bind="$props" />
  </div>
  `,
});

export const Default = Template.bind({});
Default.args = {
  icon: WizIDashboard,
  label: "Home",
  to: "/home",
};

export const External = Template.bind({});
External.args = {
  icon: WizIDashboard,
  label: "Home",
  to: "https://wizleap.co.jp",
};

export const Disabled = Template.bind({});
Disabled.args = {
  icon: WizIDashboard,
  label: "Home",
  to: "/home",
  disabled: true,
};

const TooltipTemplate: StoryFn = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { WizNavItem },
  setup() {
    return { args };
  },
  template: `
  <div style="margin-top: 48px">
    <WizNavItem v-bind="$props"/>
  </div>
  `,
});

export const WithToolTip = TooltipTemplate.bind({});
WithToolTip.args = {
  icon: WizIDashboard,
  label: "Home",
  to: "/home",
  tooltipText: "これはヒントです。",
};
