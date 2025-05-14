/* eslint-disable react-hooks/rules-of-hooks */
import { Meta, StoryFn } from "@storybook/vue3";
import { THEME } from "@wizleap-inc/wiz-ui-constants";
import { provide } from "vue";

import { WizDrawer, WizHeader, WizIconButton, WizNavItem } from "@/components";
import {
  WizIAssignment,
  WizIBusinessCenter,
  WizICancel,
  WizIDashboard,
  WizIHelp,
  WizIMenu,
} from "@/components/icons";
import { globalKey, useGlobalProvider } from "@/hooks/use-global-provider";

export default {
  title: "Base/Drawer",
  component: WizDrawer,
  argTypes: {},
  decorators: [
    () => ({
      setup() {
        provide(globalKey, useGlobalProvider());
      },
      template: `<story />`,
    }),
  ],
  parameters: {
    layout: "fullscreen",
    screenshot: {
      delay: 300,
    },
  },
} as Meta<typeof WizDrawer>;

const Template: StoryFn<typeof WizDrawer> = (args) => ({
  components: {
    WizDrawer,
    WizNavItem,
    WizHeader,
  },
  setup: () => {
    return {
      args,
      WizIDashboard,
      WizIAssignment,
      WizIBusinessCenter,
      WizIHelp,
      WizIconButton,
      WizIMenu,
      WizICancel,
    };
  },
  template: ` 
    <WizDrawer v-bind="args">      
      <WizNavItem :icon="WizIDashboard" label="Home" to="/" :active="true" />
      <WizNavItem :icon="WizIAssignment" label="Page1" to="/page1" :active="false" />
      <WizNavItem :icon="WizIBusinessCenter" label="Page2" to="/page2" :active="false" />
      <WizNavItem :icon="WizIHelp" label="Page3" to="/page3" :active="false" />
    </WizDrawer>  
  `,
});

export const Default = Template.bind({});
Default.args = {
  isOpen: true,
};

export const WithHeader: StoryFn<typeof WizDrawer> = (args) => ({
  components: {
    WizDrawer,
    WizNavItem,
    WizHeader,
  },
  setup: () => {
    return {
      args,
      WizIDashboard,
      WizIAssignment,
      WizIBusinessCenter,
      WizIHelp,
      WizIconButton,
      WizIMenu,
      WizICancel,
    };
  },
  template: `
    <div style="height: 100vh"> 
      <div style="z-index:3000; position: fixed; width: 100%">
        <WizHeader />
      </div>
      <WizDrawer v-bind="args">      
        <WizNavItem :icon="WizIDashboard" label="Home" to="/" :active="true" />
        <WizNavItem :icon="WizIAssignment" label="Page1" to="/page1" :active="false" />
        <WizNavItem :icon="WizIBusinessCenter" label="Page2" to="/page2" :active="false" />
        <WizNavItem :icon="WizIHelp" label="Page3" to="/page3" :active="false" />
      </WizDrawer> 
    </div>
  `,
});

WithHeader.args = {
  isOpen: true,
  offsetTop: THEME.share.HEADER_HEIGHT,
};

export const ShadowAndWidth = Template.bind({});
ShadowAndWidth.args = {
  isOpen: true,
  width: "200px",
  shadow: true,
};

export const Right: StoryFn<typeof WizDrawer> = (args) => ({
  components: {
    WizDrawer,
    WizNavItem,
    WizHeader,
  },
  setup: () => {
    return {
      args,
      WizIDashboard,
      WizIAssignment,
      WizIBusinessCenter,
      WizIHelp,
      WizIconButton,
      WizIMenu,
      WizICancel,
    };
  },
  template: `
    <div style="height: 100vh"> 
      <div style="z-index:3000; position: fixed; width: 100%">
        <WizHeader sticky />
      </div>
      <button :style="{        
        inset: 0,
        margin: 'auto',
        position: 'fixed',
        width: '80%',
        height: '100px',
      }">
        button
      </button>
      <WizDrawer v-bind="args">      
        <WizNavItem :icon="WizIDashboard" label="Home" to="/" :active="true" />
        <WizNavItem :icon="WizIAssignment" label="Page1" to="/page1" :active="false" />
        <WizNavItem :icon="WizIBusinessCenter" label="Page2" to="/page2" :active="false" />
        <WizNavItem :icon="WizIHelp" label="Page3" to="/page3" :active="false" />
      </WizDrawer> 
    </div>
  `,
});

Right.args = {
  isOpen: true,
  shadow: true,
  offsetTop: THEME.share.HEADER_HEIGHT,
  place: "right",
  width: "300px",
};
