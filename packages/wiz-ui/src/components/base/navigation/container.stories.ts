import { StoryFn } from "@storybook/vue";
import StoryRouter from "storybook-vue-router";
import { provide, ref } from "vue";

import {
  WizIDashboard,
  WizIAssignment,
  WizIBusinessCenter,
  WizIHelp,
} from "@/components/icons";
import {
  globalInject,
  globalKey,
  useGlobalProvider,
} from "@/hooks/use-global-provider";

import { ButtonGroupItem } from "../popup-button-group/types";

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
    sticky: {
      control: { type: "boolean" },
    },
    click: {
      action: "click",
    },
  },
  decorators: [
    StoryRouter([
      { path: "/", name: "home", component: Home },
      { path: "/page1", name: "page1", component: Page1 },
      { path: "/page2", name: "page2", component: Page2 },
      { path: "/page3", name: "page3", component: Page3 },
    ]),
    (story: StoryFn) => ({
      components: { story },
      setup() {
        provide(globalKey, useGlobalProvider());
      },
      template: `<story />`,
    }),
  ],
  parameters: {
    layout: "fullscreen",
  },
};

export const Overview: StoryFn = (_, { argTypes }) => ({
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

export const Close: StoryFn = (_, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { WizNavContainer, WizNavItem },
  setup() {
    const { setIsMenuOpen } = globalInject(globalKey);
    setIsMenuOpen(false);
    return {
      WizIDashboard,
      WizIAssignment,
      WizIBusinessCenter,
      WizIHelp,
    };
  },
  template: `
  <div style="display: flex; height: 100vh;">
    <WizNavContainer :close="true">
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

export const Playground: StoryFn = (_, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { WizNavContainer, WizNavItem },
  setup() {
    const { isMenuOpen, setIsMenuOpen } = globalInject(globalKey);
    const toggle = () => setIsMenuOpen(!isMenuOpen.value);
    return {
      WizIDashboard,
      WizIAssignment,
      WizIBusinessCenter,
      WizIHelp,
      isMenuOpen,
      toggle,
    };
  },
  template: `
  <div style="display: flex; height: 100vh;">
    <WizNavContainer :close="true">
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
    <div>
      デバッグ用
      <button @click="toggle">{{ isMenuOpen ? 'Close' : 'Open' }}</button>
    </div>
    <router-view />
  </div>
  `,
});

export const Fixed: StoryFn = (_, { argTypes }) => ({
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
    <WizNavContainer sticky>
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

const createButton = (
  n: number,
  click: (n: number) => void
): ButtonGroupItem => ({
  kind: "button",
  option: {
    label: `label ${n}`,
    value: n,
    onClick: () => click(n),
  },
});

export const Popup: StoryFn = (_, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { WizNavContainer, WizNavItem },
  setup() {
    const lockingPopup = ref(false);
    const setLock = (isLock: boolean) => {
      lockingPopup.value = isLock;
    };
    const isOpens = Array.from({ length: 4 }).map(() => ref(false));
    const toggles = isOpens.map((isOpen) => (value: boolean) => {
      isOpen.value = value;
    });
    return {
      WizIDashboard,
      WizIAssignment,
      WizIBusinessCenter,
      WizIHelp,
      lockingPopup,
      setLock,
      createButton,
      isOpens,
      toggles,
    };
  },
  template: `
  <div style="display: flex; height: 100vh;">
    <WizNavContainer>
      <WizNavItem :lockingPopup="lockingPopup" @setLock="setLock" :buttons="[createButton(0, click)]":icon="WizIDashboard" label="Home" to="/" :active="$route.path === '/'" :isOpen="isOpens[0]" @toggle="toggles[0]"/>
      <WizNavItem :lockingPopup="lockingPopup" @setLock="setLock" :buttons="[createButton(1, click), createButton(2, click)]" :icon="WizIAssignment" label="Page1" to="/page1" :active="$route.path === '/page1'"  :isOpen="isOpens[1]" @toggle="toggles[1]"/>
      <WizNavItem :lockingPopup="lockingPopup" @setLock="setLock" :buttons="[createButton(3, click), createButton(4, click)]" :icon="WizIBusinessCenter" label="Page2" to="/page2" :active="$route.path === '/page2'" :isOpen="isOpens[2]" @toggle="toggles[2]"/>
      <WizNavItem :lockingPopup="lockingPopup" @setLock="setLock" :buttons="[createButton(5, click), createButton(6, click)]" :icon="WizIHelp" label="Page3" to="/page3" :active="$route.path === '/page3'" :isOpen="isOpens[3]" @toggle="toggles[3]"/>
    </WizNavContainer>
    <router-view />
  </div>
  `,
});

export const PopupSticky: StoryFn = (_, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { WizNavContainer, WizNavItem },
  setup() {
    const lockingPopup = ref(false);
    const setLock = (isLock: boolean) => {
      lockingPopup.value = isLock;
    };
    const isOpens = Array.from({ length: 4 }).map(() => ref(false));
    const toggles = isOpens.map((isOpen) => (value: boolean) => {
      isOpen.value = value;
    });
    return {
      WizIDashboard,
      WizIAssignment,
      WizIBusinessCenter,
      WizIHelp,
      lockingPopup,
      setLock,
      createButton,
      isOpens,
      toggles,
    };
  },
  template: `
  <div style="display: flex; height: 100vh;">
    <WizNavContainer sticky>
      <WizNavItem :lockingPopup="lockingPopup" @setLock="setLock" :buttons="[createButton(0, click)]":icon="WizIDashboard" label="Home" to="/" :active="$route.path === '/'" :isOpen="isOpens[0]" @toggle="toggles[0]"/>
      <WizNavItem :lockingPopup="lockingPopup" @setLock="setLock" :buttons="[createButton(1, click), createButton(2, click)]" :icon="WizIAssignment" label="Page1" to="/page1" :active="$route.path === '/page1'" :isOpen="isOpens[1]" @toggle="toggles[1]"/>
      <WizNavItem :lockingPopup="lockingPopup" @setLock="setLock" :buttons="[createButton(3, click), createButton(4, click)]" :icon="WizIBusinessCenter" label="Page2" to="/page2" :active="$route.path === '/page2'" :isOpen="isOpens[2]" @toggle="toggles[2]"/>
      <WizNavItem :lockingPopup="lockingPopup" @setLock="setLock" :buttons="[createButton(5, click), createButton(6, click)]" :icon="WizIHelp" label="Page3" to="/page3" :active="$route.path === '/page3'" :isOpen="isOpens[3]" @toggle="toggles[3]"/>
    </WizNavContainer>
    <router-view />
  </div>
  `,
});

export const PopupStickyOpen: StoryFn = (_, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { WizNavContainer, WizNavItem },
  setup() {
    const lockingPopup = ref(false);
    const setLock = (isLock: boolean) => {
      lockingPopup.value = isLock;
    };
    const isOpens = Array.from({ length: 4 }).map(() => ref(false));
    isOpens[0].value = true;
    const toggles = isOpens.map((isOpen) => (value: boolean) => {
      isOpen.value = value;
    });
    return {
      WizIDashboard,
      WizIAssignment,
      WizIBusinessCenter,
      WizIHelp,
      lockingPopup,
      setLock,
      createButton,
      isOpens,
      toggles,
    };
  },
  template: `
  <div style="display: flex; height: 100vh;">
    <WizNavContainer sticky>
      <WizNavItem :lockingPopup="lockingPopup" @setLock="setLock" :buttons="[createButton(0, click)]":icon="WizIDashboard" label="Home" to="/" :active="$route.path === '/'" :isOpen="isOpens[0]" @toggle="toggles[0]"/>
      <WizNavItem :lockingPopup="lockingPopup" @setLock="setLock" :buttons="[createButton(1, click), createButton(2, click)]" :icon="WizIAssignment" label="Page1" to="/page1" :active="$route.path === '/page1'" :isOpen="isOpens[1]" @toggle="toggles[1]"/>
      <WizNavItem :lockingPopup="lockingPopup" @setLock="setLock" :buttons="[createButton(3, click), createButton(4, click)]" :icon="WizIBusinessCenter" label="Page2" to="/page2" :active="$route.path === '/page2'" :isOpen="isOpens[2]" @toggle="toggles[2]"/>
      <WizNavItem :lockingPopup="lockingPopup" @setLock="setLock" :buttons="[createButton(5, click), createButton(6, click)]" :icon="WizIHelp" label="Page3" to="/page3" :active="$route.path === '/page3'" :isOpen="isOpens[3]" @toggle="toggles[3]"/>
    </WizNavContainer>
    <router-view />
  </div>
  `,
});

export const Disabled: StoryFn = (_, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { WizNavContainer, WizNavItem },
  setup() {
    const lockingPopup = ref(false);
    const setLock = (isLock: boolean) => {
      lockingPopup.value = isLock;
    };
    return {
      WizIDashboard,
      WizIAssignment,
      WizIBusinessCenter,
      WizIHelp,
      lockingPopup,
      setLock,
      createButton,
    };
  },
  template: `
  <div style="display: flex; height: 100vh;">
    <WizNavContainer sticky>
      <WizNavItem :disabled="true" :lockingPopup="lockingPopup" @setLock="setLock" :buttons="[createButton(0, click)]":icon="WizIDashboard" label="Home" to="/" :active="$route.path === '/'" />
      <WizNavItem :disabled="true" :lockingPopup="lockingPopup" @setLock="setLock" :buttons="[createButton(1, click), createButton(2, click)]" :icon="WizIAssignment" label="Page1" to="/page1" :active="$route.path === '/page1'" />
      <WizNavItem :disabled="true" :lockingPopup="lockingPopup" @setLock="setLock" :buttons="[createButton(3, click), createButton(4, click)]" :icon="WizIBusinessCenter" label="Page2" to="/page2" :active="$route.path === '/page2'" />
      <WizNavItem :disabled="true" :lockingPopup="lockingPopup" @setLock="setLock" :buttons="[createButton(5, click), createButton(6, click)]" :icon="WizIHelp" label="Page3" to="/page3" :active="$route.path === '/page3'" />
    </WizNavContainer>
    <router-view />
  </div>
  `,
});

export const PopupAndTooltip: StoryFn = (_, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { WizNavContainer, WizNavItem },
  setup() {
    const lockingPopup = ref(false);
    const setLock = (isLock: boolean) => {
      lockingPopup.value = isLock;
    };
    const isOpens = Array.from({ length: 4 }).map(() => ref(false));
    const toggles = isOpens.map((isOpen) => (value: boolean) => {
      isOpen.value = value;
    });
    return {
      WizIDashboard,
      WizIAssignment,
      WizIBusinessCenter,
      WizIHelp,
      lockingPopup,
      setLock,
      createButton,
      isOpens,
      toggles,
    };
  },
  template: `
  <div style="display: flex; height: 100vh;">
    <WizNavContainer sticky>
      <WizNavItem tooltipText="これはヒント1です。" :lockingPopup="lockingPopup" @setLock="setLock" :buttons="[createButton(0, click)]":icon="WizIDashboard" label="Home" to="/" :active="$route.path === '/'" :isOpen="isOpens[0]" @toggle="toggles[0]"/>
      <WizNavItem tooltipText="これはヒント2です。" :lockingPopup="lockingPopup" @setLock="setLock" :buttons="[createButton(1, click), createButton(2, click)]" :icon="WizIAssignment" label="Page1" to="/page1" :active="$route.path === '/page1'" :isOpen="isOpens[1]" @toggle="toggles[1]"/>
      <WizNavItem tooltipText="これはヒント3です。" :lockingPopup="lockingPopup" @setLock="setLock" :buttons="[createButton(3, click), createButton(4, click)]" :icon="WizIBusinessCenter" label="Page2" to="/page2" :active="$route.path === '/page2'" :isOpen="isOpens[2]" @toggle="toggles[2]"/>
      <WizNavItem tooltipText="これはヒント4です。"  :lockingPopup="lockingPopup" @setLock="setLock" :buttons="[createButton(5, click), createButton(6, click)]" :icon="WizIHelp" label="Page3" to="/page3" :active="$route.path === '/page3'" :isOpen="isOpens[3]" @toggle="toggles[3]"/>
    </WizNavContainer>
    <router-view />
  </div>
  `,
});
