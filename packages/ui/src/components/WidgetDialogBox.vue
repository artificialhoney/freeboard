<script setup lang="js">
import { computed, ref, watch } from "vue";
import DialogBox from "./DialogBox.vue";
import Form from "./Form.vue";
import SelectFormElement from "./SelectFormElement.vue";
import { useFreeboardStore } from "../stores/freeboard";
import { storeToRefs } from "pinia";

const freeboardStore = useFreeboardStore();

const { widgetPlugins } = storeToRefs(freeboardStore);

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
    const data = [...freeboardStore.getWidgetPluginFields(newValue)];

    fields.value = data;
  },
  { immediate: true },
);

const widgetPluginsOptions = computed(() => {
  return Object.keys(widgetPlugins.value).map((key) => ({
    value: key,
    label: widgetPlugins.value[key].label,
  }));
});

const { header, onClose, onOk, settings, type } = defineProps({
  header: String,
  onClose: Function,
  onOk: Function,
  settings: Object,
  type: String,
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
    :header="header"
    ref="dialog"
    :ok="$t('dialogBox.buttonOk')"
    :cancel="$t('dialogBox.buttonCancel')"
    @close="onClose"
    @ok="() => onDialogBoxOk()"
    class="widget-dialog-box"
  >
    <div class="widget-dialog-box__form__row">
      <div class="widget-dialog-box__form__row__label">
        <label>{{ $t("widgetDialogBox.labelType") }}</label>
      </div>
      <div class="widget-dialog-box__form__row__value">
        <SelectFormElement
          v-model="typeRef"
          :options="widgetPluginsOptions"
          :placeholder="$t('widgetDialogBox.placeholderType')"
        />
      </div>
    </div>
    <Form ref="form" :settings="settings" :fields="fields" v-if="typeRef" />
  </DialogBox>
</template>

<style lang="css" scoped>
@import url("../assets/css/components/widget-dialog-box.css");
</style>
