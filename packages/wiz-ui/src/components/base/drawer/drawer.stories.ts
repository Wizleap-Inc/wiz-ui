import { Meta, StoryFn } from "@storybook/vue";
import { THEME } from "@wizleap-inc/wiz-ui-constants";
import { provide } from "vue";

import { WizDrawer, WizHeader, WizNavItem } from "@/components";
import {
  WizIAssignment,
  WizIBusinessCenter,
  WizIDashboard,
  WizIHelp,
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
  },
} as Meta<typeof WizDrawer>;

const Template: StoryFn<typeof WizDrawer> = (_, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: {
    WizDrawer,
    WizNavItem,
    WizHeader,
  },
  setup: () => {
    return {
      WizIDashboard,
      WizIAssignment,
      WizIBusinessCenter,
      WizIHelp,
    };
  },
  template: `  
    <WizDrawer v-bind="$props">      
      <WizNavItem :icon="WizIDashboard" label="Home" to="/" :active="true" />
      <WizNavItem :icon="WizIAssignment" label="Page1" to="/page1" :active="false" />
      <WizNavItem :icon="WizIBusinessCenter" label="Page2" to="/page2" :active="false" />
      <WizNavItem :icon="WizIHelp" label="Page3" to="/page3" :active="false" />
      <template #footer>
        <h4>Footer</h4>
        <h5>Footer</h5>
        <h6>Footer</h6>
      </template>
    </WizDrawer> 
  `,
});

export const Default = Template.bind({});
Default.args = {
  isOpen: true,
};

export const WithHeader: StoryFn<typeof WizDrawer> = (_, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: {
    WizDrawer,
    WizNavItem,
    WizHeader,
  },
  setup: () => {
    return {
      WizIDashboard,
      WizIAssignment,
      WizIBusinessCenter,
      WizIHelp,
    };
  },
  template: ` 
   <div style="height: 100vh"> 
      <WizHeader />
      <WizDrawer v-bind="$props">      
        <WizNavItem :icon="WizIDashboard" label="Home" to="/" :active="true" />
        <WizNavItem :icon="WizIAssignment" label="Page1" to="/page1" :active="false" />
        <WizNavItem :icon="WizIBusinessCenter" label="Page2" to="/page2" :active="false" />
        <WizNavItem :icon="WizIHelp" label="Page3" to="/page3" :active="false" />
        <template #footer>
          <h4>Footer</h4>
          <h5>Footer</h5>
          <h6>Footer</h6>
        </template>
      </WizDrawer>
    </div>
  `,
});

WithHeader.args = {
  isOpen: true,
  offsetHeight: THEME.share.HEADER_HEIGHT,
};
