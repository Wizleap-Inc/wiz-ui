import { StoryFn } from "@storybook/vue";
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
};

export const Default: StoryFn = (_, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: {
    WizUnstyledTable,
    WizUnstyledThead,
    WizUnstyledTbody,
    WizUnstyledTr,
    WizUnstyledTh,
    WizUnstyledTd,
  },
  template: `
    <WizUnstyledTable v-bind="$props">
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

export const Fixed: StoryFn = (_, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: {
    WizUnstyledTable,
    WizUnstyledThead,
    WizUnstyledTbody,
    WizUnstyledTr,
    WizUnstyledTh,
    WizUnstyledTd,
  },
  template: `
    <WizUnstyledTable v-bind="$props">
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

export const WithRowHeader: StoryFn = (_, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: {
    WizUnstyledTable,
    WizUnstyledThead,
    WizUnstyledTbody,
    WizUnstyledTr,
    WizUnstyledTh,
    WizUnstyledTd,
  },
  template: `
    <WizUnstyledTable v-bind="$props">
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

export const UseAsForm: StoryFn = (_, { argTypes }) => ({
  props: Object.keys(argTypes),
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

export const Divider: StoryFn = (_, { argTypes }) => ({
  props: Object.keys(argTypes),
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
