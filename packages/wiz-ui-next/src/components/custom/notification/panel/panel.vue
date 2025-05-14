<template>
  <WizBox
    :bg-color="panelBgColor()"
    height="fit-content"
    cursor="pointer"
    :style="{
      width,
    }"
    @mouseover="setIsHover(true)"
    @mouseleave="setIsHover(false)"
    @pointerdown="setIsPressed(true)"
    @pointerup="setIsPressed(false)"
    @pointerleave="setIsPressed(false)"
    @pointercancel="setIsPressed(false)"
    @click="onClick"
  >
    <WizHStack px="md" py="xs" justify="between" align="center" nowrap>
      <WizVStack position="relative" width="100%">
        <WizHStack v-if="variant === 'primary'" justify="between" align="start">
          <WizUnstyledTable>
            <WizUnstyledTbody>
              <WizUnstyledTr
                v-for="(item, i) in tableInfo"
                :key="`${item.title}_${i}`"
              >
                <WizUnstyledTd
                  align="left"
                  :style="{
                    paddingRight: THEME.spacing.xl,
                    paddingBottom: THEME.spacing.xs,
                  }"
                >
                  <WizText :bold="!read" font-size="xs" color="gray.700">
                    {{ item.title }}
                  </WizText>
                </WizUnstyledTd>
                <WizUnstyledTd
                  align="left"
                  :style="{ paddingBottom: THEME.spacing.xs }"
                >
                  <WizText :bold="!read" font-size="xs" color="gray.700">
                    {{ item.content }}
                  </WizText>
                </WizUnstyledTd>
              </WizUnstyledTr>
            </WizUnstyledTbody>
          </WizUnstyledTable>
          <WizText color="gray.600" font-size="xs2">
            {{ displayHowPast }}
          </WizText>
        </WizHStack>
        <WizVStack gap="xs">
          <WizText color="gray.700" font-size="xs" :max-lines="2" :bold="!read">
            {{ title }}
          </WizText>
          <WizText
            v-if="variant === 'secondary'"
            color="gray.600"
            font-size="xs2"
          >
            {{ displayDatetime }}
          </WizText>
        </WizVStack>
      </WizVStack>
      <WizIcon
        :icon="WizIChevronRight"
        :color="isHovered || isPressed ? 'green.800' : 'gray.500'"
      />
    </WizHStack>
  </WizBox>
</template>

<script setup lang="ts">
import { ColorKeys, ComponentName, THEME } from "@wizleap-inc/wiz-ui-constants";
import { formatDateToYMDHM, formatHowPast } from "@wizleap-inc/wiz-ui-utils";
import { computed, PropType, ref } from "vue";

import {
  WizBox,
  WizHStack,
  WizIcon,
  WizText,
  WizUnstyledTable,
  WizUnstyledTbody,
  WizUnstyledTd,
  WizUnstyledTr,
  WizVStack,
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

const isHovered = ref(false);
const isPressed = ref(false);

const setIsHover = (value: boolean) => {
  isHovered.value = value;
};
const setIsPressed = (value: boolean) => {
  isPressed.value = value;
};

const panelBgColor = (): ColorKeys => {
  if (isPc.value) {
    if (isPressed.value) {
      return "green.300";
    }
    if (isHovered.value) {
      return "gray.200";
    }
  }
  return "white.800";
};

interface Emit {
  (event: "click"): void;
}

const emit = defineEmits<Emit>();

const onClick = () => {
  emit("click");
};
</script>
