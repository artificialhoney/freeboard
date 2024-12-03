<script setup lang="js">
import DialogBox from "./DialogBox.vue";

const { title, onClose, onOk } = defineProps({
  title: String,
  onClose: Function,
  onOk: Function,
});
</script>
<template>
  <DialogBox
    header="Confirm"
    ok="OK"
    cancel="Cancel"
    @close="onClose"
    @ok="onOk"
  >
    <p>Are you sure you want to delete this "{{ title }}"?</p>
  </DialogBox>
</template>
