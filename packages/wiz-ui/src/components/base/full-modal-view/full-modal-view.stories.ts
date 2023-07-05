import { Meta, StoryFn } from "@storybook/vue";
import { COLOR_MAP_ACCESSORS } from "@wizleap-inc/wiz-ui-constants";
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
  argTypes: {
    bgColor: {
      control: { type: "select" },
      options: COLOR_MAP_ACCESSORS,
    },
    duration: {
      control: { type: "number" },
    },
  },
  decorators: [
    () => ({
      setup() {
        // headerを使用するため
        provide(globalKey, useGlobalProvider());
      },
      template: `<story />`,
    }),
  ],
} as Meta<typeof WizFullModalView>;

export const Background: StoryFn<typeof WizFullModalView> = (
  _,
  { argTypes }
) => ({
  props: Object.keys(argTypes),
  components: {
    WizFullModalView,
    WizHeader,
    WizTextButton,
    WizFullModalViewContainer,
  },
  template: `
    <div style="background: #EEEEEE; height: 120vh;">
      <wiz-full-modal-view-container>
        <template #anchor>
          <wiz-header>
          </wiz-header>
        </template>
        <template #content>
          <wiz-full-modal-view v-bind="$props"> 
            <h1>FullModalView</h1>
          </wiz-full-modal-view>
        </template>        
      </wiz-full-modal-view-container>
    </div>
  `,
});
Background.args = {
  bgColor: "white.800",
  isOpen: true,
};

export const Sticky: StoryFn<typeof WizFullModalView> = (_, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: {
    WizFullModalView,
    WizHeader,
    WizTextButton,
    WizFullModalViewContainer,
  },
  template: `
    <div style="background: #EEEEEE; height: 120vh;">    
      <wiz-full-modal-view-container sticky> <!-- stickyを指定する-->
        <template #anchor>
          <wiz-header sticky>
          </wiz-header>
        </template>
        <template #content>
          <wiz-full-modal-view v-bind="$props"> 
            <h1>FullModalView</h1>
            <p>WizFullModalViewContainerにstickyを指定してください</p>
          </wiz-full-modal-view>
        </template>        
      </wiz-full-modal-view-container>
    </div>
  `,
});
Sticky.args = {
  isOpen: true,
};

