<template>
  <div>
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
  </div>
</template>

<script setup lang="ts">
import { WizDivider } from "@/components/base";

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
}

defineProps<Props>();
</script>
