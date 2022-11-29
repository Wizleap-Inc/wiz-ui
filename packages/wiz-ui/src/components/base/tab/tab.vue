<template>
  <div>
    <WizHStack :gap="gap">
      <slot />
    </WizHStack>
    <div :id="provider.tabContentId" />
  </div>
</template>

<script setup lang="ts">
import { provide } from "vue";

import { WizHStack } from "@/components/base/stack";
import { tabProviderKey, useTabProvider } from "@/components/base/tab/provider";
import { SpacingKeys } from "@/types/styles/spacing";

interface TabItem {
  label: string;
  notificationCount?: number;
}

interface Props {
  gap?: SpacingKeys;
  value?: string;
}

defineProps<Props>();

interface Emits {
  (event: "update:value", value: string): void;
}

const emit = defineEmits<Emits>();

const provider = useTabProvider();
provide(tabProviderKey, provider);
</script>

<style lang="scss" scoped></style>
