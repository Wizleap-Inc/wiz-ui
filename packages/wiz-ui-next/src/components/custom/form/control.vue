<template>
  <WizVStack
    nowrap
    :style="{
      paddingBottom: error === undefined ? THEME.fontSize.sm : undefined,
    }"
  >
    <WizStack
      :direction="direction"
      :align="direction === 'horizontal' ? 'center' : undefined"
      :wrap="false"
    >
      <WizHStack
        :width="labelWidth"
        align="center"
        :reverse="labelTagPosition === 'left'"
        :justify="labelTagPosition === 'left' ? 'end' : 'start'"
        gap="xs"
        my="xs2"
        :class="[
          borderLeft && [borderLeftStyle, borderColorStyle[borderColor]],
        ]"
      >
        <WizText
          as="label"
          :htmlFor="htmlFor"
          :color="labelColor"
          :font-size="labelFontSize"
          :bold="borderLeft"
          :class="[borderLeft && borderLeftTextStyle]"
        >
          {{ label }}
        </WizText>
        <WizTag font-size="xs2" label="必須" v-if="required" />
      </WizHStack>
      <slot />
    </WizStack>
    <WizText
      font-size="xs2"
      line-height="sm"
      color="red.800"
      :style="{ marginInlineStart: errorLeft }"
    >
      {{ error }}
    </WizText>
  </WizVStack>
</template>

<script setup lang="ts">
import { ColorKeys, THEME } from "@wizleap-inc/wiz-ui-constants";
import { borderColorStyle } from "@wizleap-inc/wiz-ui-styles/commons/border-color.css";
import {
  borderLeftStyle,
  borderLeftTextStyle,
} from "@wizleap-inc/wiz-ui-styles/customs/form-control.css";
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
  borderLeft: {
    type: Boolean,
    default: false,
  },
  borderColor: {
    type: String as PropType<ColorKeys>,
    default: "green.800",
  },
  labelTagPosition: {
    type: String as PropType<"left" | "right">,
    required: false,
  },
});

// Form Group
const fromGroup = inject(formGroupKey);
const labelWidth = computed(() => fromGroup?.labelWidth.value || "8rem");
const labelColor = computed(() => fromGroup?.labelColor.value || "gray.900");
const labelFontSize = computed(() => fromGroup?.labelFontSize.value || "md");
const labelTagPosition = computed(
  () => props.labelTagPosition || fromGroup?.labelTagPosition.value || "right"
);

const errorLeft = computed(() =>
  props.direction === "horizontal" ? labelWidth.value : "0"
);

// Form Control
const provider = useFormControlProvider();
provide(formControlKey, provider);
const { setIsError } = provider;
watch(props, (p) => setIsError(!!p.error));
onMounted(() => setIsError(!!props.error));
</script>
