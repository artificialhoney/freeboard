<script setup lang="js">
import DialogBox from "./DialogBox.vue";
import WidgetForm from "./WidgetForm.vue";

const { header, onClose, onOk } = defineProps({
  header: String,
  onClose: Function,
  onOk: Function,
});
</script>

<template>
  <DialogBox
    :header="header"
    ok="Save"
    cancel="Cancel"
    @close="onClose"
    @ok="onOk"
  >
    <WidgetForm />
  </DialogBox>
</template>
