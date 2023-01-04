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
    <div :class="navigationItemTextStyle">
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
} from "@wizleap-inc/wiz-ui-styles/bases/navigation.css";
import { computed } from "vue";
import { RouterLinkProps } from "vue-router";

import type { TIcon } from "@/components/icons";

defineOptions({
  name: ComponentName.NavigationItem,
});

interface Props {
  icon: TIcon;
  label: string;
  active: boolean;
  to: RouterLinkProps["to"];
}

const props = defineProps<Props>();

const isExternalLink = computed(
  () => typeof props.to === "string" && props.to.startsWith("http")
);
</script>
