import { THEME } from "../../constants/styles";

import * as Icons from ".";

export default {
  title: "Icons",
};

export const Overview = ((args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { ...Icons },
  setup() {
    const displayIcons = Object.entries(Icons).map(([name, component]) => ({
      name,
      comp: component,
    }));
    return { displayIcons };
  },
  template: `
    <div style="display: flex; flex-wrap: wrap; gap: 1rem;">
      <div style="display: flex; flex-direction: column; align-items: center;" v-for="{name, comp} in displayIcons" :key="name">
        <span style="color: ${THEME.color.gray["700"]}">{{ name }}</span>
        <component :is="comp" style="font-size: 4rem; fill: ${THEME.color.gray["700"]}" />
      </div>
    </div>
  `,
})).bind({});
