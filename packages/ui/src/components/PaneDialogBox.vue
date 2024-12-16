<script setup lang="js">
import { computed, onMounted, ref } from "vue";
import DialogBox from "./DialogBox.vue";
import Form from "./Form.vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

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
      label: t("form.labelName"),
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
    :ok="$t('dialogBox.buttonOk')"
    :cancel="$t('dialogBox.buttonCancel')"
    @close="onClose"
    @ok="() => onDialogBoxOk()"
  >
    <Form ref="form" :settings="settings" :fields="fields" />
  </DialogBox>
</template>
