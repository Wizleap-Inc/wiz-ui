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
    align: {
      control: { type: "select" },
      options: ["left", "center", "right"],
    },
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

export const FontSize: StoryFn<typeof WizFlatTable> = (args) => ({
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
  <div>
    <h2>Font Size (Th)</h2>
    <div v-for="fontSize in ['xs2', 'xs', 'sm', 'md']">
      <div style="padding-bottom:1rem;">
        <span>Font Size: {{ fontSize }}</span>
        <WizFlatTable :key="fontSize">
          <WizFlatThead>
            <WizFlatTr>
              <WizFlatTh v-for="i in 3" :key="i" :fontSize="fontSize">Column {{ i }}</WizFlatTh>
            </WizFlatTr>
          </WizFlatThead>
          <WizFlatTbody>
            <WizFlatTr v-for="i in 3">
              <WizFlatTd v-for="j in 3" :key="j" :fontSize="args.fontSize">Row {{ i }}</WizFlatTd>
            </WizFlatTr>
          </WizFlatTbody>
        </WizFlatTable>
      </div>
    </div>
    <hr/>
    <h2>Font Size (Td)</h2>
    <div v-for="fontSize in ['xs2', 'xs', 'sm', 'md']">
      <div style="padding-bottom:1rem;">
        <span>Font Size: {{ fontSize }}</span>
        <WizFlatTable :key="fontSize">
          <WizFlatThead>
            <WizFlatTr>
              <WizFlatTh v-for="i in 3" :key="i" :fontSize="args.fontSize">Column {{ i }}</WizFlatTh>
            </WizFlatTr>
          </WizFlatThead>
          <WizFlatTbody>
            <WizFlatTr v-for="i in 3">
              <WizFlatTd v-for="j in 3" :key="j" :fontSize="fontSize">Row {{ i }}</WizFlatTd>
            </WizFlatTr>
          </WizFlatTbody>
        </WizFlatTable>
      </div>
    </div>
  </div>
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

export const TextAlign: StoryFn<typeof WizFlatTable> = (args) => ({
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
          <WizFlatTh align="left">Column 1</WizFlatTh>
          <WizFlatTh align="center">Column 2</WizFlatTh>
          <WizFlatTh align="right">Column 3</WizFlatTh>
        </WizFlatTr>
      </WizFlatThead>
      <WizFlatTbody>
        <WizFlatTr>
          <WizFlatTd v-for="j in 3" :key="j" align="left">Row 1</WizFlatTd>
        </WizFlatTr>
        <WizFlatTr>
          <WizFlatTd v-for="j in 3" :key="j" align="center">Row 2</WizFlatTd>
        </WizFlatTr>
        <WizFlatTr>
          <WizFlatTd v-for="j in 3" :key="j" align="right">Row 2</WizFlatTd>
        </WizFlatTr>
      </WizFlatTbody>
    </WizFlatTable>
  `,
});
TextAlign.args = {
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
