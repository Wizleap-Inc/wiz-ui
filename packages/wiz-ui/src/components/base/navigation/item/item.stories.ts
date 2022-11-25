import { StoryFn } from "@storybook/vue";
import StoryRouter from "storybook-vue-router";

import { WizIDashboard } from "@/components/icons";

import { WizNavItem } from ".";

const Home = {
  template: "<div>Home</div>",
};
const About = {
  template: "<div>About</div>",
};

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
    StoryRouter([
      { path: "/", name: "home", component: Home },
      { path: "/about", name: "about", component: About },
    ]),
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
    <WizNavItem v-bind="$props" :active="$route.path === '/about'" />
    <router-view />
  </div>
  `,
});

export const Default = Template.bind({});
Default.args = {
  icon: WizIDashboard,
  label: "About",
  to: "/about",
};
