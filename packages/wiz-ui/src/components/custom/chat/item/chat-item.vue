<template>
  <WizVStack :align="content.sender === 'me' ? 'end' : 'start'">
    <WizText
      v-if="content.username"
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
        <WizText
          as="span"
          fontSize="xs"
          color="gray.700"
          whiteSpace="preLine"
          >{{ content.message }}</WizText
        >
      </WizCard>
      <WizVStack :align="content.sender === 'me' ? 'end' : 'start'">
        <WizText
          v-if="content.read !== undefined"
          as="span"
          fontSize="xs2"
          color="gray.500"
        >
          {{ content.read ? "既読" : "未読" }}
        </WizText>
        <WizText as="span" fontSize="xs2" color="gray.500">{{
          formatDateToTime(content.time)
        }}</WizText>
      </WizVStack>
    </WizHStack>
  </WizVStack>
</template>

<script setup lang="ts">
import { ComponentName } from "@wizleap-inc/wiz-ui-constants/component/name";
import { formatDateToTime } from "@wizleap-inc/wiz-ui-utils";

import { WizHStack, WizText, WizVStack, WizCard } from "@/components";

import { Message } from "..";

defineOptions({
  name: ComponentName.ChatItem,
});

interface Props {
  content: Message;
  maxChatItemWidth?: string;
}

defineProps<Props>();
</script>
