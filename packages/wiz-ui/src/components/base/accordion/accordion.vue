<template>
  <details
    :style="{ width: width }"
    :class="[AccordionDetailsStyle[backgroundColor]]"
  >
    <summary
      :style="{
        display: 'flex',
        justifyContent: 'center',
      }"
      @click="isOpen = !isOpen"
    >
      <WizHStack
        align="center"
        justify="between"
        gap="xs2"
        :class="AccordionMessageVariantStyle[backgroundColor]"
      >
        <div>
          {{ isOpen ? closeMessage : openMessage }}
        </div>
        <div @click="canSpin = true">
          <WizIcon
            v-if="!isOpen"
            size="xl2"
            :icon="WizIExpandMore"
            :color="iconColor"
            :class="[canSpin && openSpin]"
          />
          <WizIcon
            v-else
            size="xl2"
            :icon="WizIExpandLess"
            :color="iconColor"
            :class="[canSpin && closeSpin]"
          />
        </div>
      </WizHStack>
    </summary>
    <slot />
  </details>
</template>

<script setup lang="ts">
import { ColorKeys } from "@wizleap-inc/wiz-ui-constants";
import {
  AccordionMessageVariantStyle,
  AccordionDetailsStyle,
  openSpin,
  closeSpin,
} from "@wizleap-inc/wiz-ui-styles/bases/accordion.css";
import { ref, computed, PropType } from "vue";

import { WizIExpandLess, WizIExpandMore } from "@/components/icons";

import { WizHStack, WizIcon } from "../";

const props = defineProps({
  openMessage: {
    type: String,
    required: false,
    default: "もっと見る",
  },
  closeMessage: {
    type: String,
    required: false,
    default: "閉じる",
  },
  backgroundColor: {
    type: String as PropType<"gray" | "white">,
    requried: false,
    default: "white",
  },

  width: {
    type: String,
    required: false,
    default: "20rem",
  },
});

const isOpen = ref(false);

const canSpin = ref(false);

const width = computed(() => props.width);

const iconColor = computed((): ColorKeys => {
  return props.backgroundColor === "gray" ? "green.800" : "gray.500";
});
</script>
