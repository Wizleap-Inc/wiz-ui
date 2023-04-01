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
  component: WizUnstyledTable,
  subcomponents: {
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
          <WizUnstyledTd :key="j" :rowSpan="6">Row {{ i }}</WizUnstyledTd>
        </WizUnstyledTr>

        <WizUnstyledTr :divider="true">
          <WizUnstyledTh :key="j" :rowSpan="6">Row {{ i }}</WizUnstyledTh>
        </WizUnstyledTr>
        <WizUnstyledTr v-for="i in 4" :divider="true">
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
          <WizUnstyledTh v-for="i in 2" :colSpan="2":key="i">
            Column {{ i }}
          </WizUnstyledTh>
        </WizUnstyledTr>
      </WizUnstyledThead>
      <WizUnstyledTbody>
        <WizUnstyledTr v-for="i in 3" :divider="true">
          <WizUnstyledTd v-for="j in 3" :key="j">Row {{ i }}</WizUnstyledTd>
        </WizUnstyledTr>
        <WizUnstyledTr :divider="true">
          <WizUnstyledTd colSpan="3" >Row {{ i }}</WizUnstyledTd>
        </WizUnstyledTr>
      </WizUnstyledTbody>
    </WizUnstyledTable>
  `,
});
