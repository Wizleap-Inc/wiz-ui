<template>
  <div :class="[textInputStyle]" :style="{ width: computedWidth }">
    <component :class="textInputIconStyle" :is="icon" />
    <PrivateBaseInput
      v-model="textValue"
      :id="id"
      :placeholder="placeholder"
      :disabled="disabled"
      :expand="expand"
      width="100%"
      :error="isError"
      type="text"
      :space-type="icon ? 'left' : 'none'"
      :autocomplete="autocomplete"
      @focusin="onFocusIn"
      @focusout="onFocusOut"
    />
  </div>
</template>

<script setup lang="ts">
import { AutoCompleteKeys, ComponentName } from "@wizleap-inc/wiz-ui-constants";
import {
  textInputStyle,
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
  modelValue: {
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
    default: "fit-content",
  },
  /**
   * @deprecated このプロパティは将来のバージョンで削除される予定です。代わりに `width="100%"` を使用してください。
   */
  expand: {
    type: Boolean,
    required: false,
  },
  icon: {
    type: Object as PropType<TIcon>,
    required: false,
  },
  autocomplete: {
    type: String as PropType<AutoCompleteKeys>,
    required: false,
    default: "off",
  },
});
interface Emit {
  (e: "update:modelValue", value: string): void;
  (e: "focusin", value: FocusEvent): void;
  (e: "focusout", value: FocusEvent): void;
}

const emit = defineEmits<Emit>();

const textValue = computed({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value),
});

// Form Control
const form = inject(formControlKey);
const isError = computed(() => (form ? form.isError.value : false));

const computedWidth = computed(() =>
  props.expand ? "100%" : props.width || "fit-content"
);

const onFocusIn = (e: FocusEvent) => emit("focusin", e);
const onFocusOut = (e: FocusEvent) => emit("focusout", e);
</script>
