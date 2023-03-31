<template>
  <WizTooltip>
    <component
      :is="disabled || isExternalLink ? 'a' : 'router-link'"
      :to="!disabled && !isExternalLink ? to : undefined"
      :href="!disabled && isExternalLink ? to : undefined"
      :target="!disabled && isExternalLink ? '_blank' : undefined"
      :class="[
        navigationItemStyle,
        disabled
          ? navigationItemDisabledStyle
          : active && navigationItemActiveStyle,
      ]"
    >
      <component
        :is="icon"
        :class="[
          navigationItemIconStyle,
          disabled
            ? navigationItemIconDisabledStyle
            : active && navigationItemIconActiveStyle,
        ]"
      />
      <div
        :class="[
          navigationItemTextStyle,
          !disabled && active && navigationItemTextActiveStyle,
        ]"
      >
        {{ label }}
      </div>
    </component>
    <template #content v-if="tooltipText">
      {{ tooltipText }}
    </template>
  </WizTooltip>
</template>

<script setup lang="ts">
import { ComponentName } from "@wizleap-inc/wiz-ui-constants";
import {
  navigationItemStyle,
  navigationItemActiveStyle,
  navigationItemIconStyle,
  navigationItemIconActiveStyle,
  navigationItemTextStyle,
  navigationItemTextActiveStyle,
  navigationItemDisabledStyle,
  navigationItemIconDisabledStyle,
} from "@wizleap-inc/wiz-ui-styles/bases/navigation.css";
import { computed, PropType } from "vue";

import type { TIcon } from "@/components/icons";

import { WizTooltip } from "../tooltip";

import type { RouterLinkProps } from "vue-router/types/router";

defineOptions({
  name: ComponentName.NavigationItem,
});

const props = defineProps({
  icon: {
    type: Object as PropType<TIcon>,
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
  active: {
    type: Boolean,
    required: true,
  },
  to: {
    type: [Object, String] as PropType<RouterLinkProps["to"]>,
    required: true,
  },
  disabled: {
    type: Boolean,
    required: false,
    default: false,
  },
  tooltipText: {
    type: String,
    required: false,
    default: null,
  },
});
const isExternalLink = computed(
  () => typeof props.to === "string" && props.to.startsWith("http")
);
</script>
