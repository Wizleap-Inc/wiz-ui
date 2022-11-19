<template>
  <WizCard shadow :title="username">
    <template #subHeaderArea>
      <WizIconButton
        variant="transparent"
        :icon="WizIExpandMore"
        @click="onClose"
      />
    </template>
    <WizDivider />
    <WizVStack gap="xs" height="320px" overflow="scroll" ref="chatListRef">
      <WizChatItem
        v-for="(item, i) in messages"
        :key="i"
        :message="item.message"
        :username="item.username"
        :sender="item.sender"
      />
    </WizVStack>
    <template #footer>
      <WizChatForm
        v-model="textValue"
        @input="onInput"
        @submit="onSubmit"
        :placeholder="placeholder"
      />
    </template>
  </WizCard>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue";

import { WizDivider, WizIconButton, WizVStack } from "@/components/atoms";
import { WizIExpandMore } from "@/components/icons";
import { WizCard, WizChatForm, WizChatItem } from "@/components/molecules";

interface Props {
  value: string;
  username: string;
  placeholder?: string;
  messages: {
    message: string;
    sender: "me" | "other";
    username?: string;
  }[];
}

const props = defineProps<Props>();

interface Emit {
  (e: "input", value: string): void;
  (e: "submit"): void;
  (e: "close"): void;
}

const emits = defineEmits<Emit>();

const chatListRef = ref<InstanceType<typeof WizVStack>>();

onMounted(() => {
  if (!chatListRef.value) return;
  chatListRef.value.$el.scrollTo(0, chatListRef.value.$el.scrollHeight);
});

const textValue = computed({
  get: () => props.value,
  set: (value) => emits("input", value),
});

const onInput = () => emits("input", textValue.value);

const onSubmit = () => emits("submit");

const onClose = () => emits("close");
</script>
