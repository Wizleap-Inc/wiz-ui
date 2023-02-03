<template>
  <div :class="[textInputStyle, textInputExpandStyle[computedExpand]]">
    <component :class="textInputIconStyle" :is="icon" />
    <PrivateBaseInput
      v-model="textValue"
      :id="id"
      :placeholder="placeholder"
      :disabled="disabled"
      :expand="expand"
      :width="width"
      :error="isError"
      type="text"
      :space-type="icon ? 'left' : 'none'"
    />
  </div>
</template>

<script setup lang="ts">
import { ComponentName } from "@wizleap-inc/wiz-ui-constants";
import {
  textInputStyle,
  textInputExpandStyle,
  textInputIconStyle,
} from "@wizleap-inc/wiz-ui-styles/bases/text-input.css";
import { computed, inject, PropType } from "vue";

import { TIcon } from "@/components/icons";
import { formControlKey } from "@/hooks/use-form-control-provider";

import { PrivateBaseInput } from "../base";

defineOptions({
  name: ComponentName.TextInput,
});

const props = defineProps({
  id: {
    type: String,
    required: false,
  },
  value: {
    type: String,
    required: true,
  },
  placeholder: {
    type: String,
    required: false,
  },
  disabled: {
    type: Boolean,
    required: false,
    default: false,
  },
  width: {
    type: String,
    required: false,
  },
  expand: {
    type: Boolean,
    required: false,
  },
  icon: {
    type: Object as PropType<TIcon>,
    required: false,
  },
});

interface Emit {
  (e: "input", value: string): void;
}

const emit = defineEmits<Emit>();

const textValue = computed({
  get: () => props.value,
  set: (value) => emit("input", value),
});

// Form Control
const form = inject(formControlKey);
const isError = computed(() => (form ? form.isError.value : false));

const computedExpand = computed(() => (props.expand ? "expand" : "default"));
</script>
