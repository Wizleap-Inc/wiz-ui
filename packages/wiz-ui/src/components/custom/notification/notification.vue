<template>
  <div>
    <WizTab v-model="activeTab" :items="tabs" />
    <WizBox bgColor="white.800" roundB="xs2" overflow="hidden">
      <WizNotificationList
        :notifications="displayNotifications"
        :variant="selectedVariant"
        :height="height"
        @click="onClick"
      />
    </WizBox>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";

import { WizBox, WizTab } from "@/components/base";
import { TabItem } from "@/components/base/tab/types";

import { WizNotificationList } from "./list";
import { NotificationItem } from "./types";

interface Props {
  tabs: (TabItem & {
    variant: "primary" | "secondary";
  })[];
  notifications: NotificationItem[];
  height?: string;
}

const props = defineProps<Props>();

interface Emit {
  (event: "click", id: string): void;
}

const emit = defineEmits<Emit>();

const onClick = (id: string) => emit("click", id);

const activeTab = ref(props.tabs[0].name);

const displayNotifications = computed(() => {
  return props.notifications.filter((item) => item.tabName === activeTab.value);
});

const selectedVariant = computed(() => {
  return props.tabs.find((item) => item.name === activeTab.value)?.variant;
});
</script>
