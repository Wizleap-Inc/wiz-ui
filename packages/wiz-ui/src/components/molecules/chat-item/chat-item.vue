<template>
  <WizVStack :align="content.sender === 'me' ? 'end' : 'start'" gap="no">
    <WizText
      v-if="content.sender === 'other'"
      as="span"
      font-size="xs2"
      color="gray.600"
      >{{ content.username }}</WizText
    >
    <WizCard
      border
      fit
      px="xs"
      py="md"
      borderColor="gray.300"
      :maxWidth="maxChatItemWidth"
    >
      <WizText as="span" font-size="xs" color="gray.700">{{
        content.message
      }}</WizText>
    </WizCard>
  </WizVStack>
</template>

<script setup lang="ts">
import { WizText, WizVStack } from "@/components/atoms";
import { WizCard } from "@/components/molecules/card";
import { Message } from "@/types/components/chat";

interface Props {
  content: Message;
  maxChatItemWidth?: string;
}

defineProps<Props>();
</script>
