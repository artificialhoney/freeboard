<script setup lang="js">
import DatasourceForm from "./DatasourceForm.vue";
import DialogBox from "./DialogBox.vue";

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
    <DatasourceForm />
  </DialogBox>
</template>
