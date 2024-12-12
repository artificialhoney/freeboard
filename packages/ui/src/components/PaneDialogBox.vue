<script setup lang="js">
import { computed, onMounted, ref } from "vue";
import DialogBox from "./DialogBox.vue";
import Form from "./Form.vue";

const form = ref(null);
const fields = ref([]);

const { header, onClose, onOk, settings } = defineProps({
  header: String,
  onClose: Function,
  onOk: Function,
  settings: Object,
});

onMounted(() => {
  const data = [
    {
      name: "name",
      label: "Name",
      type: "text",
    },
  ];

  fields.value = data;
});

const dialog = ref(null);

const onDialogBoxOk = () => {
  if (form.value.hasErrors()) {
    return;
  }
  onOk({ settings: form.value.getValue() });
  dialog.value.closeModal();
};
</script>

<template>
  <DialogBox
    :header="header"
    ref="dialog"
    ok="Save"
    cancel="Cancel"
    @close="onClose"
    @ok="() => onDialogBoxOk()"
  >
    <Form ref="form" :settings="settings" :fields="fields" />
  </DialogBox>
</template>
