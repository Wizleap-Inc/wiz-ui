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
    fontSize: {
      control: { type: "select" },
      options: ["xs2", "xs", "sm", "md"],
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
          <WizFlatTh v-for="i in 3" :key="i" :fontSize="args.fontSize">Column {{ i }}</WizFlatTh>
        </WizFlatTr>
      </WizFlatThead>
      <WizFlatTbody>
        <WizFlatTr v-for="i in 3">
          <WizFlatTd v-for="j in 3" :key="j" :fontSize="args.fontSize">Row {{ i }}</WizFlatTd>
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
          <WizFlatTh v-for="i in 3" :key="i" :width="'calc(100px * ' + i + ')'" :fontSize="args.fontSize">
            Column {{ i }}
          </WizFlatTh>
        </WizFlatTr>
      </WizFlatThead>
      <WizFlatTbody>
        <WizFlatTr v-for="i in 3">
          <WizFlatTd v-for="j in 3" :key="j" :fontSize="args.fontSize">Row {{ i }}</WizFlatTd>
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
          <WizFlatTh v-for="i in 3" :key="i" scope="col" :fontSize="args.fontSize">Column {{ i }}</WizFlatTh>
        </WizFlatTr>
      </WizFlatThead>
      <WizFlatTbody>
        <WizFlatTr v-for="i in 3">
          <WizFlatTh scope="row">Row {{ i }}</WizFlatTh>
          <WizFlatTd v-for="j in 2" :key="j" :fontSize="args.fontSize">Row {{ i }}</WizFlatTd>
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
          <WizFlatTh v-for="i in 2" :key="i" scope="col" :colSpan="2" :fontSize="args.fontSize">Column {{ i }}</WizFlatTh>
        </WizFlatTr>
      </WizFlatThead>
      <WizFlatTbody>
        <WizFlatTr v-for="i in 4" :key="i">
          <WizFlatTh scope="row" :fontSize="args.fontSize">Row {{ i }}</WizFlatTh>
          <WizFlatTd v-for="j in 2" :key="j" :fontSize="args.fontSize">Row {{ i }}</WizFlatTd>
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
          <WizFlatTh scope="col" :colSpan="2" :fontSize="args.fontSize">Column 1</WizFlatTh>
          <WizFlatTh scope="col" :fontSize="args.fontSize">Column 2</WizFlatTh>
        </WizFlatTr>
      </WizFlatThead>
      <WizFlatTbody>

        <WizFlatTr >
          <WizFlatTh scope="row" :colSpan="3" :fontSize="args.fontSize">Row</WizFlatTh>
        </WizFlatTr>
        <WizFlatTr>
          <WizFlatTh scope="row" :fontSize="args.fontSize">Row 1</WizFlatTh>
          <WizFlatTd :fontSize="args.fontSize">Row 2 </WizFlatTd>
          <WizFlatTd :fontSize="args.fontSize">Row 3</WizFlatTd>
        </WizFlatTr>
        <WizFlatTr >
          <WizFlatTd scope="row" :colSpan="3" :fontSize="args.fontSize">Row</WizFlatTd>
        </WizFlatTr>
      </WizFlatTbody>
    </WizFlatTable>
  `,
});
