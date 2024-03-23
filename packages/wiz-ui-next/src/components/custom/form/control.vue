<template>
  <WizStack
    :direction="direction"
    align="center"
    :style="{
      paddingBottom: `calc(${THEME.spacing.xs} + ${THEME.fontSize.sm})`,
    }"
  >
    <WizHStack :width="labelWidth" align="center" gap="xs2" py="xs2">
      <WizText
        as="label"
        :htmlFor="htmlFor"
        :color="labelColor"
        :font-size="labelFontSize"
      >
        {{ label }}
      </WizText>
      <WizTag font-size="xs2" label="必須" v-if="required" />
    </WizHStack>
    <WizVStack position="relative">
      <slot />
      <WizText
        font-size="xs2"
        line-height="sm"
        color="red.800"
        :style="{
          position: 'absolute',
          bottom: '0',
          transform: 'translateY(100%)',
        }"
      >
        <div :style="{ padding: `${THEME.spacing.xs2} 0` }">
          {{ error }}
        </div>
      </WizText>
    </WizVStack>
  </WizStack>
</template>

<script setup lang="ts">
import { THEME } from "@wizleap-inc/wiz-ui-constants";
import { PropType, computed, inject, onMounted, provide, watch } from "vue";

import {
  WizHStack,
  WizStack,
  WizTag,
  WizText,
  WizVStack,
} from "@/components/base";
import {
  formControlKey,
  useFormControlProvider,
} from "@/hooks/use-form-control-provider";
import { formGroupKey } from "@/hooks/use-form-group-provider";

const props = defineProps({
  htmlFor: {
    type: String,
    required: false,
  },
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
  direction: {
    type: String as PropType<"horizontal" | "vertical">,
    default: "horizontal",
  },
});

// Form Group
const fromGroup = inject(formGroupKey);
const labelWidth = computed(() => fromGroup?.labelWidth.value || "8rem");
const labelColor = computed(() => fromGroup?.labelColor.value || "gray.900");
const labelFontSize = computed(() => fromGroup?.labelFontSize.value || "md");

// Form Control
const provider = useFormControlProvider();
provide(formControlKey, provider);
const { setIsError } = provider;
watch(props, (p) => setIsError(!!p.error));
onMounted(() => setIsError(!!props.error));
</script>
