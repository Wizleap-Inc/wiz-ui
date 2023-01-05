<template>
  <WizVStack>
    <WizHStack>
      <WizHStack :width="labelWidth" align="center" gap="xs2">
        <WizText>{{ label }}</WizText>
        <WizTag font-size="xs2" label="必須" v-if="required" />
      </WizHStack>
      <WizVStack>
        <slot />
      </WizVStack>
    </WizHStack>
    <WizHStack :height="THEME.fontSize.sm">
      <WizBox :width="labelWidth" />
      <WizText font-size="xs2" line-height="sm" color="red.800">{{
        error
      }}</WizText>
    </WizHStack>
  </WizVStack>
</template>

<script setup lang="ts">
import { THEME } from "@wizleap-inc/wiz-ui-constants";
import { onMounted, provide, watch, inject, computed } from "vue";

import {
  WizTag,
  WizText,
  WizHStack,
  WizVStack,
  WizBox,
} from "@/components/base";
import {
  formControlKey,
  useFormControlProvider,
} from "@/hooks/use-form-control-provider";
import { formGroupKey } from "@/hooks/use-form-group-provider";

const props = defineProps({
  label: {
    type: String,
    required: true,
  },
  required: {
    type: Boolean,
    default: false,
  },
  error: {
    type: String,
    required: false,
  },
});

// Form Group
const fromGroup = inject(formGroupKey);
const labelWidth = computed(() => fromGroup?.labelWidth.value || "8rem");

// Form Control
const provider = useFormControlProvider();
provide(formControlKey, provider);
const { setIsError } = provider;
watch(props, (p) => setIsError(!!p.error));
onMounted(() => setIsError(!!props.error));
</script>
