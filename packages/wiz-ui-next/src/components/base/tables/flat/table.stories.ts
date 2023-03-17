import { StoryFn, Meta } from "@storybook/vue3";

import {
  WizFlatTable,
  WizFlatThead,
  WizFlatTbody,
  WizFlatTr,
  WizFlatTh,
  WizFlatTd,
} from ".";

export default {
  title: "Base/Tables/Flat",
  component: WizFlatTable,
  argTypes: {
    fixed: {
      control: { type: "boolean" },
    },
    width: {
      control: { type: "text" },
    },
  },
} as Meta<typeof WizFlatTable>;

export const Default: StoryFn<typeof WizFlatTable> = (args) => ({
  setup: () => ({ args }),
  components: {
    WizFlatTable,
    WizFlatThead,
    WizFlatTbody,
    WizFlatTr,
    WizFlatTh,
    WizFlatTd,
  },
  template: `
    <WizFlatTable>
      <WizFlatThead>
        <WizFlatTr>
          <WizFlatTh v-for="i in 3" :key="i">Column {{ i }}</WizFlatTh>
        </WizFlatTr>
      </WizFlatThead>
      <WizFlatTbody>
        <WizFlatTr v-for="i in 3">
          <WizFlatTd v-for="j in 3" :key="j">Row {{ i }}</WizFlatTd>
        </WizFlatTr>
      </WizFlatTbody>
    </WizFlatTable>
  `,
});

export const Fixed: StoryFn<typeof WizFlatTable> = (args) => ({
  setup: () => ({ args }),
  components: {
    WizFlatTable,
    WizFlatThead,
    WizFlatTbody,
    WizFlatTr,
    WizFlatTh,
    WizFlatTd,
  },
  template: `
    <WizFlatTable v-bind="args">
      <WizFlatThead>
        <WizFlatTr>
          <WizFlatTh v-for="i in 3" :key="i" :width="'calc(100px * ' + i + ')'">
            Column {{ i }}
          </WizFlatTh>
        </WizFlatTr>
      </WizFlatThead>
      <WizFlatTbody>
        <WizFlatTr v-for="i in 3">
          <WizFlatTd v-for="j in 3" :key="j">Row {{ i }}</WizFlatTd>
        </WizFlatTr>
      </WizFlatTbody>
    </WizFlatTable>
  `,
});
Fixed.args = {
  fixed: true,
  width: "600px",
};

export const WithRowHeader: StoryFn<typeof WizFlatTable> = (args) => ({
  setup: () => ({ args }),
  components: {
    WizFlatTable,
    WizFlatThead,
    WizFlatTbody,
    WizFlatTr,
    WizFlatTh,
    WizFlatTd,
  },
  template: `
    <WizFlatTable>
      <WizFlatThead>
        <WizFlatTr>
          <WizFlatTh v-for="i in 3" :key="i" scope="col">Column {{ i }}</WizFlatTh>
        </WizFlatTr>
      </WizFlatThead>
      <WizFlatTbody>
        <WizFlatTr v-for="i in 3">
          <WizFlatTh scope="row">Row {{ i }}</WizFlatTh>
          <WizFlatTd v-for="j in 2" :key="j">Row {{ i }}</WizFlatTd>
        </WizFlatTr>
      </WizFlatTbody>
    </WizFlatTable>
  `,
});
