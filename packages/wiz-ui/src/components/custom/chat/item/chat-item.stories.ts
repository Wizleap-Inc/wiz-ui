import { StoryFn } from "@storybook/vue";

import { Message } from "..";

import { WizChatItem } from ".";

export default {
  title: "Custom/Chat/Item",
  component: WizChatItem,
  argTypes: {
    content: {
      control: { type: "object" },
    },
    maxChatItemWidth: {
      control: { type: "string" },
    },
  },
};

const dummyData: Record<string, Message> = {
  otherChatItem: {
    message: "こんにちは",
    sender: "other",
    time: new Date("2021-01-01T00:00:00.000+09:00"),
  },
  myChatItem: {
    message: "こんにちは",
    sender: "me",
    time: new Date("2021-01-01T00:00:00.000+09:00"),
  },
};

export const ChatItemOwner: StoryFn = () => ({
  components: { WizChatItem },
  setup: () => dummyData,
  template: `
    <div style="display: grid; grid-template-columns: max-content 300px; grid-gap: 1rem; align-items: center;">
      <div>me</div>
      <div><WizChatItem :content="myChatItem" /></div>
      <div>other</div>
      <div><WizChatItem :content="otherChatItem" /></div>
    </div>
  `,
});
ChatItemOwner.parameters = {
  docs: {
    source: {
      code: `
<template>
  <div style="display: grid; grid-template-columns: max-content 300px; grid-gap: 1rem; align-items: center;">
    <div>me</div>
    <div><WizChatItem :content="myChatItem" /></div>
    <div>other</div>
    <div><WizChatItem :content="otherChatItem" /></div>
  </div>
</template>
      `,
    },
  },
};

export const ChatItemRead: StoryFn = () => ({
  components: { WizChatItem },
  setup: () => dummyData,
  template: `
    <div style="display: grid; grid-template-columns: max-content 300px; grid-gap: 1rem; align-items: center;">
      <div>readers=undefined</div>
      <div><WizChatItem :content="{ ...myChatItem, readers: undefined }" /></div>
      <div>readers=[]</div>
      <div><WizChatItem :content="{ ...myChatItem, readers: [] }" /></div>
      <div>readers=['man1']</div>
      <div><WizChatItem :content="{ ...myChatItem, readers: ['man1'] }" /></div>
      <div>readers=['man1', 'man2']</div>
      <div><WizChatItem :content="{ ...myChatItem, readers: ['man1', 'man2'] }" /></div>
    </div>
  `,
});
ChatItemRead.parameters = {
  docs: {
    source: {
      code: `
<template>
  <div style="display: grid; grid-template-columns: max-content 300px; grid-gap: 1rem; align-items: center;">
    <div>me, read=true</div>
    <div><WizChatItem :content="{ ...myChatItem, read: true }" /></div>
    <div>other, read=true</div>
    <div><WizChatItem :content="{ ...otherChatItem, read: true }" /></div>
    <div>me, read=false</div>
    <div><WizChatItem :content="{ ...myChatItem, read: false }" /></div>
    <div>other, read=false</div>
    <div><WizChatItem :content="{ ...otherChatItem, read: false }" /></div>
  </div>
</template>
      `,
    },
  },
};

export const ChatItemUsername: StoryFn = () => ({
  components: { WizChatItem },
  setup: () => dummyData,
  template: `
    <div style="display: grid; grid-template-columns: max-content 300px; grid-gap: 1rem; align-items: center;">
      <div>me</div>
      <div><WizChatItem :content="{ ...myChatItem, username: 'マネーキャリアスタッフ' }" /></div>
      <div>other</div>
      <div><WizChatItem :content="{ ...otherChatItem, username: 'マネーキャリアスタッフ' }" /></div>
    </div>
  `,
});
ChatItemUsername.parameters = {
  docs: {
    source: {
      code: `
<template>
  <div style="display: grid; grid-template-columns: max-content 300px; grid-gap: 1rem; align-items: center;">
    <div>me</div>
    <div><WizChatItem :content="{ ...myChatItem, username: 'マネーキャリアスタッフ' }" /></div>
    <div>other</div>
    <div><WizChatItem :content="{ ...otherChatItem, username: 'マネーキャリアスタッフ' }" /></div>
  </div>
</template>
      `,
    },
  },
};


export const ChatItemWithLink: StoryFn = (_, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { WizChatItem },
  setup: () => dummyData,
  template: `
    <WizChatItem v-bind="$props" />
  `,
});
ChatItemWithLink.args = {
  content: {
    message:
      "こんにちは、こちらがHPになります。https://wizleap.co.jp ご確認いただいたあとこちらのリンクからご返信ください。https://example.com",
    sender: "other",
    time: new Date("2021-01-01T00:00:00.000+09:00"),
  },
};
