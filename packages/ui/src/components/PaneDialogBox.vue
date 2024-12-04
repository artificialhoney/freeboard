<script setup lang="js">
import { ref } from "vue";
import DialogBox from "./DialogBox.vue";
import Form from "./Form.vue";

const form = ref(null);

const { header, onClose, onOk, definitions, settings } = defineProps({
  header: String,
  onClose: Function,
  onOk: Function,
  definitions: Object,
  settings: Object,
});
</script>

<template>
  <DialogBox
    :header="header"
    ok="Save"
    cancel="Cancel"
    @close="onClose"
    @ok="() => onOk(form.getValue())"
  >
    <Form ref="form" :settings="settings" :definitions="definitions" />
  </DialogBox>
</template>
