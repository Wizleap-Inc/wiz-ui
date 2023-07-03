import { Meta, StoryFn } from "@storybook/vue3";
import { provide, ref } from "vue";

import {
  WizFullModalView,
  WizFullModalViewContainer,
  WizHeader,
  WizTextButton,
} from "@/components";
import { globalKey, useGlobalProvider } from "@/hooks/use-global-provider";

export default {
  title: "Base/FullModalView",
  component: WizFullModalView,
  argTypes: {},
  decorators: [
    () => ({
      setup() {
        provide(globalKey, useGlobalProvider());
      },
      template: `<story />`,
    }),
  ],
} as Meta<typeof WizFullModalView>;

const Template: StoryFn<typeof WizFullModalView> = (args) => ({
  components: { WizFullModalView, WizHeader, WizTextButton },
  setup() {
    return { args };
  },
  template: `
    <div>
      <wiz-header>
        <template #right>
          Header
        </template>
      </wiz-header>
      <wiz-text-button>Click</wiz-text-button>
      <wiz-full-modal-view v-bind="args"> 
        adsfa
      </wiz-full-modal-view> 
    </div>
  `,
});

export const Default = Template.bind({});

export const Playground: StoryFn<typeof WizFullModalView> = (args) => ({
  components: {
    WizFullModalView,
    WizHeader,
    WizTextButton,
    WizFullModalViewContainer,
  },
  setup() {
    const headerProps = (() => {
      const isSticky = ref(true);
      const toggle = () => {
        isSticky.value = !isSticky.value;
      };
      return {
        isSticky,
        toggle,
      };
    })();
    const modalProps = (() => {
      const isOpen = ref(false);
      const toggle = () => {
        isOpen.value = !isOpen.value;
      };
      return {
        isOpen,
        close: () => {
          isOpen.value = false;
        },
        toggle,
      };
    })();
    return { args, modalProps, headerProps };
  },
  template: `
    <div style="background: #ddd; height: 200vh;">
    
      <wiz-full-modal-view-container :sticky="headerProps.isSticky.value">
        <template #anchor>
          <wiz-header  
            :sticky="headerProps.isSticky.value"
          >
            <template #right>
              <wiz-text-button
                size="sm" 
                @click="headerProps.toggle" 
              >
                isSticky: {{ headerProps.isSticky }}
              </wiz-text-button>  
            </template>
          </wiz-header>
        </template>

        <template #content>
          <wiz-full-modal-view
            v-bind="args"
            :isOpen="modalProps.isOpen.value" 
            @close="modalProps.close"
          >  
            <div style="">
              <div> Lorem ipsum dolor sit amet Sed sanctus et eu sea tempor dolor augue. Et sanctus rebum dolore eum diam vero ipsum dolore clita tempor takimata sanctus est invidunt sit sadipscing. Consetetur dolor magna autem dolore doming hendrerit aliquyam. Ut odio consectetuer lorem dolor doming sanctus esse vel at eros eirmod luptatum sea et enim ut sed. Lorem sit aliquyam dignissim duo ea ipsum. Nulla iusto dolor vulputate. Consequat eirmod accusam feugiat ea sea ut magna sit dolor gubergren et. Sed dolor amet no ut kasd est blandit no. Est sit enim nonumy adipiscing ut no dolore luptatum iusto ea ad feugiat lorem lorem aliquyam sadipscing eos vero. Lorem assum consequat ut vero diam aliquyam et iusto sit. Te sanctus et ut nulla lorem justo erat dolore gubergren lorem te et vulputate. Duo tempor eirmod nonumy ut magna clita. Justo sit justo erat rebum no velit esse sed eirmod sea in voluptua sea dolore at. Ut aliquam nostrud sadipscing veniam consetetur dolor ipsum ut et molestie nobis. Gubergren sit et consequat dolor consectetuer aliquyam ullamcorper. Suscipit sanctus iusto at sit. Ipsum ipsum diam sed sanctus vel.</div>
              <div> Adipiscing ipsum et lorem dolores magna stet tempor duo tempor nulla et takimata eos. Sanctus vel delenit ea ipsum rebum nam lobortis ipsum dolores eros amet diam clita eum justo ut. Eos ad commodo congue consetetur clita eu sed molestie eirmod ut rebum. Blandit voluptua esse et vero sed ad facilisis no sed minim dolore ut. No id eum et vel erat vero labore vero nibh sea vulputate dolor est. </div>
            </div>  
          </wiz-full-modal-view>
        </template>
        
      </wiz-full-modal-view-container>


      <div style="width: 20%; inset: 0; margin: 0 auto; gap:2rem; display: flex; flex-direction: column;">
        <wiz-text-button
          size="sm"
          @click="modalProps.toggle"
        >
          isOpen: {{ modalProps.isOpen }}
        </wiz-text-button>
        <div> Content </div>
        <div> Content </div>
        <div> Content </div>
        <div> Content </div>
        <div> Content </div>
        <div> Content </div>
        <div> Content </div>
        <div> Content </div>
        <div> Content </div>
        <div> Content </div>
        <div> Content </div>
        <div> Content </div>
      </div>

    </div>
  `,
});
