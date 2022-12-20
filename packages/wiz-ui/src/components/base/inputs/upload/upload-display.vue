<template>
  <WizVStack gap="sm">
    <div
      v-if="isUploading"
      :class="[
        uploadDisplayStyle,
        uploadStatus ? uploadDisplayFadeOutStyle : '',
      ]"
    >
      <span>{{
        uploadStatus
          ? "ファイルアップロード完了"
          : `ファイルアップロード中…（1/${fileList.length}）`
      }}</span>
      <WizHStack align="center" gap="xs">
        <span :class="uploadDisplayBarBgStyle" />
        <span v-if="isUploading" :class="uploadDisplayBarStyle" />
        <components
          :class="[
            checkCircleIconStyle,
            uploadStatus
              ? checkCircleIconDoneStyle
              : checkCircleIconDefaultStyle,
          ]"
          :is="WizICheckCircle"
        ></components>
      </WizHStack>
    </div>
    <template v-if="uploadStatus">
      <div :class="uploadDisplayStyle" v-for="file in fileList">
        <WizHStack align="center" gap="xs2">
          <components
            :class="attachFileIconStyle"
            :is="WizIAttachFile"
          ></components>
          <span>{{ file.name }}</span>
        </WizHStack>
      </div>
    </template>
  </WizVStack>
</template>

<script setup lang="ts">
import { ComponentName } from "@wizleap-inc/wiz-ui-constants";
import {
  uploadDisplayStyle,
  uploadDisplayFadeOutStyle,
  uploadDisplayBarBgStyle,
  uploadDisplayBarStyle,
  checkCircleIconStyle,
  checkCircleIconDefaultStyle,
  checkCircleIconDoneStyle,
  attachFileIconStyle,
} from "@wizleap-inc/wiz-ui-styles/bases/upload-display.css";
import { ref, watch } from "vue";

import { WizICheckCircle, WizIAttachFile } from "@/components/icons";

import { WizHStack, WizVStack } from "../../stack";

defineOptions({
  name: ComponentName.UploadDisplay,
});
interface Props {
  fileList: any;
}

const props = withDefaults(defineProps<Props>(), {});

const isUploading = ref(false);
const uploadStatus = ref(false);

watch(props, () => {
  isUploading.value = true;
  setTimeout(() => {
    uploadStatus.value = true;
    setTimeout(() => {
      isUploading.value = false;
    }, 500);
  }, 2000);
  console.log("props", props);
});
</script>
