<script setup lang="js">
import DialogBox from "./DialogBox.vue";
import AuthProvidersList from "./AuthProvidersList.vue";

const { onClose } = defineProps({
  onClose: Function,
});
</script>

<template>
  <DialogBox
    header="Auth"
    :cancel="$t('dialogBox.buttonCancel')"
    @close="onClose"
  >
    <AuthProvidersList />
  </DialogBox>
</template>
