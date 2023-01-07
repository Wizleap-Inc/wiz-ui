import { StoryFn, Meta } from "@storybook/vue";
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
} as Meta<typeof WizPagination>;

const Template: StoryFn<typeof WizPagination> = (_, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { WizPagination },
  setup() {
    const page = ref(1);
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
    description: {
      component: `
### WizPagination

Length分のページネーションを表示するコンポーネントです。
v-modelによって現在のページの番号を管理します。
初期値は1にするとよいです。
    `,
    },
    source: {
      code: `
<template>
  <WizPagination v-model="currentPage" :length="5" />
</template>
<script setup lang="ts">
import { ref } from "vue";
import WizPagination from "./pagination.vue";

const currentPage = ref(1);
</script>
      `,
    },
  },
};
