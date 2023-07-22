import { Meta, StoryFn } from "@storybook/vue3";

import { WizDrawer, WizHeader, WizIconButton, WizNavItem } from "@/components";
import {
  WizIAssignment,
  WizIBusinessCenter,
  WizICancel,
  WizIDashboard,
  WizIHelp,
  WizIMenu,
} from "@/components/icons";

export default {
  title: "Base/Drawer",
  component: WizDrawer,
  argTypes: {},
  parameters: {
    layout: "fullscreen",
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
    <div> 
      <WizDrawer v-bind="args">      
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
        <WizIconButton 
          :icon="WizIMenu "
          size="lg"
          variant="transparent" 
        /> 
    </div>
  `,
});

export const Default = Template.bind({});
Default.args = {
  isOpen: true,
};
