import { StoryFn } from "@storybook/vue";
import { ref } from "vue";

import WizPagination from "./pagination.vue";

export default {
  title: "Base/Pagination",
  component: WizPagination,
  argTypes: {
    update: {
      action: "update",
    },
    pageSlot: {
      control: { type: "number" },
    },
  },
};

const Template: StoryFn = (_, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { WizPagination },
  setup() {
    const pageSlot = ref(5);
    const page = ref(1);
    const onUpdatePage = (pageNumber: number) => {
      page.value = pageNumber;
    };
    return { page, pageSlot, onUpdatePage };
  },
  template: `
     <div style="height: 100vh;padding:100px;background:#E4FBF4">
      ページ:{{ page }}
      <WizPagination v-bind="$props" @update="onUpdatePage" :pageSlot="pageSlot"></WizPagination>
    </div>`,
});

export const Default = Template.bind({});
Default.args = {};
