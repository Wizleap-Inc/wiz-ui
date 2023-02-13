<template>
  <WizVStack gap="xl3">
    <label
      :class="[uploadStyle, isEnter ? uploadEnterStyle : '']"
      @dragenter="dragEnter"
      @dragleave="dragLeave"
      @dragover.prevent
      @drop.prevent="dropFile"
      v-if="(!multiple && !isUploaded) || multiple"
      ><input
        :class="uploadInputStyle"
        @change="selectFile"
        type="file"
        :multiple="multiple"
      />こちらにドラック＆ドロップしてファイルをアップロード</label
    >
    <WizUploadDisplay
      :progress="progress"
      :completedFileCount="completedFileCount"
      :fileList="fileList"
      :isUploaded="isUploaded"
      :isUploading="isUploading"
      :uploadingFileCount="uploadingFileCount"
    ></WizUploadDisplay>
  </WizVStack>
</template>

<script setup lang="ts">
import { ComponentName } from "@wizleap-inc/wiz-ui-constants";
import {
  uploadStyle,
  uploadInputStyle,
  uploadEnterStyle,
} from "@wizleap-inc/wiz-ui-styles/bases/upload.css";
import { ref, computed, PropType } from "vue";

import { WizVStack } from "@/components";

import WizUploadDisplay from "./upload-display.vue";

defineOptions({
  name: ComponentName.UploadInput,
});

const props = defineProps({
  /**
   * @example xhrLauncher: () => new XMLHttpRequest()
   * */
  xhrLauncher: {
    type: Function as PropType<() => XMLHttpRequest>,
    required: true,
  },
  multiple: {
    type: Boolean,
    required: false,
    default: false,
  },
});

const isEnter = ref(false);
const isUploading = ref(false);
const isUploaded = ref(false);
const uploadingFileCount = ref(0);
const completedFileCount = ref(0);
const fileList = ref<File[]>([]);
const progressPercentages = ref<number[]>([0]);
const progress = computed(() => {
  const total = progressPercentages.value.reduce((p, c) => p + c, 0);
  return total / progressPercentages.value.length;
});

const dragEnter = () => {
  isEnter.value = true;
};

const dragLeave = () => {
  isEnter.value = false;
};

const uploadFile = (
  file: File,
  onProgress: (progress: number) => void,
  onComplete: () => void
) => {
  const formData = new FormData();
  formData.append("file", file);
  const xhr = props.xhrLauncher();
  xhr.addEventListener("progress", (event) => {
    if (event.lengthComputable) {
      onProgress(Math.round((event.loaded / event.total) * 100));
    }
  });
  xhr.addEventListener("load", () => {
    if (xhr.status === 200) {
      onComplete();
    }
  });
  xhr.send(formData);
};

const uploadFileList = async (fileList: FileList) => {
  isUploaded.value = false;
  isUploading.value = true;
  uploadingFileCount.value = fileList.length;

  const fileArray = Array.from(fileList);
  fileArray.forEach((file, i) => {
    uploadFile(
      file,
      (p) => {
        progressPercentages.value.splice(i, 1, p);
      },
      () => {
        completedFileCount.value += 1;
        if (completedFileCount.value === fileList.length) {
          isUploaded.value = true;
          setTimeout(() => {
            isUploading.value = false;
            completedFileCount.value = 0;
          }, 500);
        }
      }
    );
  });
};

const dropFile = (event: DragEvent) => {
  isEnter.value = false;

  if (!event || !event.dataTransfer) {
    return;
  }

  if (fileList.value && fileList.value.length) {
    Array.from(event.dataTransfer.files).forEach((file) => {
      fileList.value.push(file);
    });
  } else {
    fileList.value = Array.from(event.dataTransfer.files);
  }

  uploadFileList(event.dataTransfer.files);
};

const selectFile = (event: Event) => {
  if (!event || !event.target) {
    return;
  }

  if (
    event.target instanceof HTMLInputElement &&
    event.target.files &&
    event.target.files.length
  ) {
    if (fileList.value && fileList.value.length) {
      Array.from(event.target.files).forEach((file) => {
        fileList.value.push(file);
      });
    } else {
      fileList.value = Array.from(event.target.files);
    }

    uploadFileList(event.target.files);
  }
};
</script>
