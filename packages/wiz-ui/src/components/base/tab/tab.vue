<template>
  <div>
    <WizHStack :gap="gap">
      <TabPane
        v-for="tab in items"
        :key="tab.name"
        :label="tab.label"
        :tab="tab"
        :notificationCount="tab.notificationCount"
        :disabled="tab.disabled"
        :width="width"
        :active="tab.name === value"
        @click="select(tab.name)"
      />
    </WizHStack>
  </div>
</template>

<script setup lang="ts">
import { WizHStack } from "@/components";
import { ComponentName } from "@/constants/component/name";
import { SpacingKeys } from "@/types/styles/spacing";

import TabPane from "./tab-pane.vue";
import { TabItem } from "./types";

defineOptions({
  name: ComponentName.Tab,
});

interface Props {
  gap?: SpacingKeys;
  width?: string;
  value: string;
  items: TabItem[];
}

defineProps<Props>();

interface Emits {
  (event: "input", value: string): void;
}

const emit = defineEmits<Emits>();

const select = (name: string) => emit("input", name);
</script>

<style lang="scss" scoped></style>
