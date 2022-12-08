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
import { WizDivider, WizBox } from "@/components/base";

import { WizNotificationPanel } from "..";
import { NotificationItem } from "../types";

interface Props {
  variant?: "primary" | "secondary";
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
