import { Meta, StoryFn } from "@storybook/vue3";
import { ref } from "vue";

import {
  WizIDashboard,
  WizIAssignment,
  WizIBusinessCenter,
  WizIHelp,
} from "@/components/icons";

import { ButtonGroupItem } from "../popup-button-group/types";

import { WizNavItem, WizNavContainer } from ".";

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
    isOpen: {
      control: { type: "boolean" },
    },
    click: {
      action: "click",
    },
  },
  decorators: [
    () => ({
      template: `<story />`,
    }),
  ],
  parameters: {
    layout: "fullscreen",
  },
} as Meta<typeof WizNavContainer>;

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
      <WizNavItem :icon="WizIDashboard" label="Home" to="/" :active="false" />
      <WizNavItem :icon="WizIAssignment" label="Page1" to="/page1" :active="false" />
      <WizNavItem :icon="WizIBusinessCenter" label="Page2" to="/page2" :active="false" />
      <WizNavItem :icon="WizIHelp" label="Page3" to="/page3" :active="false" />
    </WizNavContainer>
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
      <WizNavItem :icon="WizIDashboard" label="Home" to="/" :active="false" />
      <WizNavItem :icon="WizIAssignment" label="Page1" to="/page1" :active="false" />
      <WizNavItem :icon="WizIBusinessCenter" label="Page2" to="/page2" :active="false" />
      <WizNavItem :icon="WizIHelp" label="Page3" to="/page3" :active="false" />
      <template #footer>
        <h4>Footer</h4>
        <h5>Footer</h5>
        <h6>Footer</h6>
      </template>
    </WizNavContainer>
  </div>
  `,
});

export const Close: StoryFn = (_, { argTypes }) => ({
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
    <WizNavContainer :isOpen="false">
      <WizNavItem :icon="WizIDashboard" label="Home" to="/" :active="false" />
      <WizNavItem :icon="WizIAssignment" label="Page1" to="/page1" :active="false" />
      <WizNavItem :icon="WizIBusinessCenter" label="Page2" to="/page2" :active="false" />
      <WizNavItem :icon="WizIHelp" label="Page3" to="/page3" :active="false" />
      <template #footer>
        <h4>Footer</h4>
        <h5>Footer</h5>
        <h6>Footer</h6>
      </template>
    </WizNavContainer>
  </div>
  `,
});

export const Playground: StoryFn = (_, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { WizNavContainer, WizNavItem },
  setup() {
    const isOpen = ref(true);
    const toggle = () => (isOpen.value = !isOpen.value);
    return {
      WizIDashboard,
      WizIAssignment,
      WizIBusinessCenter,
      WizIHelp,
      isOpen,
      toggle,
    };
  },
  template: `
  <div style="display: flex; height: 100vh;">
    <WizNavContainer :isOpen="isOpen">
      <WizNavItem :icon="WizIDashboard" label="Home" to="/" :active="false" />
      <WizNavItem :icon="WizIAssignment" label="Page1" to="/page1" :active="false" />
      <WizNavItem :icon="WizIBusinessCenter" label="Page2" to="/page2" :active="false" />
      <WizNavItem :icon="WizIHelp" label="Page3" to="/page3" :active="false" />
      <template #footer>
        <h4>Footer</h4>
        <h5>Footer</h5>
        <h6>Footer</h6>
      </template>
    </WizNavContainer>
    <div>
      デバッグ用
      <button @click="toggle">{{ isOpen ? 'Close' : 'Open' }}</button>
    </div>
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
      <WizNavItem :icon="WizIDashboard" label="Home" to="/" :active="false" />
      <WizNavItem :icon="WizIAssignment" label="Page1" to="/page1" :active="false" />
      <WizNavItem :icon="WizIBusinessCenter" label="Page2" to="/page2" :active="false" />
      <WizNavItem :icon="WizIHelp" label="Page3" to="/page3" :active="false" />
      <template #footer>
        <h4>Footer</h4>
        <h5>Footer</h5>
        <h6>Footer</h6>
      </template>
    </WizNavContainer>
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

export const Popup: StoryFn<typeof WizNavContainer> = (args) => ({
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
      args,
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
      <WizNavItem :lockingPopup="lockingPopup" @setLock="setLock" :buttons="[createButton(0, args.click)]" :icon="WizIDashboard" label="Home" to="/" :active="false" :isOpen="isOpens[0].value" @toggle="toggles[0]"/>
      <WizNavItem :lockingPopup="lockingPopup" @setLock="setLock" :buttons="[createButton(1, args.click), createButton(2, args.click)]" :icon="WizIAssignment" label="Page1" to="/page1" :active="false" :isOpen="isOpens[1].value" @toggle="toggles[1]"/>
      <WizNavItem :lockingPopup="lockingPopup" @setLock="setLock" :buttons="[createButton(3, args.click), createButton(4, args.click)]" :icon="WizIBusinessCenter" label="Page2" to="/page2" :active="false" :isOpen="isOpens[2].value" @toggle="toggles[2]"/>
      <WizNavItem :lockingPopup="lockingPopup" @setLock="setLock" :buttons="[createButton(5, args.click), createButton(6, args.click)]" :icon="WizIHelp" label="Page3" to="/page3" :active="false" :isOpen="isOpens[3].value" @toggle="toggles[3]"/>
    </WizNavContainer>
  </div>
  `,
});

