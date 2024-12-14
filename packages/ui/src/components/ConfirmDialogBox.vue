<script setup lang="js">
import { ref } from "vue";
import DialogBox from "./DialogBox.vue";

const dialog = ref(null);

const { title, onClose, onOk } = defineProps({
  title: String,
  onClose: Function,
  onOk: Function,
});

const onDialogBoxOk = () => {
  onOk();
  dialog.value.closeModal();
};
</script>
<template>
  <DialogBox
    header="Confirm"
    ok="OK"
    cancel="Cancel"
    @close="onClose"
    @ok="onDialogBoxOk"
    ref="dialog"
  >
    <p>Are you sure you want to delete this "{{ title }}"?</p>
  </DialogBox>
</template>
