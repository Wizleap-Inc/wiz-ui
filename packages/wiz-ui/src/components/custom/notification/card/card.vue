<template>
  <WizBox bgColor="white.800">
    <WizHStack px="xs" py="md" justify="between" align="center">
      <WizVStack gap="xs" position="relative">
        <WizHStack v-if="variant === 'primary'" justify="between" align="start">
          <div>
            <slot />
          </div>
          <WizText color="gray.600" fontSize="xs2">
            {{ displayHowPast }}
          </WizText>
        </WizHStack>
        <WizText color="gray.700" fontSize="xs" :maxLines="2" bold>
          {{ title }}
        </WizText>
        <WizText v-if="variant === 'secondary'" color="gray.600" fontSize="xs2">
          {{ displayDatetime }}
        </WizText>
      </WizVStack>
      <WizIconButton :icon="WizIChevronRight" variant="transparent" />
    </WizHStack>
    <WizDivider />
  </WizBox>
</template>

<script setup lang="ts">
import { computed } from "vue";

import {
  WizBox,
  WizDivider,
  WizHStack,
  WizIconButton,
  WizVStack,
  WizText,
} from "@/components/base";
import { WizIChevronRight } from "@/components/icons";
import { formatDateToYMDHM, formatHowPast } from "@/utils/date";

interface Props {
  title: string;
  timestamp: Date;
  variant?: "primary" | "secondary";
}

const props = withDefaults(defineProps<Props>(), {
  variant: "primary",
});

const displayDatetime = computed(() => formatDateToYMDHM(props.timestamp));
const displayHowPast = computed(() => formatHowPast(props.timestamp));
</script>

<style lang="scss" scoped>
.wiz-notification-card__title {
  font-weight: bold;
}
</style>
