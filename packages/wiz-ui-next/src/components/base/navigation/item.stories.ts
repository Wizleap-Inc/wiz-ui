import { Meta, StoryFn } from "@storybook/vue3";
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

    isDirectioonFixed: {
      control: { type: "boolean" },
    },
  },
  decorators: [
    () => ({
      setup() {
        provide(globalKey, useGlobalProvider());
      },
      template: `<story />`,
    }),
  ],
} as Meta<typeof WizNavItem>;

const Template: StoryFn<typeof WizNavItem> = (args) => ({
  components: { WizNavItem },
  setup: () => ({ args }),
  template: `
  <div>
    <WizNavItem v-bind="args" />
  </div>
  `,
});

export const Default = Template.bind({});
Default.args = {
  icon: WizIDashboard,
  label: "Home",
  to: "/",
  active: false,
};

export const Active = Template.bind({});
Active.args = {
  icon: WizIDashboard,
  label: "Home",
  to: "/",
  active: true,
};

export const External = Template.bind({});
External.args = {
  icon: WizIDashboard,
  label: "Home",
  to: "https://wizleap.co.jp",
  active: false,
};

export const Disabled = Template.bind({});
Disabled.args = {
  icon: WizIDashboard,
  label: "Home",
  to: "/home",
  disabled: true,
};

export const IsDirectionFixed = Template.bind({});
IsDirectionFixed.args = {
  icon: WizIDashboard,
  label: "Home",
  to: "/home",
  isDirectionFixed: true,
};

const TooltipTemplate: StoryFn<typeof WizNavItem> = (args) => ({
  components: { WizNavItem },
  setup: () => ({ args }),
  template: `
  <div style="margin-top: 48px">
    <WizNavItem v-bind="args" />
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
