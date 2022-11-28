<template>
  <div>
    <template v-for="(item, i) in notifications">
      <WizNotificationPanel
        :key="i + 'notification'"
        :bold="bold"
        :variant="variant"
        :title="item.title"
        :timestamp="item.timestamp"
        :status="item.status"
        :tableInfo="item.tableInfo"
      />
      <WizDivider :key="i + 'divider'" v-if="i !== notifications.length - 1" />
    </template>
  </div>
</template>

<script setup lang="ts">
import { WizDivider } from "@/components/base";

import { WizNotificationPanel } from "..";
import { InfoItem } from "../types";

interface Props {
  bold?: boolean;
  variant?: "primary" | "secondary";
  notifications: {
    title: string;
    timestamp: Date;
    status?: "new" | "read" | "old";
    tableInfo?: InfoItem[];
  }[];
}

defineProps<Props>();
</script>
