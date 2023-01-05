<template>
  <textarea
    v-model="textValue"
    :placeholder="placeholder"
    :name="name"
    :disabled="disabled"
    :rows="rows"
    :class="[
      textAreaStyle,
      textAreaVariantStyle[disabled ? 'disabled' : 'default'],
      expand && textAreaExpandStyle,
    ]"
  />
</template>

<script setup lang="ts">
import { ComponentName } from "@wizleap-inc/wiz-ui-constants";
import {
  textAreaStyle,
  textAreaVariantStyle,
  textAreaExpandStyle,
} from "@wizleap-inc/wiz-ui-styles/bases/text-area.css";
import { computed } from "vue";

defineOptions({
  name: ComponentName.TextArea,
});

interface Props {
  modelValue: string;
  name: string;
  placeholder?: string;
  disabled?: boolean;
  expand?: boolean;
  rows?: number;
}

const props = withDefaults(defineProps<Props>(), {
  rows: 3,
});

interface Emit {
  (e: "update:modelValue", value: string): void;
}

const emit = defineEmits<Emit>();

const textValue = computed({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value),
});
</script>