export const Playground: StoryFn<typeof WizFullModalView> = (
  _,
  { argTypes }
) => ({
  props: Object.keys(argTypes),
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
    return { modalProps, headerProps };
  },
  template: `
    <div style="background: #EEEEEE; height: 120vh;">
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
                sticky mode: {{ headerProps.isSticky.value }}
              </wiz-text-button>  
            </template>
          </wiz-header>
        </template>
        <template #content>
          <wiz-full-modal-view
            v-bind="$props"
            :isOpen="modalProps.isOpen.value" 
            @close="modalProps.close"
          >  
            <div style="
              position: absolute;
              inset: 0;
              background: rgba(230, 230, 230, 0.2);
              backdrop-filter: blur(10px);
              padding: 20px;">
              <h1>FullModalView</h1>
              <div style="display: flex;">
                <div style="margin-left: auto;">
                  <wiz-text-button
                    size="sm"
                    style="float: right;"
                    @click="modalProps.close">
                    Close
                  </wiz-text-button>
                </div>
              </div>
              <div  style="margin-top: 20px;">
                <div> Lorem ipsum dolor sit amet Sed sanctus et eu sea tempor dolor augue. Et sanctus rebum dolore eum diam vero ipsum dolore clita tempor takimata sanctus est invidunt sit sadipscing. Consetetur dolor magna autem dolore doming hendrerit aliquyam. Ut odio consectetuer lorem dolor doming sanctus esse vel at eros eirmod luptatum sea et enim ut sed. Lorem sit aliquyam dignissim duo ea ipsum. Nulla iusto dolor vulputate. Consequat eirmod accusam feugiat ea sea ut magna sit dolor gubergren et. Sed dolor amet no ut kasd est blandit no. Est sit enim nonumy adipiscing ut no dolore luptatum iusto ea ad feugiat lorem lorem aliquyam sadipscing eos vero. Lorem assum consequat ut vero diam aliquyam et iusto sit. Te sanctus et ut nulla lorem justo erat dolore gubergren lorem te et vulputate. Duo tempor eirmod nonumy ut magna clita. Justo sit justo erat rebum no velit esse sed eirmod sea in voluptua sea dolore at. Ut aliquam nostrud sadipscing veniam consetetur dolor ipsum ut et molestie nobis. Gubergren sit et consequat dolor consectetuer aliquyam ullamcorper. Suscipit sanctus iusto at sit. Ipsum ipsum diam sed sanctus vel.</div>
              </div>  
            </div>  
          </wiz-full-modal-view>
        </template>        
      </wiz-full-modal-view-container>
      <div style="width: 90%; inset: 0; margin: 20px auto; gap:2rem; display: flex; flex-direction: column;">
        <wiz-text-button
          size="sm"
          @click="modalProps.toggle"
        >
          Open
        </wiz-text-button>        
        <div> Lorem ipsum dolor sit amet Sed sanctus et eu sea tempor dolor augue. Et sanctus rebum dolore eum diam vero ipsum dolore clita tempor takimata sanctus est invidunt sit sadipscing. Consetetur dolor magna autem dolore doming hendrerit aliquyam. Ut odio consectetuer lorem dolor doming sanctus esse vel at eros eirmod luptatum sea et enim ut sed. Lorem sit aliquyam dignissim duo ea ipsum. Nulla iusto dolor vulputate. Consequat eirmod accusam feugiat ea sea ut magna sit dolor gubergren et. Sed dolor amet no ut kasd est blandit no. Est sit enim nonumy adipiscing ut no dolore luptatum iusto ea ad feugiat lorem lorem aliquyam sadipscing eos vero. Lorem assum consequat ut vero diam aliquyam et iusto sit. Te sanctus et ut nulla lorem justo erat dolore gubergren lorem te et vulputate. Duo tempor eirmod nonumy ut magna clita. Justo sit justo erat rebum no velit esse sed eirmod sea in voluptua sea dolore at. Ut aliquam nostrud sadipscing veniam consetetur dolor ipsum ut et molestie nobis. Gubergren sit et consequat dolor consectetuer aliquyam ullamcorper. Suscipit sanctus iusto at sit. Ipsum ipsum diam sed sanctus vel.</div>
        <div> Adipiscing ipsum et lorem dolores magna stet tempor duo tempor nulla et takimata eos. Sanctus vel delenit ea ipsum rebum nam lobortis ipsum dolores eros amet diam clita eum justo ut. Eos ad commodo congue consetetur clita eu sed molestie eirmod ut rebum. Blandit voluptua esse et vero sed ad facilisis no sed minim dolore ut. No id eum et vel erat vero labore vero nibh sea vulputate dolor est. </div>
        <div> Sed dolor sea hendrerit et enim et consetetur erat consectetuer lorem accusam diam augue diam enim ut nisl. Kasd et illum sanctus. Enim ut dolor est accusam facilisi elitr dolores assum wisi accusam amet facilisi ipsum at. Sanctus diam duis ullamcorper amet. Volutpat accusam dolor ut dolores dolore dolore. Et delenit elitr ipsum dolor eu vel voluptua. Ea possim dolore eleifend ex kasd et kasd aliquip at no sanctus duo ut wisi gubergren justo vel elitr. Sit dolor kasd ea sea sit sanctus lorem liber qui sadipscing invidunt magna dolores dolore et duo amet rebum. Exerci rebum illum nonumy sed diam volutpat facilisis amet elitr feugiat magna clita eos diam hendrerit erat dolores nulla.</div>
      </div>
    </div>
  `,
});
