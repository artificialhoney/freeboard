<script setup lang="js">
import { ref } from "vue";
import DialogBox from "./DialogBox.vue";

const { header, onClose, onOk, definitions, settings } = defineProps({
  header: String,
  onClose: Function,
  onOk: Function,
  definitions: Object,
  settings: Object,
});

const form = ref(null);
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
