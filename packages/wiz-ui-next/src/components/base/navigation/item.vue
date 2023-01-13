<template>
  <component
    :is="isExternalLink ? 'a' : 'router-link'"
    :to="!isExternalLink ? to : undefined"
    :href="isExternalLink ? to : undefined"
    :target="isExternalLink ? '_blank' : undefined"
    :class="[navigationItemStyle, active && navigationItemActiveStyle]"
  >
    <component
      :is="icon"
      :class="[
        navigationItemIconStyle,
        active && navigationItemIconActiveStyle,
      ]"
    />
    <div
      :class="[
        navigationItemTextStyle,
        active && navigationItemTextActiveStyle,
      ]"
    >
      {{ label }}
    </div>
  </component>
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
} from "@wizleap-inc/wiz-ui-styles/bases/navigation.css";
import { computed, PropType } from "vue";
import { RouterLinkProps } from "vue-router";

import type { TIcon } from "@/components/icons";

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
});

const isExternalLink = computed(
  () => typeof props.to === "string" && props.to.startsWith("http")
);
</script>
