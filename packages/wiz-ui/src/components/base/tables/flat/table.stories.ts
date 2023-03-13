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
    <div style="width: 300px">
      <WizFlatTable fixed>
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
    </div>
  `,
});

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
