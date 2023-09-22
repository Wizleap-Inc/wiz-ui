# Dialog

## Import

```ts
import { WizDialog } from "@wizleap-inc/wiz-ui";
```

## Usage

```vue
<WizTextButton @click="isOpen = true">Open Dialog</WizTextButton>
<WizDialog v-model="isOpen">
  <template #title> aaa </template>
  <template #content> Hello </template>
</WizDialog>
```

```ts
import { ref } from "vue";
const isOpen = ref(false);
```

<dialog-default />
