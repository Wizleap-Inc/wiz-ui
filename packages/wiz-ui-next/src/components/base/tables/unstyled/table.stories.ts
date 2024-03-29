import { StoryFn, Meta } from "@storybook/vue3";
import { SPACING_ACCESSORS } from "@wizleap-inc/wiz-ui-constants";

import { WizText, WizTextInput, WizHStack } from "@/components";

import {
  WizUnstyledTable,
  WizUnstyledThead,
  WizUnstyledTbody,
  WizUnstyledTr,
  WizUnstyledTh,
  WizUnstyledTd,
} from ".";

export default {
  title: "Base/Tables/Unstyled",
  components: {
    WizUnstyledTable,
    WizUnstyledThead,
    WizUnstyledTbody,
    WizUnstyledTr,
    WizUnstyledTh,
    WizUnstyledTd,
  },
  argTypes: {
    space: {
      control: { type: "select" },
      options: SPACING_ACCESSORS,
    },
    spaceX: {
      control: { type: "select" },
      options: SPACING_ACCESSORS,
    },
    spaceY: {
      control: { type: "select" },
      options: SPACING_ACCESSORS,
    },
    fixed: {
      control: { type: "boolean" },
    },
    width: {
      control: { type: "text" },
    },
  },
} as Meta<typeof WizUnstyledTable>;

export const Default: StoryFn<typeof WizUnstyledTable> = (args) => ({
  setup: () => ({ args }),
  components: {
    WizUnstyledTable,
    WizUnstyledThead,
    WizUnstyledTbody,
    WizUnstyledTr,
    WizUnstyledTh,
    WizUnstyledTd,
  },
  template: `
    <WizUnstyledTable v-bind="args">
      <WizUnstyledThead>
        <WizUnstyledTr>
          <WizUnstyledTh v-for="i in 3" :key="i">Column {{ i }}</WizUnstyledTh>
        </WizUnstyledTr>
      </WizUnstyledThead>
      <WizUnstyledTbody>
        <WizUnstyledTr v-for="i in 3">
          <WizUnstyledTd v-for="j in 3" :key="j">Row {{ i }}</WizUnstyledTd>
        </WizUnstyledTr>
      </WizUnstyledTbody>
    </WizUnstyledTable>
  `,
});

export const Fixed: StoryFn<typeof WizUnstyledTable> = (args) => ({
  setup: () => ({ args }),
  components: {
    WizUnstyledTable,
    WizUnstyledThead,
    WizUnstyledTbody,
    WizUnstyledTr,
    WizUnstyledTh,
    WizUnstyledTd,
  },
  template: `
    <WizUnstyledTable v-bind="args">
      <WizUnstyledThead>
        <WizUnstyledTr>
          <WizUnstyledTh v-for="i in 3" :key="i" :width="'calc(100px * ' + i + ')'">
            Column {{ i }}
          </WizUnstyledTh>
        </WizUnstyledTr>
      </WizUnstyledThead>
      <WizUnstyledTbody>
        <WizUnstyledTr v-for="i in 3">
          <WizUnstyledTd v-for="j in 3" :key="j">Row {{ i }}</WizUnstyledTd>
        </WizUnstyledTr>
      </WizUnstyledTbody>
    </WizUnstyledTable>
  `,
});
Fixed.args = {
  fixed: true,
  width: "600px",
};

export const TextAlign: StoryFn<typeof WizUnstyledTable> = (args) => ({
  setup: () => ({ args }),
  components: {
    WizUnstyledTable,
    WizUnstyledThead,
    WizUnstyledTbody,
    WizUnstyledTr,
    WizUnstyledTh,
    WizUnstyledTd,
  },
  template: `
    <WizUnstyledTable v-bind="args">
      <WizUnstyledThead>
        <WizUnstyledTr>
          <WizUnstyledTh width="200px" align="left">Column 1</WizUnstyledTh>
          <WizUnstyledTh width="200px" align="center">Column 2</WizUnstyledTh>
          <WizUnstyledTh width="200px" align="right">Column 3</WizUnstyledTh>
        </WizUnstyledTr>
      </WizUnstyledThead>
      <WizUnstyledTbody>
        <WizUnstyledTr v-for="i in 3" @click="args.onClick('Row ' + i)">
          <WizUnstyledTd :key="j" :align="align" v-for="(align,j) in ['left','center','right']">
            Row {{ j+1 }}
          </WizUnstyledTd>
        </WizUnstyledTr>
      </WizUnstyledTbody>
    </WizUnstyledTable>
  `,
});

