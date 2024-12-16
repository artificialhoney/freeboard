<script setup lang="js">
import { computed, ref, watch } from "vue";
import DialogBox from "./DialogBox.vue";
import Form from "./Form.vue";
import SelectFormElement from "./SelectFormElement.vue";
import { useFreeboardStore } from "../stores/freeboard";
import { storeToRefs } from "pinia";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

const freeboardStore = useFreeboardStore();

const { datasourcePlugins } = storeToRefs(freeboardStore);

const { header, onClose, onOk, settings, type } = defineProps({
  header: String,
  onClose: Function,
  onOk: Function,
  settings: Object,
  type: String,
});

const form = ref(null);
const typeRef = ref(type);

const fields = ref([]);

watch(
  typeRef,
  (newValue) => {
    if (!newValue) {
      fields.value = [];
      return;
    }
    const data = [
      {
        name: "name",
        label: t("form.labelName"),
        type: "text",
        required: true,
      },
      ...freeboardStore.getDatasourcePluginFields(newValue),
    ];

    fields.value = data;
  },
  { immediate: true },
);

const datasourcePluginsOptions = computed(() => {
  return Object.keys(datasourcePlugins.value).map((key) => ({
    value: key,
    label: datasourcePlugins.value[key].label,
  }));
});

const dialog = ref(null);

const onDialogBoxOk = () => {
  if (form.value.hasErrors()) {
    return;
  }
  onOk({ settings: form.value.getValue(), type: typeRef.value });
  dialog.value.closeModal();
};
</script>

<template>
  <DialogBox
    class="datasource-dialog-box"
    :header="header"
    :ok="$t('dialogBox.buttonOk')"
    :cancel="$t('dialogBox.buttonCancel')"
    ref="dialog"
    @close="onClose"
    @ok="() => onDialogBoxOk()"
  >
    <div class="datasource-dialog-box__form__row">
      <div class="datasource-dialog-box__form__row__label">
        <label>{{ $t("datasourceDialogBox.labelType") }}</label>
      </div>
      <div class="datasource-dialog-box__form__row__value">
        <SelectFormElement
          v-model="typeRef"
          :options="datasourcePluginsOptions"
          :placeholder="$t('datasourceDialogBox.placeholderType')"
        />
      </div>
    </div>
    <Form ref="form" :settings="settings" :fields="fields" v-if="typeRef" />
  </DialogBox>
</template>

<style lang="css" scoped>
@import url("../assets/css/components/datasource-dialog-box.css");
</style>
