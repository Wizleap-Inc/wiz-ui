import { Meta, StoryFn } from "@storybook/vue";

import {
  WizIAssignment,
  WizIBusinessCenter,
  WizIDashboard,
  WizIHelp,
} from "@/components/icons";

import { WizNavContainerMobile, WizNavItem } from ".";

export default {
  title: "Base/Navigation/ContainerMobile",
  component: WizNavContainerMobile,
  argTypes: {},
  parameters: {
    layout: "fullscreen",
  },
} as Meta<typeof WizNavContainerMobile>;

const Template: StoryFn<typeof WizNavContainerMobile> = (_, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: {
    WizNavContainerMobile,
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
      <WizNavContainerMobile v-bind="$props">      
        <WizNavItem :icon="WizIDashboard" label="Home" to="/" :active="true" />
        <WizNavItem :icon="WizIAssignment" label="Page1" to="/page1" :active="false" />
        <WizNavItem :icon="WizIBusinessCenter" label="Page2" to="/page2" :active="false" />
        <WizNavItem :icon="WizIHelp" label="Page3" to="/page3" :active="false" />
        <template #footer>
          <h4>Footer</h4>
          <h5>Footer</h5>
          <h6>Footer</h6>
        </template>
      </WizNavContainerMobile>
    </div>
  `,
});

export const Default = Template.bind({});
Default.args = {
  isOpen: true,
};
