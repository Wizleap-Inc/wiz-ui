<template>
  <div>
    <WizVStack gap="xl3">
      <label
        :class="[uploadStyle, isEnter ? uploadEnterStyle : '']"
        @dragenter="dragEnter"
        @dragleave="dragLeave"
        @dragover.prevent
        @drop.prevent="dropFile"
        ><input
          :class="uploadInputStyle"
          type="file"
          accept="image/*"
        />こちらにドラック＆ドロップしてファイルをアップロード</label
      >
      <WizUploadDisplay :fileList="fileList"></WizUploadDisplay>
    </WizVStack>
  </div>
</template>

<script setup lang="ts">
import { ComponentName } from "@wizleap-inc/wiz-ui-constants";
import {
  uploadStyle,
  uploadInputStyle,
  uploadEnterStyle,
} from "@wizleap-inc/wiz-ui-styles/bases/upload.css";
import { ref } from "vue";

import { WizVStack } from "../../stack";

import WizUploadDisplay from "./upload-display.vue";

defineOptions({
  name: ComponentName.UploadInput,
});
const isEnter = ref(false);
const fileList = ref();
const dragEnter = () => {
  isEnter.value = true;
};
const dragLeave = () => {
  isEnter.value = false;
};
const dropFile = (event: DragEvent) => {
  isEnter.value = false;

  if (!event) {
    return;
  }
  if (!event.dataTransfer) {
    return;
  }

  fileList.value = event.dataTransfer.files;
};
</script>
