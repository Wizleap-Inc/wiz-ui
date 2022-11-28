<template>
  <WizBox
    :bgColor="status === 'new' ? 'white.800' : 'transparent'"
    :opacity="status === 'old' ? 0.5 : 1"
    height="fit-content"
  >
    <WizHStack px="xs" py="md" justify="between" align="center">
      <WizVStack gap="xs" position="relative">
        <WizHStack v-if="variant === 'primary'" justify="between" align="start">
          <WizVStack gap="xs">
            <WizHStack gap="xl" v-for="(item, i) in tableInfo" :key="i">
              <WizText :bold="bold" fontSize="xs" color="gray.700">{{
                item.title
              }}</WizText>
              <WizText :bold="bold" fontSize="xs" color="gray.700">{{
                item.content
              }}</WizText>
            </WizHStack>
          </WizVStack>
          <WizText color="gray.600" fontSize="xs2">
            {{ displayHowPast }}
          </WizText>
        </WizHStack>
        <WizText color="gray.700" fontSize="xs" :maxLines="2" :bold="bold">
          {{ title }}
        </WizText>
        <WizText v-if="variant === 'secondary'" color="gray.600" fontSize="xs2">
          {{ displayDatetime }}
        </WizText>
      </WizVStack>
      <WizIconButton :icon="WizIChevronRight" variant="transparent" />
    </WizHStack>
  </WizBox>
</template>

<script setup lang="ts">
import { computed } from "vue";

import {
  WizBox,
  WizHStack,
  WizIconButton,
  WizVStack,
  WizText,
} from "@/components/base";
import { WizIChevronRight } from "@/components/icons";
import { formatDateToYMDHM, formatHowPast } from "@/utils/date";

import type { InfoItem } from "../types";

interface Props {
  title: string;
  timestamp: Date;
  variant?: "primary" | "secondary";
  status?: "new" | "read" | "old";
  bold?: boolean;
  tableInfo?: InfoItem[];
}

const props = withDefaults(defineProps<Props>(), {
  variant: "primary",
  status: "new",
  bold: false,
});

const displayDatetime = computed(() => formatDateToYMDHM(props.timestamp));
const displayHowPast = computed(() => formatHowPast(props.timestamp));
</script>
