<template>
  <div :class="[passwordStyle]" :style="{ width: computedWidth }">
    <PrivateBaseInput
      :id="id"
      v-model="passwordValue"
      :placeholder="placeholder"
      :disabled="disabled"
      width="100%"
      :error="isError"
      :type="!disabled && isPasswordVisible ? 'text' : 'password'"
      :autocomplete="autocomplete"
      space-type="right"
      @focusin="onFocusIn"
      @focusout="onFocusOut"
    />
    <button
      type="button"
      :aria-label="ARIA_LABELS.PASSWORD_VISIBLE_TOGGLE"
      :class="passwordVisibleIconStyle"
      :disabled="disabled"
      @click="isPasswordVisible = !isPasswordVisible"
    >
      <WizIEye
        :class="
          !disabled && isPasswordVisible && passwordVisibleIconActiveStyle
        "
      />
    </button>
  </div>
</template>

<script setup lang="ts">
import {
  ARIA_LABELS,
  AutoCompleteKeys,
  ComponentName,
} from "@wizleap-inc/wiz-ui-constants";
import {
  passwordStyle,
  passwordVisibleIconActiveStyle,
  passwordVisibleIconStyle,
} from "@wizleap-inc/wiz-ui-styles/bases/password-input.css";
import { PropType, computed, inject, ref } from "vue";

import { WizIEye } from "@/components";
import { formControlKey } from "@/hooks/use-form-control-provider";

import { PrivateBaseInput } from "../base";

defineOptions({
  name: ComponentName.PasswordInput,
});

interface Emit {
  (e: "update:modelValue", value: string): void;
  (e: "focusin", value: FocusEvent): void;
  (e: "focusout", value: FocusEvent): void;
}

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
  },
  /**
   * @deprecated このプロパティは将来のバージョンで削除される予定です。代わりに `width="100%"` を使用してください。
   */
  expand: {
    type: Boolean,
    required: false,
  },
  width: {
    type: String,
    required: false,
    default: "10em",
  },
  autocomplete: {
    type: String as PropType<
      Extract<AutoCompleteKeys, "currentPassword" | "newPassword">
    >,
    required: false,
    default: "off",
  },
});

const emit = defineEmits<Emit>();

const isPasswordVisible = ref(false);

const passwordValue = computed({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value),
});

const computedWidth = computed(() => (props.expand ? "100%" : props.width));

// Form Control
const form = inject(formControlKey);
const isError = computed(() => (form ? form.isError.value : false));

const onFocusIn = (e: FocusEvent) => emit("focusin", e);

const onFocusOut = (e: FocusEvent) => emit("focusout", e);
</script>
