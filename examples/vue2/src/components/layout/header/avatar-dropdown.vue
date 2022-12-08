<template>
  <WizDropdown v-model="isAvatarDropdownOpen" gap="sm" skeleton>
    <WizAvatar
      :src="AVATAR_SRC"
      :fallback="AVATAR_FALLBACK"
      @click="toggleAvatarDropdownOpen"
      clickable
    />
    <template #options>
      <WizDropdownItem @click="onDropdownItemClick('選択肢１')"
        >選択肢１</WizDropdownItem
      >
      <WizDropdownItem @click="onDropdownItemClick('選択肢２')"
        >選択肢２</WizDropdownItem
      >
      <WizDropdownItem @click="onDropdownItemClick('選択肢３')"
        >選択肢３</WizDropdownItem
      >
      <WizDropdownItem @click="onDropdownItemClick('ログアウト')"
        >ログアウト</WizDropdownItem
      >
    </template>
  </WizDropdown>
</template>

<script setup lang="ts">
import { WizDropdown, WizDropdownItem, WizAvatar } from "@wizleap-inc/wiz-ui";
import { ref } from "vue";

const isAvatarDropdownOpen = ref(false);
const toggleAvatarDropdownOpen = () => {
  isAvatarDropdownOpen.value = !isAvatarDropdownOpen.value;
};

const AVATAR_SRC = "https://avatars.githubusercontent.com/u/10214025?v=4";
const AVATAR_FALLBACK = "W";

const onDropdownItemClick = (label: string) => {
  console.log(label);
};
</script>
