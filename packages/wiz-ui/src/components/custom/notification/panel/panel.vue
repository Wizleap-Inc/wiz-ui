<template>
  <WizBox
    @mouseover.native="isHovered = true"
    @mouseleave.native="isHovered = false"
    @pointerdown.native="isPressed = true"
    @pointerup.native="isPressed = false"
    @click.native="onClick"
    :bgColor="panelBgColor()"
    height="fit-content"
    cursor="pointer"
    :style="{
      width,
    }"
  >
    <WizHStack px="md" py="xs" justify="between" align="center">
      <WizVStack gap="xs" position="relative" width="100%">
        <WizHStack v-if="variant === 'primary'" justify="between" align="start">
          <WizVStack gap="xs">
            <WizHStack gap="xl" v-for="(item, i) in tableInfo" :key="i">
              <WizText :bold="!read" fontSize="xs" color="gray.700">{{
                item.title
              }}</WizText>
              <WizText :bold="!read" fontSize="xs" color="gray.700">{{
                item.content
              }}</WizText>
            </WizHStack>
          </WizVStack>
          <WizText color="gray.600" fontSize="xs2">
            {{ displayHowPast }}
          </WizText>
        </WizHStack>
        <WizText color="gray.700" fontSize="xs" :maxLines="2" :bold="!read">
          {{ title }}
        </WizText>
        <WizText v-if="variant === 'secondary'" color="gray.600" fontSize="xs2">
          {{ displayDatetime }}
        </WizText>
      </WizVStack>
      <WizIcon :icon="WizIChevronRight" color="green.800" />
    </WizHStack>
  </WizBox>
</template>

<script setup lang="ts">
import { ColorKeys, ComponentName } from "@wizleap-inc/wiz-ui-constants";
import { formatDateToYMDHM, formatHowPast } from "@wizleap-inc/wiz-ui-utils";
import { computed, ref, PropType } from "vue";

import {
  WizBox,
  WizHStack,
  WizIcon,
  WizVStack,
  WizText,
} from "@/components/base";
import { WizIChevronRight } from "@/components/icons";

import { PanelVariant } from "./types";

import type { TableInfoItem } from "../types";

defineOptions({
  name: ComponentName.NotificationPanel,
});

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    required: true,
  },
  variant: {
    type: String as PropType<PanelVariant>,
    required: false,
    default: "primary",
  },
  read: {
    type: Boolean,
    required: true,
  },
  tableInfo: {
    type: Array as PropType<TableInfoItem[]>,
    required: false,
  },
  width: {
    type: String,
    required: false,
  },
});

const displayDatetime = computed(() => formatDateToYMDHM(props.timestamp));
const displayHowPast = computed(() => formatHowPast(props.timestamp));
const isPc = computed(() => window.innerWidth > 768);

const panelBgColor = (): ColorKeys => {
  if (isPc) {
    if (isPressed.value) {
      return "green.300";
    }
    if (isHovered.value) {
      return "gray.200";
    }
  }
  return "white.800";
};

const isHovered = ref(false);
const isPressed = ref(false);

interface Emit {
  (event: "click"): void;
}

const emit = defineEmits<Emit>();

const onClick = () => {
  emit("click");
};
</script>
