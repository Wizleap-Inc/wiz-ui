import { Meta, StoryFn } from "@storybook/vue";

import { WizDrawer, WizNavItem } from "@/components";
import {
  WizIAssignment,
  WizIBusinessCenter,
  WizIDashboard,
  WizIHelp,
} from "@/components/icons";

export default {
  title: "Base/Drawer",
  component: WizDrawer,
  argTypes: {},
  parameters: {
    layout: "fullscreen",
  },
} as Meta<typeof WizDrawer>;

const Template: StoryFn<typeof WizDrawer> = (_, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: {
    WizDrawer,
    WizNavItem,
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
   <div>
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

export const Default = Template.bind({});
Default.args = {
  isOpen: true,
};
