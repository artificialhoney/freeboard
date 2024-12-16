<script setup lang="js">
import { computed, ref, watch } from "vue";
import DialogBox from "./DialogBox.vue";
import Form from "./Form.vue";
import { useFreeboardStore } from "../stores/freeboard";
import { storeToRefs } from "pinia";
import TabNavigator from "./TabNavigator.vue";
import createSettings from "../settings";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

const freeboardStore = useFreeboardStore();

const { dashboard } = storeToRefs(freeboardStore);

const components = ref({});

const storeComponentRef = (name, el) => {
  components.value[name] = el;
};

const { onClose, onOk } = defineProps({
  onClose: Function,
  onOk: Function,
});

const fields = computed(() => {
  return createSettings(dashboard.value, t);
});

const dialog = ref(null);

const onDialogBoxOk = () => {
  if (fields.value.some((f) => components.value[f.name].hasErrors())) {
    return;
  }
  const s = {};
  const result = {};
  fields.value.forEach((f) => {
    const v = components.value[f.name].getValue();
    Object.keys(v).forEach((k) => {
      if (f.name === "general") {
        result[k] = v[k];
      } else {
        s[k] = v[k];
      }
    });
  });
  onOk({ ...result, settings: s });
  dialog.value.closeModal();
};
</script>

<template>
  <DialogBox
    :header="$t('dialogBox.titleSettings')"
    ref="dialog"
    :ok="$t('dialogBox.buttonOk')"
    :cancel="$t('dialogBox.buttonCancel')"
    @close="onClose"
    @ok="onDialogBoxOk"
  >
    <TabNavigator :fields="fields">
      <Form
        :ref="(el) => storeComponentRef(field.name, el)"
        :settings="field.settings"
        :fields="field.fields"
        v-for="field in fields"
      />
    </TabNavigator>
  </DialogBox>
</template>
