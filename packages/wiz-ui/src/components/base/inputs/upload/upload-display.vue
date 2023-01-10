<template>
  <WizVStack gap="sm">
    <div
      v-if="isUploading"
      :class="[uploadDisplayStyle, isUploaded ? uploadDisplayFadeOutStyle : '']"
    >
      <span>{{
        isUploaded
          ? "ファイルアップロード完了"
          : `ファイルアップロード中…（${completedFileCount}/${uploadingFileCount}）`
      }}</span>
      <WizHStack align="center" gap="xs">
        <span :class="uploadDisplayBarBgStyle">
          <span
            :class="uploadDisplayBarStyle"
            :style="{ width: `${progress}%` }"
          />
        </span>
        <components
          :class="[
            checkCircleIconStyle,
            isUploaded
              ? checkCircleIconCompletedStyle
              : checkCircleIconDefaultStyle,
          ]"
          :is="WizICheckCircle"
        ></components>
      </WizHStack>
    </div>
    <template v-if="fileList.length">
      <div
        :class="[
          uploadDisplayStyle,
          isApplyFadeIn(index) ? uploadDisplayFadeInStyle : '',
        ]"
        v-for="(file, index) in Array.from(fileList)"
      >
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
  uploadDisplayFadeInStyle,
  uploadDisplayFadeOutStyle,
  uploadDisplayBarBgStyle,
  uploadDisplayBarStyle,
  checkCircleIconStyle,
  checkCircleIconDefaultStyle,
  checkCircleIconCompletedStyle,
  attachFileIconStyle,
} from "@wizleap-inc/wiz-ui-styles/bases/upload-display.css";
import { computed } from "vue";

import { WizHStack, WizVStack } from "@/components";
import { WizICheckCircle, WizIAttachFile } from "@/components/icons";

defineOptions({
  name: ComponentName.UploadDisplay,
});

interface Props {
  fileList: File[];
  uploadingFileCount: number;
  completedFileCount: number;
  progress: number;
  isUploaded: boolean;
  isUploading: boolean;
}
const props = defineProps<Props>();

const isApplyFadeIn = computed(() => {
  return function (index: number) {
    const uploadedFileCount = props.fileList.length - props.uploadingFileCount;
    if (
      (props.uploadingFileCount === 1 && index === props.fileList.length - 1) ||
      props.fileList.length === props.uploadingFileCount ||
      index >= uploadedFileCount
    ) {
      return true;
    }
    return false;
  };
});
</script>
