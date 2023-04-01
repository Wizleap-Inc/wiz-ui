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

export const UnionRow: StoryFn<typeof WizFlatTable> = (args) => ({
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
      <WizFlatTr>
        <WizFlatTh scope="row" :rowSpan="4">Row</WizFlatTh>
        <WizFlatTd :key="j" :rowSpan="4">Row {{ i }}</WizFlatTd>
      </WizFlatTr>
        <WizFlatTr v-for="i in 3">
          <WizFlatTd :key="j">Row {{ i }}</WizFlatTd>
        </WizFlatTr>
      </WizFlatTbody>
    </WizFlatTable>
  `,
});

export const UnionColumn: StoryFn<typeof WizFlatTable> = (args) => ({
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
          <WizFlatTh :key="i" scope="col" colSpan="2">Column 1</WizFlatTh>
          <WizFlatTh :key="i" scope="col" >Column 2</WizFlatTh>
        </WizFlatTr>
      </WizFlatThead>
      <WizFlatTbody>

        <WizFlatTr >
          <WizFlatTh scope="row" colSpan="3">Row {{ i }}</WizFlatTh>
        </WizFlatTr>
        <WizFlatTr>
          <WizFlatTh scope="row">Row 1</WizFlatTh>
          <WizFlatTd :key="j">Row 2 </WizFlatTd>
          <WizFlatTd :key="j">Row 3</WizFlatTd>
        </WizFlatTr>
        <WizFlatTr >
          <WizFlatTd scope="row" colSpan="3">Row {{ i }}</WizFlatTd>
        </WizFlatTr>
      </WizFlatTbody>
    </WizFlatTable>
  `,
});
