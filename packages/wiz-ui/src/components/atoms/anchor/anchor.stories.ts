import { StoryFn } from "@storybook/vue";
import StoryRouter from "storybook-vue-router";

import { COLOR_MAP_ACCESSORS } from "../../../constants/styles/color";
import { FONT_SIZE_ACCESSORS } from "../../../constants/styles/fontSize";
import WizIArrowRight from "../../icons/arrow-right.vue";

import WizAnchor from "./anchor.vue";

const Home = () => ({
  template: `
    <div>
      <h1>Home</h1>
    </div>
  `,
});

const About = () => ({
  template: `
    <div>
      <h1>About</h1>
    </div>
  `,
});

export default {
  title: "Atoms/Anchor",
  component: WizAnchor,
  argTypes: {
    fontSize: {
      control: { type: "select" },
      options: FONT_SIZE_ACCESSORS,
    },
    fontWeight: {
      control: { type: "select" },
      options: ["normal", "bold"],
    },
    color: {
      control: { type: "select" },
      options: COLOR_MAP_ACCESSORS,
    },
    target: {
      control: { type: "select" },
      options: ["_blank", "_self"],
    },
  },
  decorators: [
    StoryRouter([
      { path: "/", component: Home },
      { path: "/about", component: About },
    ]),
  ],
};

const Template: StoryFn = (_, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { WizAnchor },
  template: `<WizAnchor v-bind="$props">{{ slot }}</WizAnchor>`,
});

export const Default = Template.bind({});
Default.args = {
  slot: "リンク名リンク名リンク名リンク名リンク名",
};

export const Target = Template.bind({});
Target.args = {
  slot: "リンク名リンク名リンク名リンク名リンク名",
  to: "/page1",
  target: "_blank",
};

export const Bold = Template.bind({});
Bold.args = {
  slot: "リンク名リンク名リンク名リンク名リンク名",
  fontWeight: "bold",
};

export const WithIcon = Template.bind({});
WithIcon.args = {
  slot: "リンク名リンク名リンク名リンク名リンク名",
  icon: WizIArrowRight,
};

const VueRouterTemplate: StoryFn = (_, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { WizAnchor },
  template: `
  <div>
    <pre><code>{{ annotation }}</code></pre>
    <WizAnchor v-bind="$props">{{ slot }}</WizAnchor>
  </div>
  `,
});

export const InternalLinkString = VueRouterTemplate.bind({});
InternalLinkString.args = {
  annotation: "to = '/about'",
  slot: "内部リンクです",
  to: "/about",
};

export const InternalLinkObject = VueRouterTemplate.bind({});
InternalLinkObject.args = {
  annotation: "to = { name: 'about' }",
  slot: "内部リンクです",
  to: { name: "about" },
};

export const ExternalLink = VueRouterTemplate.bind({});
ExternalLink.args = {
  annotation: "to = 'https://www.google.com/'",
  slot: "外部リンクです",
  to: "https://google.com",
};

export const NewTabLink = VueRouterTemplate.bind({});
NewTabLink.args = {
  annotation: "to = '/about', target = '_blank'",
  slot: "新しいタブで開くリンクです",
  to: "/about",
  target: "_blank",
};

const OverviewTemplate: StoryFn = (_, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { WizAnchor },
  setup() {
    return { WizIArrowRight };
  },
  template: `
    <table>
      <tr>
        <WizAnchor to="#">
          リンク名1
        </WizAnchor>
      </tr>
      <tr>
        <WizAnchor to="#" fontWeight="bold">
          リンク名2
        </WizAnchor>
      </tr>
      <tr>
        <WizAnchor to="#" :icon="WizIArrowRight">
          リンク名3
        </WizAnchor>
      </tr>
    </table>
  `,
});

export const Overview = OverviewTemplate.bind({});
