<template>
  <WizVStack :gap="gap">
    <slot />
  </WizVStack>
</template>

<script setup lang="ts">
import { SpacingKeys } from "@wizleap-inc/wiz-ui-constants";
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
});

// Form Group
const provider = useFormGroupProvider();
provide(formGroupKey, provider);
const { setLabelWidth } = provider;
watch(props, (p) => p.labelWidth && setLabelWidth(p.labelWidth));
onMounted(() => props.labelWidth && setLabelWidth(props.labelWidth));
</script>
