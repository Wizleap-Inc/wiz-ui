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
Default.parameters = {
  docs: {
    source: {
      code: `
<template>
  <div>
    <WizNavItem :icon="WizIDashboard" label="Home" to="/home" :active="$route.path === '/home'" />
    <router-view />
  </div>
</template>
      `,
    },
  },
};
export const Active = Template.bind({});
Active.args = {
  icon: WizIDashboard,
  label: "Home",
  to: "/",
  active: true,
};
Active.parameters = {
  docs: {
    description: {
      story: "`active` を指定すると NavItem がハイライトされます。",
    },
    source: {
      code: `
<template>
  <div>
    <WizNavItem :icon="WizIDashboard" label="Home" to="https://wizleap.co.jp" active />
    <router-view />
  </div>
</template>
      `,
    },
  },
};

export const External = Template.bind({});
External.args = {
  icon: WizIDashboard,
  label: "Home",
  to: "https://wizleap.co.jp",
  active: false,
};
External.parameters = {
  docs: {
    description: {
      story: "外部リンクへ飛ばすこともできます。",
    },
    source: {
      code: `
<template>
  <div>
    <WizNavItem :icon="WizIDashboard" label="Home" to="https://wizleap.co.jp" :active="$route.path === '/home'" />
    <router-view />
  </div>
</template>
      `,
    },
  },
};
