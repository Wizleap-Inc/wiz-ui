<template>
  <div>
    <WizHStack :gap="gap" :justify="center ? 'center' : undefined">
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
import { ComponentName, SpacingKeys } from "@wizleap-inc/wiz-ui-constants";
import { PropType } from "vue";

import { WizHStack } from "@/components";

import TabPane from "./tab-pane.vue";
import { TabItem } from "./types";

defineOptions({
  name: ComponentName.Tab,
});

defineProps({
  value: {
    type: String,
    required: true,
  },
  items: {
    type: Array as PropType<TabItem[]>,
    required: true,
  },
  gap: {
    type: String as PropType<SpacingKeys>,
    required: false,
  },
  width: {
    type: String,
    required: false,
  },
  center: {
    type: Boolean,
    required: false,
    default: false,
  },
});

interface Emits {
  (event: "input", value: string): void;
}

const emit = defineEmits<Emits>();

const select = (name: string) => emit("input", name);
</script>
