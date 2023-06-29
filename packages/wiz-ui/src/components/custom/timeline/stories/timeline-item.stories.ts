import { StoryFn } from "@storybook/vue";
import { provide, ref } from "vue";

import {
  WizUnstyledTable,
  WizUnstyledTbody,
  WizUnstyledTr,
  WizUnstyledTd,
  WizText,
  WizHStack,
  WizIInfo,
  WizIHelp,
  WizIcon,
  WizMenuItem,
  WizDivider,
} from "@/components";
import { useBreakpoint } from "@/hooks/use-breakpoint";

import { WizTimelineItem } from "..";
import { TIMELINE_KEY } from "../use-timeline";

export default {
  title: "Custom/Timeline/Item",
  component: WizTimelineItem,
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["success", "failure"],
    },
    title: {
      control: { type: "text" },
    },
    tag: {
      control: { type: "text" },
    },
    annotation: {
      control: { type: "text" },
    },
  },
  decorators: [
    () => ({
      setup() {
        const bp = useBreakpoint();
        provide(TIMELINE_KEY, { bp });
      },
      template: `<story />`,
    }),
  ],
};

const OVERVIEW_TEMPLATE = `
  <WizTimelineItem
    variant="success"
    tag="面談終了"
    title="面談レポート提出完了しました"
    annotation="2022年6月17日"
  >
    <WizUnstyledTable space="xs2" width="100%">
      <WizUnstyledTbody>
        <WizUnstyledTr>
          <WizUnstyledTd align="light" width="80px">
            <WizText fontSize="xs">
              相談日時
            </WizText>
          </WizUnstyledTd>
          <WizUnstyledTd>
            <WizHStack align="center" justify="between">
              <WizText bold fontSize="sm">
                <WizText as="span" bold fontSize="sm" display="inline-block">
                  2022年6月17日
                </WizText>
                <WizText as="span" bold fontSize="sm" display="inline-block">
                  10:00 ~ 11:00
                </WizText>
              </WizText>
              <WizIcon :icon="WizIInfo" color="yellow.800" />
            </WizHStack>
          </WizUnstyledTd>
        </WizUnstyledTr>
        <WizUnstyledTr>
          <WizUnstyledTd align="light">
            <WizText fontSize="xs">
              相談場所
            </WizText>
          </WizUnstyledTd>
          <WizUnstyledTd>
            <WizText bold fontSize="sm">
              オンライン
            </WizText>
          </WizUnstyledTd>
        </WizUnstyledTr>
        <WizUnstyledTr>
          <WizUnstyledTd />
          <WizUnstyledTd>
            <WizHStack align="center" wrap>
              <WizText fontSize="sm" as="span">
                ※ビデオ面談URL：
              </WizText>
              <WizText bold color="red.800" as="span" fontSize="sm">
                未設定
              </WizText display="inline-block">
              <WizIcon :icon="WizIInfo" color="red.800" />
            </WizHStack>
          </WizUnstyledTd>
        </WizUnstyledTr>
        <WizUnstyledTr>
          <WizUnstyledTd align="light">
            <WizText fontSize="xs">
              専門家
            </WizText>
          </WizUnstyledTd>
          <WizUnstyledTd>
            <WizText bold fontSize="sm">
              専門 タロウ
            </WizText>
          </WizUnstyledTd>
        </WizUnstyledTr>
        <WizUnstyledTr>
          <WizUnstyledTd align="light">
            <WizText fontSize="xs">
              前日の挨拶
            </WizText>
          </WizUnstyledTd>
          <WizUnstyledTd>
            <WizHStack align="center" justify="between">
              <WizText bold fontSize="sm">
                配信済み
              </WizText>
              <WizIcon :icon="WizIHelp"/>
            </WizHStack>
          </WizUnstyledTd>
        </WizUnstyledTr>
      </WizUnstyledTbody>
    </WizUnstyledTable>
    <template #footer>
      <WizDivider />
      <WizMenuItem label="編集" active expand />
      <WizDivider />
      <WizMenuItem label="面談日程追加" active expand />
      <WizDivider />
      <WizMenuItem label="相談者不在申請" active expand />
    </template>
  </WizTimelineItem>
`.trim();

const OVERVIEW_SOURCE = `
<script setup lang="ts">
import {
  WizTimelineItem,
  WizUnstyledTable,
  WizUnstyledTbody,
  WizUnstyledTr,
  WizUnstyledTd,
  WizText,
  WizIcon,
  WizHStack,
  WizMenuItem,
  WizDivider,
  WizIInfo,
  WizIHelp,
  useBreakpoint
} from "wiz-ui";
</script>

<template>
  ${OVERVIEW_TEMPLATE}
</template>
`;

export const Overview: StoryFn<typeof WizTimelineItem> = (_, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: {
    WizTimelineItem,
    WizUnstyledTable,
    WizUnstyledTbody,
    WizUnstyledTr,
    WizUnstyledTd,
    WizText,
    WizIcon,
    WizHStack,
    WizMenuItem,
    WizDivider,
  },
  setup: () => ({
    WizIInfo,
    WizIHelp,
  }),
  template: OVERVIEW_TEMPLATE,
});
Overview.parameters = {
  docs: {
    description: {
      story: `
タイムラインのアイテムコンポーネントです。
\`Timeline\`コンポーネントの子要素として使用します。
このような感じで\`WizMenuItem\`や\`WizFlatTable\`と組み合わせて綺麗なレイアウトを作ることができます。
`,
    },
    source: {
      code: OVERVIEW_SOURCE,
    },
  },
};

const Template: StoryFn<typeof WizTimelineItem> = (_, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { WizTimelineItem },
  template: `<WizTimelineItem v-bind="$props"/>`,
});

export const WithTag = Template.bind({});
WithTag.args = {
  variant: "success",
  title: "タグを設定できます",
  tag: "これはタグです",
};

export const WithAnnotation = Template.bind({});
WithAnnotation.args = {
  variant: "success",
  title: "注釈（日付）を設定できます",
  annotation: "2021年01月01日",
};

export const VariantFailure = Template.bind({});
VariantFailure.args = {
  variant: "failure",
  tag: "タグは赤くなります",
  title: "失敗ステータスのバリエーションです",
};

export const BreakpointSm = Template.bind({});
BreakpointSm.args = {
  variant: "success",
  title:
    "Timeline（親）コンポーネントのbpがsmの場合は、TimelineItem(子)コンポーネントも小さくなります",
};
BreakpointSm.decorators = [
  () => ({
    setup() {
      const bp = ref("sm");
      provide(TIMELINE_KEY, { bp });
    },
    template: `<story />`,
  }),
];
