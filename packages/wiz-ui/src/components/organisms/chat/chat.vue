<template>
  <WizCard shadow>
    <WizChatHeader :username="username" @close="onClose" />
    <WizDivider />
    <WizVStack gap="xs">
      <WizChatItem
        v-for="(item, i) in messages"
        :key="i"
        :message="item.message"
        :username="item.username"
        :sender="item.sender"
      />
    </WizVStack>
    <WizChatForm
      v-model="textValue"
      @input="onInput"
      @submit="onSubmit"
      :placeholder="placeholder"
    />
  </WizCard>
</template>

<script setup lang="ts">
import { computed } from "vue";

import { WizDivider, WizVStack } from "@/components/atoms";
import {
  WizCard,
  WizChatForm,
  WizChatHeader,
  WizChatItem,
} from "@/components/molecules";

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

const textValue = computed({
  get: () => props.value,
  set: (value) => emits("input", value),
});

const onInput = () => emits("input", textValue.value);

const onSubmit = () => emits("submit");

const onClose = () => emits("close");
</script>
