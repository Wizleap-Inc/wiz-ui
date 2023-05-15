import { StoryFn } from "@storybook/vue";

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
};

export const Default: StoryFn = (_, { argTypes }) => ({
  props: Object.keys(argTypes),
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
          <WizFlatTh v-for="i in 3" :key="i" :fontSize="$props.fontSize">Column {{ i }}</WizFlatTh>
        </WizFlatTr>
      </WizFlatThead>
      <WizFlatTbody>
        <WizFlatTr v-for="i in 3">
          <WizFlatTd v-for="j in 3" :key="j" :fontSize="$props.fontSize">Row {{ i }}</WizFlatTd>
        </WizFlatTr>
      </WizFlatTbody>
    </WizFlatTable>
  `,
});

export const Fixed: StoryFn = (_, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: {
    WizFlatTable,
    WizFlatThead,
    WizFlatTbody,
    WizFlatTr,
    WizFlatTh,
    WizFlatTd,
  },
  template: `
    <WizFlatTable v-bind="$props">
      <WizFlatThead>
        <WizFlatTr>
          <WizFlatTh v-for="i in 3" :key="i" :width="'calc(100px * ' + i + ')'" :fontSize="$props.fontSize">
            Column {{ i }}
          </WizFlatTh>
        </WizFlatTr>
      </WizFlatThead>
      <WizFlatTbody>
        <WizFlatTr v-for="i in 3">
          <WizFlatTd v-for="j in 3" :key="j" :fontSize="$props.fontSize">Row {{ i }}</WizFlatTd>
        </WizFlatTr>
      </WizFlatTbody>
    </WizFlatTable>
  `,
});
Fixed.args = {
  fixed: true,
  width: "600px",
};

export const WithRowHeader: StoryFn = (_, { argTypes }) => ({
  props: Object.keys(argTypes),
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
          <WizFlatTh v-for="i in 3" :key="i" scope="col" :fontSize="$props.fontSize">Column {{ i }}</WizFlatTh>
        </WizFlatTr>
      </WizFlatThead>
      <WizFlatTbody>
        <WizFlatTr v-for="i in 3">
          <WizFlatTh scope="row" :fontSize="$props.fontSize">Row {{ i }}</WizFlatTh>
          <WizFlatTd v-for="j in 2" :key="j" :fontSize="$props.fontSize">Row {{ i }}</WizFlatTd>
        </WizFlatTr>
      </WizFlatTbody>
    </WizFlatTable>
  `,
});

export const UnionRow: StoryFn = (_, { argTypes }) => ({
  props: Object.keys(argTypes),
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
          <WizFlatTh v-for="i in 2" :key="i" scope="col" :colSpan="2" :fontSize="$props.fontSize">Column {{ i }}</WizFlatTh>
        </WizFlatTr>
      </WizFlatThead>
      <WizFlatTbody>
        <WizFlatTr v-for="i in 4" :key="i">
          <WizFlatTh scope="row" :fontSize="$props.fontSize">Row {{ i }}</WizFlatTh>
          <WizFlatTd v-for="j in 2" :key="j" :fontSize="$props.fontSize">Row {{ i }}</WizFlatTd>
        </WizFlatTr>
      </WizFlatTbody>
    </WizFlatTable>
  `,
});

export const UnionColumn: StoryFn = (_, { argTypes }) => ({
  props: Object.keys(argTypes),
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
          <WizFlatTh scope="col" :colSpan="2" :fontSize="$props.fontSize">Column 1</WizFlatTh>
          <WizFlatTh scope="col" :fontSize="$props.fontSize">Column 2</WizFlatTh>
        </WizFlatTr>
      </WizFlatThead>
      <WizFlatTbody>

        <WizFlatTr >
          <WizFlatTh scope="row" :colSpan="3" :fontSize="$props.fontSize">Row</WizFlatTh>
        </WizFlatTr>
        <WizFlatTr>
          <WizFlatTh scope="row" :fontSize="$props.fontSize">Row 1</WizFlatTh>
          <WizFlatTd :fontSize="$props.fontSize">Row 2 </WizFlatTd>
          <WizFlatTd :fontSize="$props.fontSize">Row 3</WizFlatTd>
        </WizFlatTr>
        <WizFlatTr >
          <WizFlatTd scope="row" :colSpan="3" :fontSize="$props.fontSize">Row</WizFlatTd>
        </WizFlatTr>
      </WizFlatTbody>
    </WizFlatTable>
  `,
});
