import { StoryFn } from "@storybook/vue";

import { WizVStack } from "@/components";

import {
  WizCardTable,
  WizCardThead,
  WizCardTbody,
  WizCardTr,
  WizCardTh,
  WizCardTd,
} from ".";

export default {
  title: "Base/Tables/Card",
  component: WizCardTable,
  argTypes: {
    onClick: {
      action: "onClick",
    },
  },
};

export const Default: StoryFn = (_, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: {
    WizCardTable,
    WizCardThead,
    WizCardTbody,
    WizCardTr,
    WizCardTh,
    WizCardTd,
  },
  template: `
    <WizCardTable>
      <WizCardThead>
        <WizCardTr>
          <WizCardTh v-for="i in 3" :key="i">Column {{ i }}</WizCardTh>
        </WizCardTr>
      </WizCardThead>
      <WizCardTbody>
        <WizCardTr v-for="i in 3" @click="onClick('Row ' + i)">
          <WizCardTd v-for="j in 3" :key="j">Row {{ i }}</WizCardTd>
        </WizCardTr>
      </WizCardTbody>
    </WizCardTable>
  `,
});

export const Example: StoryFn = (_, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: {
    WizCardTable,
    WizCardThead,
    WizCardTbody,
    WizCardTr,
    WizCardTh,
    WizCardTd,
    WizVStack,
  },
  setup() {
    const headers = [
      "ID・ステータス",
      "氏名・電話番号",
      "相談日時・相談内容",
      "相談場所・居住地域",
      "募集形態・単価",
    ];
    const rows = [
      ["1234567890", "6回目面談前"],
      ["田中 太郎", "090-1234-5678"],
      ["2022/10/31(月)19:00", "つみたて・投資"],
      ["オンライン", "群馬県安中市鷲宮"],
      ["共同募集", "ー"],
    ];
    return { headers, rows };
  },
  template: `
<WizCardTable>
  <WizCardThead>
    <WizCardTr>
      <WizCardTh v-for="header in headers" :key="header">{{ header }}</WizCardTh>
    </WizCardTr>
  </WizCardThead>
  <WizCardTbody>
    <WizCardTr v-for="i in 3" :key="i" @click="onClick('Row ' + i)">
      <WizCardTd v-for="(row, j) in rows" :key="j">
        <WizVStack>
          <span v-for="(item, k) in row" :key="k">{{ item }}</span>
        </WizVStack>
      </WizCardTd>
    </WizCardTr>
  </WizCardTbody>
</WizCardTable>
  `,
});
