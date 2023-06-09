<template>
  <WizVStack :gap="gap">
    <slot />
  </WizVStack>
</template>

<script setup lang="ts">
import {
  ColorKeys,
  FontSizeKeys,
  SpacingKeys,
} from "@wizleap-inc/wiz-ui-constants";
import { onMounted, provide, watch, PropType } from "vue";

import { WizVStack } from "@/components/base";
import {
  formGroupKey,
  useFormGroupProvider,
} from "@/hooks/use-form-group-provider";

const props = defineProps({
  labelWidth: {
    type: String,
    required: false,
  },
  gap: {
    type: String as PropType<SpacingKeys>,
    required: false,
  },
  labelColor: {
    type: String as PropType<ColorKeys>,
    required: false,
  },
  labelFontSize: {
    type: String as PropType<FontSizeKeys>,
    required: false,
  },
});

// Form Group
const provider = useFormGroupProvider();
provide(formGroupKey, provider);
const { setLabelWidth, setLabelColor, setLabelFontSize } = provider;
watch(props, (p) => p.labelWidth && setLabelWidth(p.labelWidth));
onMounted(() => props.labelWidth && setLabelWidth(props.labelWidth));
watch(props, (p) => p.labelColor && setLabelColor(p.labelColor));
onMounted(() => props.labelColor && setLabelColor(props.labelColor));
watch(props, (p) => p.labelFontSize && setLabelFontSize(p.labelFontSize));
onMounted(() => props.labelFontSize && setLabelFontSize(props.labelFontSize));
</script>
