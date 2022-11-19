<template>
  <WizVStack :align="sender === 'me' ? 'end' : 'start'" gap="no">
    <WizText
      v-if="sender === 'other'"
      as="span"
      font-size="xs2"
      color="gray.600"
      >{{ username }}</WizText
    >
    <WizCard
      border
      fit
      px="xs"
      py="md"
      borderColor="gray.300"
      :maxWidth="maxChatItemWidth"
    >
      <WizText as="span" font-size="xs" color="gray.700">{{ message }}</WizText>
    </WizCard>
  </WizVStack>
</template>

<script setup lang="ts">
import { WizText, WizVStack } from "@/components/atoms";
import { WizCard } from "@/components/molecules/card";

interface Props {
  sender: "me" | "other";
  username?: string;
  message: string;
  maxChatItemWidth?: string;
}

withDefaults(defineProps<Props>(), {
  sender: "other",
});
</script>
