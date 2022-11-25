import { StoryFn } from "@storybook/vue";
import StoryRouter from "storybook-vue-router";

import {
  WizIDashboard,
  WizIAssignment,
  WizIBusinessCenter,
  WizIHelp,
} from "@/components/icons";

import { WizNavItem, WizNavContainer } from ".";

const Home = {
  template: "<div>Home</div>",
};
const Page1 = {
  template: "<div>Page1</div>",
};
const Page2 = {
  template: "<div>Page2</div>",
};
const Page3 = {
  template: "<div>Page3</div>",
};

export default {
  title: "Base/Navigation/Container",
  component: WizNavContainer,
  argTypes: {
    width: {
      control: { type: "text" },
    },
  },
  decorators: [
    StoryRouter([
      { path: "/", name: "home", component: Home },
      { path: "/page1", name: "page1", component: Page1 },
      { path: "/page2", name: "page2", component: Page2 },
      { path: "/page3", name: "page3", component: Page3 },
    ]),
  ],
  parameters: {
    layout: "fullscreen",
  },
};

export const Overview: StoryFn = (_, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { WizNavContainer, WizNavItem },
  setup() {
    return { WizIDashboard };
  },
  template: `
  <div style="display: flex; height: 100vh;">
    <WizNavContainer>
      <WizNavItem :icon="WizIDashboard" label="Home" to="/" :active="$route.path === '/'" />
      <WizNavItem :icon="WizIDashboard" label="Page1" to="/page1" :active="$route.path === '/page1'" />
      <WizNavItem :icon="WizIDashboard" label="Page2" to="/page2" :active="$route.path === '/page2'" />
      <WizNavItem :icon="WizIDashboard" label="Page3" to="/page3" :active="$route.path === '/page3'" />
    </WizNavContainer>
    <router-view />
  </div>
  `,
});

export const WithFooter: StoryFn = (_, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { WizNavContainer, WizNavItem },
  setup() {
    return {
      WizIDashboard,
      WizIAssignment,
      WizIBusinessCenter,
      WizIHelp,
    };
  },
  template: `
  <div style="display: flex; height: 100vh;">
    <WizNavContainer>
      <WizNavItem :icon="WizIDashboard" label="Home" to="/" :active="$route.path === '/'" />
      <WizNavItem :icon="WizIAssignment" label="Page1" to="/page1" :active="$route.path === '/page1'" />
      <WizNavItem :icon="WizIBusinessCenter" label="Page2" to="/page2" :active="$route.path === '/page2'" />
      <WizNavItem :icon="WizIHelp" label="Page3" to="/page3" :active="$route.path === '/page3'" />
      <template #footer>
        <h4>Footer</h4>
        <h5>Footer</h5>
        <h6>Footer</h6>
      </template>
    </WizNavContainer>
    <router-view />
  </div>
  `,
});
