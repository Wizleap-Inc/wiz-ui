import { StoryFn } from "@storybook/vue3";
import { computed, provide, ref } from "vue";

import {
  WizDivider,
  WizHStack,
  WizIAdd,
  WizIHelp,
  WizIInfo,
  WizIcon,
  WizMenuItem,
  WizText,
  WizUnstyledTable,
  WizUnstyledTbody,
  WizUnstyledTd,
  WizUnstyledTr,
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
      options: ["success", "failure", "yellow", "gray"],
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
    disabled: {
      control: { type: "boolean" },
    },
    backgroundColor: {
      control: { type: "select" },
      options: ["white.800", "gray.200"],
    },
  },
  decorators: [
    () => ({
      setup() {
        const bp = useBreakpoint();
        const device = computed(() => (bp.value === "sm" ? "mobile" : "pc"));
        provide(TIMELINE_KEY, { device });
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
              </WizText>
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
      <WizMenuItem label="編集" expand />
      <WizDivider />
      <WizMenuItem label="面談日程追加" expand />
      <WizDivider />
      <WizMenuItem label="相談者不在申請" expand />
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

const Template: StoryFn<typeof WizTimelineItem> = (args) => ({
  setup: () => ({ args }),
  components: { WizTimelineItem },
  template: `<WizTimelineItem v-bind="args"/>`,
});

export const Icon = Template.bind({});
Icon.args = {
  variant: "success",
  title: "Iconをカスタマイズできます。",
  icon: WizIAdd,
};

export const WithTag = Template.bind({});
WithTag.args = {
  variant: "success",
  title: "タグを設定できます",
  tag: "これはタグです",
};

export const WithAnnotation: StoryFn<typeof WizTimelineItem> = (
  args,
  { argTypes }
) => ({
  props: Object.keys(argTypes),
  components: { WizTimelineItem, WizText },
  setup: () => ({
    args,
  }),
  template: `
    <WizTimelineItem v-bind="args">
      <template #annotation>
          2021年01月01日
      </template>
    </WizTimelineItem>  
  `,
});
WithAnnotation.args = {
  variant: "success",
  title: "注釈（日付）を設定できます",
};

export const VariantFailure = Template.bind({});
VariantFailure.args = {
  variant: "failure",
  tag: "タグは赤くなります",
  title: "失敗ステータスのバリエーションです",
};

export const VariantYellow = Template.bind({});
VariantYellow.args = {
  variant: "yellow",
  tag: "タグは黄色になります",
  title: "黄色のバリエーションです",
};

export const VariantGray = Template.bind({});
VariantGray.args = {
  variant: "gray",
  tag: "タグは灰色になります",
  title: "灰色のバリエーションです",
};

export const MobileDevice = Template.bind({});
MobileDevice.args = {
  variant: "success",
  title:
    "Timeline（親）コンポーネントのdeviceがmobileの場合は、TimelineItem(子)コンポーネントも小さくなります",
};
MobileDevice.decorators = [
  () => ({
    setup() {
      const device = ref<"mobile" | "pc">("mobile");
      provide(TIMELINE_KEY, { device });
    },
    template: `<story />`,
  }),
];

export const Disabled = Template.bind({});
Disabled.args = {
  variant: "success",
  title: "disabledにすると、タイムラインのアイテムがグレーアウトします",
  disabled: true,
};

export const Header: StoryFn<typeof WizTimelineItem> = (args) => ({
  setup() {
    return { args };
  },
  components: { WizTimelineItem, WizText },
  template: `
    <WizTimelineItem v-bind="args">
      <template #header>
        <WizText fontSize="sm">header content</WizText>
      </template>
    </WizTimelineItem>
  `,
});

Header.args = {
  title: "タイトルの下にコンテンツを表示できます",
  annotation: "2021年01月01日",
};

export const BackgroundColor = Template.bind({});
BackgroundColor.args = {
  title: "背景色を設定できます",
  backgroundColor: "gray.200",
};