export const WithRowHeader: StoryFn<typeof WizUnstyledTable> = (args) => ({
  setup: () => ({ args }),
  components: {
    WizUnstyledTable,
    WizUnstyledThead,
    WizUnstyledTbody,
    WizUnstyledTr,
    WizUnstyledTh,
    WizUnstyledTd,
  },
  template: `
    <WizUnstyledTable v-bind="args">
      <WizUnstyledThead>
        <WizUnstyledTr>
          <WizUnstyledTh v-for="i in 3" :key="i">Column {{ i }}</WizUnstyledTh>
        </WizUnstyledTr>
      </WizUnstyledThead>
      <WizUnstyledTbody>
        <WizUnstyledTr v-for="i in 3">
          <WizUnstyledTh>Row {{ i }}</WizUnstyledTh>
          <WizUnstyledTd v-for="j in 2" :key="j">Row {{ i }}</WizUnstyledTd>
        </WizUnstyledTr>
      </WizUnstyledTbody>
    </WizUnstyledTable>
  `,
});

export const UseAsForm: StoryFn<typeof WizUnstyledTable> = (args) => ({
  setup: () => ({ args }),
  components: {
    WizUnstyledTable,
    WizUnstyledThead,
    WizUnstyledTbody,
    WizUnstyledTr,
    WizUnstyledTh,
    WizUnstyledTd,
    WizText,
    WizTextInput,
    WizHStack,
  },
  template: `
    <WizUnstyledTable space="xs2">
      <WizUnstyledTbody>
        <WizUnstyledTr>
          <WizUnstyledTd align="light">
            <WizText>First Name</WizText>
          </WizUnstyledTd>
          <WizUnstyledTd align="light">
            <WizTextInput expand placeholder="First Name" />
          </WizUnstyledTd>
        </WizUnstyledTr>
        <WizUnstyledTr>
          <WizUnstyledTd align="light">
            <WizText>Last Name</WizText>
          </WizUnstyledTd>
          <WizUnstyledTd align="light">
            <WizTextInput expand placeholder="Last Name" />
          </WizUnstyledTd>
        </WizUnstyledTr>
        <WizUnstyledTr>
          <WizUnstyledTd align="light" width="120px">
            <WizText>ID</WizText>
          </WizUnstyledTd>
          <WizUnstyledTd align="light">
            <WizText color="gray.500" bold lineHeight="xl6">XXXX-XXXX-XXXX</WizText>
          </WizUnstyledTd>
        </WizUnstyledTr>
        <WizUnstyledTr>
          <WizUnstyledTd align="light">
            <WizText>生年月日</WizText>
          </WizUnstyledTd>
          <WizUnstyledTd align="light">
            <WizHStack gap="xs2">
              <WizTextInput expand placeholder="Year" />
              <WizTextInput expand placeholder="Month" />
              <WizTextInput expand placeholder="Day" />
            </WizHStack>
          </WizUnstyledTd>
        </WizUnstyledTr>
      </WizUnstyledTbody>
    </WizUnstyledTable>
  `,
});

