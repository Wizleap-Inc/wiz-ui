<template>
  <WizBox :height="height" overflow-y="scroll">
    <template v-if="notifications.length > 0">
      <template v-for="(item, i) in notifications" :key="item.id">
        <WizNotificationPanel
          :variant="variant"
          :read="item.read"
          :title="item.title"
          :timestamp="item.timestamp"
          :table-info="item.tableInfo"
          @click="onClick(item.id)"
        />
        <WizDivider
          v-if="i !== notifications.length - 1"
          :key="'divider' + i"
        />
      </template>
    </template>
    <template v-else>
      <WizHStack align="center" justify="center" height="100%">
        <WizText color="gray.600" font-size="sm">{{ emptyMessage }}</WizText>
      </WizHStack>
    </template>
  </WizBox>
</template>

<script setup lang="ts">
import { ComponentName } from "@wizleap-inc/wiz-ui-constants";
import { PropType } from "vue";

import { WizDivider, WizBox, WizHStack, WizText } from "@/components/base";

import { WizNotificationPanel } from "..";
import { PanelVariant } from "../panel/types";
import { NotificationItem } from "../types";

defineOptions({
  name: ComponentName.NotificationList,
});

defineProps({
  variant: {
    type: String as PropType<PanelVariant>,
    required: false,
  },
  notifications: {
    type: Array as PropType<NotificationItem[]>,
    required: true,
  },
  height: {
    type: String,
    required: false,
  },
  emptyMessage: {
    type: String,
    required: false,
  },
});

interface Emit {
  (event: "click", id: string): void;
}

const emit = defineEmits<Emit>();

const onClick = (id: string) => emit("click", id);
</script>
