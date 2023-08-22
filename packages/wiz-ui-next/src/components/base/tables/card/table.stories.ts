import { StoryFn, Meta } from "@storybook/vue3";

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
    fixed: {
      control: { type: "boolean" },
    },
    width: {
      control: { type: "text" },
    },
    onClick: {
      action: "onClick",
    },
  },
} as Meta<typeof WizCardTable>;

export const Default: StoryFn<typeof WizCardTable> = (args) => ({
  setup: () => ({ args }),
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
        <WizCardTr v-for="i in 3" @click="args.onClick('Row ' + i)">
          <WizCardTd v-for="j in 3" :key="j">Row {{ i }}</WizCardTd>
        </WizCardTr>
      </WizCardTbody>
    </WizCardTable>
  `,
});
Default.parameters = {
  docs: {
    description: {
      component: `
### WizCardTable

WizCardTableは、カード調のテーブルを作成するコンポーネントです。
一列ごとにカードとして生成されるため、Trに対してクリックイベントを設定することができます。
router-pushなどと組み合わせて、クリックした行に対応するページに遷移するような使い方ができます。
      `,
    },
    source: {
      code: `
<template>
  <WizCardTable>
    <WizCardThead>
      <WizCardTr>
        <WizCardTh>Column 1</WizCardTh>
        <WizCardTh>Column 2</WizCardTh>
        <WizCardTh>Column 3</WizCardTh>
      </WizCardTr>
    </WizCardThead>
    <WizCardTbody>
      <WizCardTr @click="args.onClick('Row 1')">
        <WizCardTd>Row 1</WizCardTd>
        <WizCardTd>Row 1</WizCardTd>
        <WizCardTd>Row 1</WizCardTd>
      </WizCardTr>
      <WizCardTr @click="args.onClick('Row 2')">
        <WizCardTd>Row 2</WizCardTd>
        <WizCardTd>Row 2</WizCardTd>
        <WizCardTd>Row 2</WizCardTd>
      </WizCardTr>
      <WizCardTr @click="args.onClick('Row 3')">
        <WizCardTd>Row 3</WizCardTd>
        <WizCardTd>Row 3</WizCardTd>
        <WizCardTd>Row 3</WizCardTd>
      </WizCardTr>
    </WizCardTbody>
  </WizCardTable>
</template>

<script setup lang="ts">
import { WizCardTable, WizCardThead, WizCardTbody, WizCardTr, WizCardTh, WizCardTd } from "@/components/base/tables/card";

export const onClick = (text: string) => {
  console.log(text);
};
</script>
      `,
    },
  },
};

export const Fixed: StoryFn<typeof WizCardTable> = (args) => ({
  setup: () => ({ args }),
  components: {
    WizCardTable,
    WizCardThead,
    WizCardTbody,
    WizCardTr,
    WizCardTh,
    WizCardTd,
    WizVStack,
  },
  template: `
    <WizCardTable v-bind="args">
      <WizCardThead>
        <WizCardTr>
          <WizCardTh v-for="i in 3" :key="i" :width="'calc(100px * ' + i + ')'">
            Column {{ i }}
          </WizCardTh>
        </WizCardTr>
      </WizCardThead>
      <WizCardTbody>
        <WizCardTr v-for="i in 3" @click="args.onClick('Row ' + i)">
          <WizCardTd v-for="j in 3" :key="j">
            Row {{ i }}
          </WizCardTd>
        </WizCardTr>
      </WizCardTbody>
    </WizCardTable>
  `,
});
Fixed.args = {
  fixed: true,
  width: "600px",
};

export const UnionColumn: StoryFn<typeof WizCardTable> = (args) => ({
  setup: () => ({ args }),
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
          <WizCardTh v-for="i in 2" :key="i" :colSpan="2">Column {{ i }}</WizCardTh>
        </WizCardTr>
      </WizCardThead>
      <WizCardTbody>
        <WizCardTr v-for="i in 3" :key="i" @click="args.onClick('Row ' + i)">
          <WizCardTd v-for="j in 4" :key="j">Row {{ i }}</WizCardTd>
        </WizCardTr>
      </WizCardTbody>
    </WizCardTable>
  `,
});
UnionColumn.parameters = {
  docs: {
    description: {
      story: "`colSpan`を指定することで、列を結合することができます。",
    },
    source: {
      code: `
<template>
  <WizCardTable>
    <WizCardThead>
      <WizCardTr>
        <WizCardTh :colSpan="2">Column 1</WizCardTh>
        <WizCardTh :colSpan="2">Column 2</WizCardTh>
      </WizCardTr>
    </WizCardThead>
    <WizCardTbody>
      <WizCardTr @click="args.onClick('Row 1')">
        <WizCardTd>Row 1</WizCardTd>
        <WizCardTd>Row 1</WizCardTd>
        <WizCardTd>Row 1</WizCardTd>
        <WizCardTd>Row 1</WizCardTd>
      </WizCardTr>
      <WizCardTr @click="args.onClick('Row 2')">
        <WizCardTd>Row 2</WizCardTd>
        <WizCardTd>Row 2</WizCardTd>
        <WizCardTd>Row 2</WizCardTd>
        <WizCardTd>Row 2</WizCardTd>
      </WizCardTr>
      <WizCardTr @click="args.onClick('Row 3')">
        <WizCardTd>Row 3</WizCardTd>
        <WizCardTd>Row 3</WizCardTd>
        <WizCardTd>Row 3</WizCardTd>
        <WizCardTd>Row 3</WizCardTd>
      </WizCardTr>
    </WizCardTbody>
  </WizCardTable>
</template>

<script setup lang="ts">
import { WizCardTable, WizCardThead, WizCardTbody, WizCardTr, WizCardTh, WizCardTd } from "@/components/base/tables/card";

export const onClick = (text: string) => {
  console.log(text);
};
</script>
      `,
    },
  },
};

export const Example: StoryFn<typeof WizCardTable> = (args) => ({
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
    return { headers, rows, args };
  },
  template: `
<WizCardTable>
  <WizCardThead>
    <WizCardTr>
      <WizCardTh v-for="header in headers" :key="header">{{ header }}</WizCardTh>
    </WizCardTr>
  </WizCardThead>
  <WizCardTbody>
    <WizCardTr v-for="i in 3" :key="i" @click="args.onClick('Row ' + i)">
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
