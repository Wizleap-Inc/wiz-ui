<template>
  <div>
    <WizTab v-model="activeTab" :items="tabs" />
    <WizBox bgColor="white.800" roundB="xs2" overflow="hidden">
      <WizNotificationList
        :notifications="displayNotifications"
        :variant="selectedVariant"
        :height="height"
        :emptyMessage="emptyMessage"
        @click="onClick"
      />
    </WizBox>
  </div>
</template>

<script setup lang="ts">
import { ComponentName } from "@wizleap-inc/wiz-ui-constants";
import { computed, ref, PropType } from "vue";

import { WizBox, WizTab } from "@/components/base";

import { WizNotificationList } from "./list";
import { NotificationItem, NotificationTabItem } from "./types";

defineOptions({
  name: ComponentName.Notification,
});

const props = defineProps({
  tabs: {
    type: Array as PropType<NotificationTabItem[]>,
    required: true,
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

const activeTab = ref(props.tabs[0].name);

const displayNotifications = computed(() => {
  return props.notifications.filter((item) => item.tabName === activeTab.value);
});

const selectedVariant = computed(() => {
  return props.tabs.find((item) => item.name === activeTab.value)?.variant;
});
</script>
