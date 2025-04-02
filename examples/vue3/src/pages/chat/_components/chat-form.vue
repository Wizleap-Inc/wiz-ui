<template>
  <div
    :style="{
      borderTop: `${THEME.borderWidth.xs} solid #E2E8F0`,
      paddingTop: '10px',
      width: '100%',
    }"
  >
    <WizVStack width="100%" justify="end" gap="xs">
      <WizChatForm
        v-model="textValue"
        @submit="onSubmit"
        :placeholder="placeholder"
        :formRows="formRows"
      />
      <WizHStack v-if="status !== undefined && statusOptions !== undefined">
        <WizSelectBox
          :options="statusOptions"
          v-model="statusValue"
          :placeholder="statusPlaceholder"
          expand
        />
        <div
          :style="{
            width: THEME.spacing.xl4,
            flexShrink: 0,
          }"
        />
      </WizHStack>
      <WizText v-if="typingUsername" color="gray.600" as="p" fontSize="xs2">
        <WizText as="span" bold fontSize="xs2" color="gray.700">
          {{ typingUsername }}
        </WizText>
        さんが入力しています...
      </WizText>
    </WizVStack>
  </div>
</template>

<script setup lang="ts">
import { THEME } from "@wizleap-inc/wiz-ui-constants";
import {
  WizBox,
  WizChatForm,
  WizHStack,
  WizSelectBox,
  WizText,
  WizVStack,
} from "@wizleap-inc/wiz-ui-next";
import { SelectBoxOption } from "@wizleap-inc/wiz-ui-next/dist/components/base/inputs/search-selector/types";
import { PropType, computed, nextTick, onMounted, ref, watch } from "vue";

const props = defineProps({
  modelValue: {
    type: String,
    required: true,
  },
  placeholder: {
    type: String,
    required: false,
  },
  formRows: {
    type: Number,
    required: false,
  },
  typingUsername: {
    type: String,
    required: false,
  },
  status: {
    type: Number,
    required: false,
  },
  statusOptions: {
    type: Array as PropType<SelectBoxOption<number>[]>,
    required: false,
  },
  statusPlaceholder: {
    type: String,
    required: false,
  },
});

interface Emit {
  (e: "update:modelValue", value: string): void;
  (e: "submit"): void;
  (e: "toggleDisplay"): void;
  (e: "updateStatus", value: number): void;
}

const emits = defineEmits<Emit>();

const floatChatCardHeight = ref(0);
const floatChatCardRef = ref<InstanceType<typeof WizBox>>();
const chatListRef = ref<InstanceType<typeof WizVStack>>();

const updateFloatChatCardHeight = () => {
  if (floatChatCardRef.value) {
    floatChatCardHeight.value = floatChatCardRef.value.$el.clientHeight;
  }
};

onMounted(() => {
  updateFloatChatCardHeight();
  if (chatListRef.value) {
    chatListRef.value.$el.scrollTo(0, chatListRef.value.$el.scrollHeight);
  }
});

watch(props, () => {
  nextTick(updateFloatChatCardHeight);
});

const textValue = computed({
  get: () => props.modelValue,
  set: (value) => emits("update:modelValue", value),
});

const statusValue = computed({
  get: () => props.status || NaN,
  set: (value) => value && emits("updateStatus", value),
});

const onSubmit = () => emits("submit");
</script>