export const Divider: StoryFn = (args) => ({
  setup: () => ({ args }),
  components: {
    WizUnstyledTable,
    WizUnstyledThead,
    WizUnstyledTbody,
    WizUnstyledTr,
    WizUnstyledTh,
    WizUnstyledTd,
  },
  template: `
    <WizUnstyledTable v-bind="args" borderCollapse="collapse">
      <WizUnstyledThead :divider="true">
        <WizUnstyledTr>
          <WizUnstyledTh v-for="i in 3" :key="i">
            Column {{ i }}
          </WizUnstyledTh>
        </WizUnstyledTr>
      </WizUnstyledThead>
      <WizUnstyledTbody>
        <WizUnstyledTr v-for="i in 3" :divider="true">
          <WizUnstyledTd v-for="j in 3" :key="j">Row {{ i }}</WizUnstyledTd>
        </WizUnstyledTr>
      </WizUnstyledTbody>
    </WizUnstyledTable>
  `,
});

export const DividerHeader: StoryFn = (args) => ({
  setup: () => ({ args }),
  components: {
    WizUnstyledTable,
    WizUnstyledThead,
    WizUnstyledTbody,
    WizUnstyledTr,
    WizUnstyledTh,
    WizUnstyledTd,
  },
  template: `
    <WizUnstyledTable v-bind="args" borderCollapse="collapse">
      <WizUnstyledThead>
        <WizUnstyledTr>
          <WizUnstyledTh divider v-for="i in 3" :key="i">
            Column {{ i }}
          </WizUnstyledTh>
        </WizUnstyledTr>
      </WizUnstyledThead>
      <WizUnstyledTbody>
        <WizUnstyledTr v-for="i in 3">
          <WizUnstyledTd v-for="j in 3" :key="j">Row {{ i }}</WizUnstyledTd>
        </WizUnstyledTr>
      </WizUnstyledTbody>
    </WizUnstyledTable>
  `,
});

export const UnionRow: StoryFn = (args) => ({
  setup: () => ({ args }),
  components: {
    WizUnstyledTable,
    WizUnstyledThead,
    WizUnstyledTbody,
    WizUnstyledTr,
    WizUnstyledTh,
    WizUnstyledTd,
  },
  template: `
    <WizUnstyledTable v-bind="$props" borderCollapse="collapse">
      <WizUnstyledThead :divider="true">
        <WizUnstyledTr>
          <WizUnstyledTh v-for="i in 4" :key="i">
            Column {{ i }}
          </WizUnstyledTh>
        </WizUnstyledTr>
      </WizUnstyledThead>
      <WizUnstyledTbody>
        <WizUnstyledTr :divider="true">
          <WizUnstyledTd :rowSpan="6">Row</WizUnstyledTd>
        </WizUnstyledTr>
        <WizUnstyledTr :divider="true">
          <WizUnstyledTh :rowSpan="6">Row</WizUnstyledTh>
        </WizUnstyledTr>
        <WizUnstyledTr v-for="i in 4" :key="i" :divider="true">
          <WizUnstyledTd v-for="j in 2" :key="j">Row {{ i }}</WizUnstyledTd>
        </WizUnstyledTr>
      </WizUnstyledTbody>
    </WizUnstyledTable>
  `,
});

export const UnionColumn: StoryFn = (args) => ({
  setup: () => ({ args }),
  components: {
    WizUnstyledTable,
    WizUnstyledThead,
    WizUnstyledTbody,
    WizUnstyledTr,
    WizUnstyledTh,
    WizUnstyledTd,
  },
  template: `
    <WizUnstyledTable v-bind="$props" borderCollapse="collapse">
      <WizUnstyledThead :divider="true">
        <WizUnstyledTr>
          <WizUnstyledTh v-for="i in 2" :colSpan="2" :key="i">
            Column {{ i }}
          </WizUnstyledTh>
        </WizUnstyledTr>
      </WizUnstyledThead>
      <WizUnstyledTbody>
        <WizUnstyledTr v-for="i in 3" :key="i" :divider="true">
          <WizUnstyledTd v-for="j in 3" :key="j">Row {{ i }}</WizUnstyledTd>
        </WizUnstyledTr>
        <WizUnstyledTr :divider="true">
          <WizUnstyledTd :colSpan="3">Row</WizUnstyledTd>
        </WizUnstyledTr>
      </WizUnstyledTbody>
    </WizUnstyledTable>
  `,
});
