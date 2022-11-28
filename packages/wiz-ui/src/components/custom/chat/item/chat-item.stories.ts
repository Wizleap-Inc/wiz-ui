import { StoryFn } from "@storybook/vue";

import { THEME } from "@/constants";

import { Message } from "..";

import { WizChatItem } from ".";

export default {
  title: "Custom/Chat/Item",
  component: WizChatItem,
  argTypes: {
    sender: {
      control: {
        type: "select",
        options: ["me", "other"],
      },
    },
    username: {
      control: {
        type: "text",
      },
    },
  },
};

const dummyData: Record<string, Message> = {
  otherChatItem: {
    message: "こんにちは",
    sender: "other",
  },
  myChatItem: {
    message: "こんにちは",
    sender: "me",
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

export const ChatItemTime: StoryFn = () => ({
  components: { WizChatItem },
  setup: () => dummyData,
  template: `
    <div style="display: grid; grid-template-columns: max-content 300px; grid-gap: 1rem; align-items: center;">
      <div>me</div>
      <div><WizChatItem :content="{ ...myChatItem, time: new Date() }" /></div>
      <div>other</div>
      <div><WizChatItem :content="{ ...otherChatItem, time: new Date() }" /></div>
    </div>
  `,
});

export const ChatItemRead: StoryFn = () => ({
  components: { WizChatItem },
  setup: () => dummyData,
  template: `
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
  `,
});

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

export const Overview: StoryFn = (_, { argTypes }) => ({
  args: Object.keys(argTypes),
  components: { WizChatItem },
  setup() {
    const messages: (Message & { title: string })[] = [
      {
        title: "最小限表示（相手）",
        message: "こんにちは",
        sender: "other",
      },
      {
        title: "最小限表示（自分）",
        message: "こんにちは",
        sender: "me",
      },
      {
        title: "時刻表示（相手）",
        message: "こんにちは",
        sender: "other",
        time: new Date(),
      },
      {
        title: "時刻表示（自分）",
        message: "こんにちは",
        sender: "me",
        time: new Date(),
      },
      {
        title: "ユーザー名表示（相手）",
        message: "こんにちは",
        sender: "other",
        username: "ユーザー名",
      },
      {
        title: "ユーザー名表示（自分）",
        message: "こんにちは",
        sender: "me",
        username: "ユーザー名",
      },
      {
        title: "既読表示（相手）",
        message: "こんにちは",
        sender: "other",
        read: true,
      },
      {
        title: "既読表示（自分）",
        message: "こんにちは",
        sender: "me",
        read: true,
      },
      {
        title: "未読表示（相手）",
        message: "こんにちは",
        sender: "other",
        read: false,
      },
      {
        title: "未読表示（自分）",
        message: "こんにちは",
        sender: "me",
        read: false,
      },
      {
        title: "最大限表示（相手）",
        message: "こんにちは",
        sender: "other",
        username: "ユーザー名",
        time: new Date(),
        read: false,
      },
      {
        title: "最大限表示（自分）",
        message: "こんにちは",
        sender: "me",
        username: "ユーザー名",
        time: new Date(),
        read: true,
      },
    ];
    return {
      messages,
    };
  },
  template: `
    <table border="1" style="border-collapse: collapse">
      <thead>
        <tr>
          <th>タイトル</th>
          <th style="width: 300px">表示</th>
          <th>sender</th>
          <th>username</th>
          <th>time</th>
          <th>read</th>
        </tr>
      </thead>
      <template v-for="message in messages">
        <tr>
          <td style="padding: 1rem;">{{ message.title }}</td>
          <td style="padding: 1rem;"><WizChatItem :content="message" /></td>
          <td style="padding: 1rem;">{{ message.sender }}</td>
          <td :style="{ padding: '1rem', color: message.username === undefined || '${THEME.color.green[800]}'}">{{ message.username === undefined ? "undefined" : "new Date()" }}</td>
          <td :style="{ padding: '1rem', color: message.time === undefined || '${THEME.color.green[800]}'}">{{ message.time === undefined ? "undefined" : "new Date()" }}</td>
          <td :style="{ padding: '1rem', color: message.read === undefined || '${THEME.color.green[800]}'}">{{ message.read === undefined ? "undefined" : message.read }}</td>
        </tr>
      </template>
    </table>
  `,
});
