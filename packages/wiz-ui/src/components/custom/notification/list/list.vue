<template>
  <WizBox :height="height" scroll="y">
    <template v-for="(item, i) in notifications">
      <WizNotificationPanel
        :key="i + 'notification'"
        :variant="variant"
        :read="item.read"
        :title="item.title"
        :timestamp="item.timestamp"
        :tableInfo="item.tableInfo"
      />
      <WizDivider :key="i + 'divider'" v-if="i !== notifications.length - 1" />
    </template>
  </WizBox>
</template>

<script setup lang="ts">
import { WizDivider, WizBox } from "@/components/base";

import { WizNotificationPanel } from "..";
import { TableInfoItem } from "../types";

interface Props {
  variant?: "primary" | "secondary";
  notifications: {
    read: boolean;
    title: string;
    timestamp: Date;
    tableInfo?: TableInfoItem[];
  }[];
  height?: string;
}

defineProps<Props>();

interface Emit {
  (event: "click"): void;
}

const emit = defineEmits<Emit>();

const onClick = () => emit("click");
</script>
