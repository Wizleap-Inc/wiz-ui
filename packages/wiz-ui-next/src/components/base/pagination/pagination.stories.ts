import { Meta, StoryFn } from "@storybook/vue3";
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

const Template: StoryFn<typeof WizPagination> = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { WizPagination },
  setup() {
    const page = ref(1);
    return { page, args };
  },
  template: `<WizPagination v-model="page" @input="args.update" v-bind="args" />`,
});

export const Default = Template.bind({});
Default.args = {
  length: 10,
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

export const SideSize: StoryFn<typeof WizPagination> = (
  args,
  { argTypes }
) => ({
  props: Object.keys(argTypes),
  components: { WizPagination },
  setup() {
    const page = ref(1);
    return { page, args };
  },
  template: `
  <div>
    <WizPagination v-model="page" sideLength="0" @input="args.update" v-bind="args" />
    <WizPagination v-model="page" sideLength="1" @input="args.update" v-bind="args" />
    <WizPagination v-model="page" sideLength="2" @input="args.update" v-bind="args" />
    <WizPagination v-model="page" sideLength="3" @input="args.update" v-bind="args" />
    <WizPagination v-model="page" sideLength="4" @input="args.update" v-bind="args" />
    <WizPagination v-model="page" sideLength="5" @input="args.update" v-bind="args" />
  <div>
  `,
});
SideSize.args = {
  length: 10,
};
