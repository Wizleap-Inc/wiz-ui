<template>
  <WizBox :height="height" scroll="y">
    <template v-for="(item, i) in notifications">
      <WizNotificationPanel
        :key="item.id"
        :variant="variant"
        :read="item.read"
        :title="item.title"
        :timestamp="item.timestamp"
        :tableInfo="item.tableInfo"
        @click="onClick(item.id)"
      />
      <WizDivider :key="'divider' + i" v-if="i !== notifications.length - 1" />
    </template>
  </WizBox>
</template>

<script setup lang="ts">
import { ComponentName } from "@wizleap-inc/wiz-ui-constants";

import { WizDivider, WizBox } from "@/components/base";

import { WizNotificationPanel } from "..";
import { PanelVariant } from "../panel/types";
import { NotificationItem } from "../types";

defineOptions({
  name: ComponentName.NotificationList,
});

interface Props {
  variant?: PanelVariant;
  notifications: NotificationItem[];
  height?: string;
}

defineProps<Props>();

interface Emit {
  (event: "click", id: string): void;
}

const emit = defineEmits<Emit>();

const onClick = (id: string) => emit("click", id);
</script>
