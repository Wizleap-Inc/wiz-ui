<template>
  <WizVStack
    width="100%"
    height="100%"
    :style="{
      background: 'white',
    }"
  >
    <WizTab v-model="activeTab" :items="tabItems" />
    <div
      ref="chatRef"
      :style="{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'white',
        padding: '10px',
      }"
    >
      <div
        :style="{
          paddingBottom: `${formHeight}px`,
          width: '100%',
        }"
      >
        <ChatLog :messages="messages" />
      </div>
      <div
        ref="formRef"
        :style="{
          position: 'fixed',
          bottom: '0',
          width: `${formWidth}px`,
          boxSizing: 'border-box',
          padding: '10px',
          background: 'white',
        }"
      >
        <ChatForm v-model="formText" typingUsername="user" @submit="submit" />
      </div>
    </div>
  </WizVStack>
</template>

<script setup lang="ts">
import { WizTab, WizVStack } from "@wizleap-inc/wiz-ui-next";
import { onMounted, onUnmounted, ref } from "vue";

import { ChatForm, ChatLog } from "./_components";
import { templateArgs } from "./_components/template";
const chatRef = ref<HTMLElement | null>(null);
const formRef = ref<HTMLElement | null>(null);
const formWidth = ref(chatRef.value?.clientWidth || 0);
const formHeight = ref(formRef.value?.clientHeight || 0);
const obs = new ResizeObserver(() => {
  formWidth.value = chatRef.value?.clientWidth || 0;
  formHeight.value = formRef.value?.clientHeight || 0;
});
onMounted(() => {
  if (chatRef.value && formRef.value) {
    obs.observe(chatRef.value);
  }
});
onUnmounted(() => {
  obs.disconnect();
});

const activeTab = ref("chat");
const tabItems = [
  {
    label: "チャット",
    name: "chat",
  },
  {
    label: "Disabled",
    name: "disabled",
    disabled: true,
  },
];
const messages = ref(templateArgs.messages);
const formText = ref("");
const submit = () => {
  messages.value.push({
    message: formText.value,
    sender: "me",
    readers: ["マネーキャリアスタッフ"],
    time: new Date("2022-08-02T04:00:00.000+09:00"),
  });
  formText.value = "";
};
</script>
