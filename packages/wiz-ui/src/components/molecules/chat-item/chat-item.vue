<template>
  <WizVStack :align="content.sender === 'me' ? 'end' : 'start'">
    <WizText
      v-if="content.sender === 'other'"
      as="span"
      fontSize="xs2"
      color="gray.600"
      >{{ content.username }}</WizText
    >
    <WizHStack align="end" :reverse="content.sender === 'me'" gap="xs2">
      <WizCard
        border
        fit
        px="xs"
        py="md"
        borderColor="gray.300"
        :maxWidth="maxChatItemWidth"
      >
        <WizText as="span" fontSize="xs" color="gray.700">{{
          content.message
        }}</WizText>
      </WizCard>
      <WizVStack :align="content.sender === 'me' ? 'end' : 'start'">
        <WizText
          v-if="!hideReadStatus && content.sender === 'me' && content.read"
          as="span"
          fontSize="xs2"
          color="gray.500"
        >
          既読
        </WizText>
        <WizText
          v-if="!hideTimestamp && content.time"
          as="span"
          fontSize="xs2"
          color="gray.500"
          >{{ formatDateToTime(content.time) }}</WizText
        >
      </WizVStack>
    </WizHStack>
  </WizVStack>
</template>

<script setup lang="ts">
import { WizHStack, WizText, WizVStack } from "@/components/atoms";
import { WizCard } from "@/components/molecules/card";
import { Message } from "@/types/components/chat";
import { formatDateToTime } from "@/utils/date";

interface Props {
  content: Message;
  hideReadStatus?: boolean;
  hideTimestamp?: boolean;
  maxChatItemWidth?: string;
}

defineProps<Props>();
</script>