export const PopupSticky: StoryFn<typeof WizNavContainer> = (args) => ({
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
      args,
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
      <WizNavItem :lockingPopup="lockingPopup" @setLock="setLock" :buttons="[createButton(0, args.click)]" :icon="WizIDashboard" label="Home" to="/" :active="false" :isOpen="isOpens[0].value" @toggle="toggles[0]"/>
      <WizNavItem :lockingPopup="lockingPopup" @setLock="setLock" :buttons="[createButton(1, args.click), createButton(2, args.click)]" :icon="WizIAssignment" label="Page1" to="/page1" :active="false" :isOpen="isOpens[1].value" @toggle="toggles[1]"/>
      <WizNavItem :lockingPopup="lockingPopup" @setLock="setLock" :buttons="[createButton(3, args.click), createButton(4, args.click)]" :icon="WizIBusinessCenter" label="Page2" to="/page2" :active="false" :isOpen="isOpens[2].value" @toggle="toggles[2]"/>
      <WizNavItem :lockingPopup="lockingPopup" @setLock="setLock" :buttons="[createButton(5, args.click), createButton(6, args.click)]" :icon="WizIHelp" label="Page3" to="/page3" :active="false" :isOpen="isOpens[3].value" @toggle="toggles[3]"/>
    </WizNavContainer>
  </div>
  `,
});

export const PopupStickyOpen: StoryFn<typeof WizNavContainer> = (args) => ({
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
      args,
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
      <WizNavItem :lockingPopup="lockingPopup" @setLock="setLock" :buttons="[createButton(0, args.click)]" :icon="WizIDashboard" label="Home" to="/" :active="false" :isOpen="isOpens[0].value" @toggle="toggles[0]"/>
      <WizNavItem :lockingPopup="lockingPopup" @setLock="setLock" :buttons="[createButton(1, args.click), createButton(2, args.click)]" :icon="WizIAssignment" label="Page1" to="/page1" :active="false" :isOpen="isOpens[1].value" @toggle="toggles[1]"/>
      <WizNavItem :lockingPopup="lockingPopup" @setLock="setLock" :buttons="[createButton(3, args.click), createButton(4, args.click)]" :icon="WizIBusinessCenter" label="Page2" to="/page2" :active="false" :isOpen="isOpens[2].value" @toggle="toggles[2]"/>
      <WizNavItem :lockingPopup="lockingPopup" @setLock="setLock" :buttons="[createButton(5, args.click), createButton(6, args.click)]" :icon="WizIHelp" label="Page3" to="/page3" :active="false" :isOpen="isOpens[3].value" @toggle="toggles[3]"/>
    </WizNavContainer>
  </div>
  `,
});

export const Disabled: StoryFn<typeof WizNavContainer> = (args) => ({
  components: { WizNavContainer, WizNavItem },
  setup() {
    const lockingPopup = ref(false);
    const setLock = (isLock: boolean) => {
      lockingPopup.value = isLock;
    };
    return {
      args,
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
      <WizNavItem :disabled="true"  :lockingPopup="lockingPopup" @setLock="setLock" :buttons="[createButton(0, args.click)]" :icon="WizIDashboard" label="Home" to="/" :active="false" />
      <WizNavItem :disabled="true"  :lockingPopup="lockingPopup" @setLock="setLock" :buttons="[createButton(1, args.click), createButton(2, args.click)]" :icon="WizIAssignment" label="Page1" to="/page1" :active="false" />
      <WizNavItem :disabled="true"  :lockingPopup="lockingPopup" @setLock="setLock" :buttons="[createButton(3, args.click), createButton(4, args.click)]" :icon="WizIBusinessCenter" label="Page2" to="/page2" :active="false" />
      <WizNavItem :disabled="true"  :lockingPopup="lockingPopup" @setLock="setLock" :buttons="[createButton(5, args.click), createButton(6, args.click)]" :icon="WizIHelp" label="Page3" to="/page3" :active="false" />
    </WizNavContainer>
  </div>
  `,
});

export const PopupAndTooltip: StoryFn<typeof WizNavContainer> = (args) => ({
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
      args,
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
      <WizNavItem tooltipText="これはヒント1です。"  :lockingPopup="lockingPopup" @setLock="setLock" :buttons="[createButton(0, args.click)]" :icon="WizIDashboard" label="Home" to="/" :active="false" :isOpen="isOpens[0].value" @toggle="toggles[0]"/>
      <WizNavItem tooltipText="これはヒント2です。"  :lockingPopup="lockingPopup" @setLock="setLock" :buttons="[createButton(1, args.click), createButton(2, args.click)]" :icon="WizIAssignment" label="Page1" to="/page1" :active="false" :isOpen="isOpens[1].value" @toggle="toggles[1]"/>
      <WizNavItem tooltipText="これはヒント3です。"  :lockingPopup="lockingPopup" @setLock="setLock" :buttons="[createButton(3, args.click), createButton(4, args.click)]" :icon="WizIBusinessCenter" label="Page2" to="/page2" :active="false" :isOpen="isOpens[2].value" @toggle="toggles[2]"/>
      <WizNavItem tooltipText="これはヒント4です。"  :lockingPopup="lockingPopup" @setLock="setLock" :buttons="[createButton(5, args.click), createButton(6, args.click)]" :icon="WizIHelp" label="Page3" to="/page3" :active="false" :isOpen="isOpens[3].value" @toggle="toggles[3]"/>
    </WizNavContainer>
  </div>
  `,
});
