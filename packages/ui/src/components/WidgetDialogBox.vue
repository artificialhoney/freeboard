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

watch(typeRef, (newValue) => {
  if (!newValue) {
    fields.value = [];
    return;
  }
  const data = [...widgetPlugins.value[newValue].fields];

  fields.value = data;
});

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

const onDialogBoxOk = () => {
  onOk({ settings: form.value.getValue(), type: typeRef.value });
};

const hasErrors = computed(() => {
  return form.value?.hasErrors();
});
</script>

<template>
  <DialogBox
    :header="header"
    :okDisabled="hasErrors"
    ok="Save"
    cancel="Cancel"
    @close="onClose"
    @ok="() => onDialogBoxOk()"
  >
    <div class="form-row">
      <div class="form-label">
        <label class="control-label">Type</label>
      </div>
      <div class="form-value">
        <SelectFormElement v-model="typeRef" :options="widgetPluginsOptions" />
      </div>
    </div>
    <Form ref="form" :settings="settings" :fields="fields" v-if="typeRef" />
  </DialogBox>
</template>
