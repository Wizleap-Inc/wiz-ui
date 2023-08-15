import { Meta, StoryFn } from "@storybook/vue";
import { COLOR_MAP_ACCESSORS } from "@wizleap-inc/wiz-ui-constants";
import { ref, watch } from "vue";

import { WizFullModalView, WizTextButton } from "@/components";

export default {
  title: "Base/FullModalView",
  component: WizFullModalView,
  argTypes: {
    bgColor: {
      control: { type: "select" },
      options: COLOR_MAP_ACCESSORS,
    },
    duration: {
      control: { type: "number" },
    },
    onClick: {
      action: "onClick",
    },
  },
} as Meta<typeof WizFullModalView>;

const DUMMY_TEXT_1 =
  "Lorem ipsum dolor sit amet Sed sanctus et eu sea tempor dolor augue. Et sanctus rebum dolore eum diam vero ipsum dolore clita tempor takimata sanctus est invidunt sit sadipscing. Consetetur dolor magna autem dolore doming hendrerit aliquyam. Ut odio consectetuer lorem dolor doming sanctus esse vel at eros eirmod luptatum sea et enim ut sed. Lorem sit aliquyam dignissim duo ea ipsum. Nulla iusto dolor vulputate. Consequat eirmod accusam feugiat ea sea ut magna sit dolor gubergren et. Sed dolor amet no ut kasd est blandit no. Est sit enim nonumy adipiscing ut no dolore luptatum iusto ea ad feugiat lorem lorem aliquyam sadipscing eos vero. Lorem assum consequat ut vero diam aliquyam et iusto sit. Te sanctus et ut nulla lorem justo erat dolore gubergren lorem te et vulputate. Duo tempor eirmod nonumy ut magna clita. Justo sit justo erat rebum no velit esse sed eirmod sea in voluptua sea dolore at. Ut aliquam nostrud sadipscing veniam consetetur dolor ipsum ut et molestie nobis. Gubergren sit et consequat dolor consectetuer aliquyam ullamcorper. Suscipit sanctus iusto at sit. Ipsum ipsum diam sed sanctus vel.";
const DUMMY_TEXT_2 =
  "Adipiscing ipsum et lorem dolores magna stet tempor duo tempor nulla et takimata eos. Sanctus vel delenit ea ipsum rebum nam lobortis ipsum dolores eros amet diam clita eum justo ut. Eos ad commodo congue consetetur clita eu sed molestie eirmod ut rebum. Blandit voluptua esse et vero sed ad facilisis no sed minim dolore ut. No id eum et vel erat vero labore vero nibh sea vulputate dolor est.";

export const Default: StoryFn<typeof WizFullModalView> = (
  props,
  { argTypes }
) => ({
  props: Object.keys(argTypes),
  components: {
    WizFullModalView,
    WizTextButton,
  },
  setup() {
    const isOpen = ref(props.isOpen);
    watch(props, () => {
      isOpen.value = props.isOpen;
    });
    const toggle = () => {
      isOpen.value = !isOpen.value;
    };
    const close = () => {
      isOpen.value = false;
    };
    return {
      isOpen,
      close,
      toggle,
      DUMMY_TEXT_1,
      DUMMY_TEXT_2,
    };
  },
  template: `
  <div> 
    <wiz-full-modal-view
      v-bind="$props" 
      :isOpen="isOpen" 
      @close="close"
    > 
      <h1>FullModalView</h1>
      <div> {{ DUMMY_TEXT_1 }}</div>
    </wiz-full-modal-view> 
    <div> {{ DUMMY_TEXT_1 }}</div>
  </div>
    `,
});
Default.args = {
  isOpen: true,
  title: "Title",
};

Default.parameters = {
  docs: {
    source: {
      code: `
<div> 
  <wiz-full-modal-view
    v-bind="$props"
    :isOpen="isOpen" 
    @close="close"
  > 
    <h1>FullModalView</h1>
    <div> {{ DUMMY_TEXT_1 }}</div>
  </wiz-full-modal-view> 
  <div> {{ DUMMY_TEXT_1 }}</div>
</div>
        `,
    },
  },
};

export const WithButton: StoryFn<typeof WizFullModalView> = (
  _,
  { argTypes }
) => ({
  props: Object.keys(argTypes),
  components: {
    WizFullModalView,
    WizTextButton,
  },
  setup() {
    const isOpen = ref(true);
    const toggle = () => {
      isOpen.value = !isOpen.value;
    };
    const close = () => {
      isOpen.value = false;
    };
    return {
      isOpen,
      close,
      toggle,
      DUMMY_TEXT_1,
      DUMMY_TEXT_2,
    };
  },
  template: `
    <div style="height: 120vh;"> 
      <wiz-full-modal-view
        v-bind="$props" 
        :isOpen="isOpen" 
        @close="close"
      >
        <template #header>
          <wiz-text-button variant="sub" @click="$props.onClick">
            条件をリセット
          </wiz-text-button>
        </template>
        <h1>FullModalView</h1> 
        <div style="margin-top: 32px;">
          <div> {{ DUMMY_TEXT_1 }}</div>
        </div>   
      </wiz-full-modal-view>  
      <div style="width: 90%; inset: 0; margin: 20px auto; gap:2rem; display: flex; flex-direction: column;">
        <wiz-text-button
          size="sm"
          @click="toggle"
        >
          Open
        </wiz-text-button>
          <div> {{ DUMMY_TEXT_1 }}</div>          
          <div> {{ DUMMY_TEXT_2 }}</div>
        </div>
    </div>
    `,
});
WithButton.args = {
  title: "条件指定",
  duration: 100,
};

WithButton.parameters = {
  docs: {
    source: {
      code: `
<div style="height: 120vh;"> 
  <wiz-full-modal-view
    v-bind="$props"
    :isOpen="isOpen" 
    @close="close"
  >
    <template #header>
      <wiz-text-button variant="sub" @click="args.onClick">
        条件をリセット
      </wiz-text-button>
    </template>
    <h1>FullModalView</h1> 
    <div style="margin-top: 32px;">
      <div> {{ DUMMY_TEXT_1 }}</div>
    </div>   
  </wiz-full-modal-view>  
  <div style="width: 90%; inset: 0; margin: 20px auto; gap:2rem; display: flex; flex-direction: column;">
    <wiz-text-button
      size="sm"
      @click="toggle"
    >
      Open
    </wiz-text-button>
      <div> {{ DUMMY_TEXT_1 }}</div>          
      <div> {{ DUMMY_TEXT_2 }}</div>
    </div>
</div>
        `,
    },
  },
};
