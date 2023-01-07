import { StoryFn } from "@storybook/vue";
import { ref } from "vue";

import WizPagination from "./pagination.vue";

export default {
  title: "Base/Pagination",
  component: WizPagination,
  argTypes: {
    value: {
      control: { type: "number" },
    },
    length: {
      control: { type: "number" },
    },
    update: {
      action: "update",
    },
  },
};

const Template: StoryFn = (_, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { WizPagination },
  setup() {
    const page = ref(0);
    return { page };
  },
  template: `<WizPagination v-model="page" @input="update" v-bind="$props" />`,
});

export const Default = Template.bind({});
Default.args = {
  length: 5,
};
Default.parameters = {
  docs: {
    source: {
      code: `
<template>
  <WizPagination v-model="page" @input="update" :length="5" />
</template>
      `,
    },
  },
};
