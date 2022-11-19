<template>
  <WizHStack align="center" justify="between">
    <WizText as="span" font-size="md" color="gray.700" bold>{{
      username
    }}</WizText>
    <WizIconButton
      variant="transparent"
      :icon="WizIExpandMore"
      @click="onClick"
    />
  </WizHStack>
</template>

<script setup lang="ts">
import { WizText, WizHStack, WizIconButton } from "@/components/atoms";
import { WizIExpandMore } from "@/components/icons";

interface Props {
  username: string;
}

defineProps<Props>();

interface Emit {
  (e: "close"): void;
}

const emits = defineEmits<Emit>();

const onClick = () => emits("close");
</script>
