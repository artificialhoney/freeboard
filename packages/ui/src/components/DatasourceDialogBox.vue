<script setup lang="js">
import { computed, ref, watch } from "vue";
import DialogBox from "./DialogBox.vue";
import Form from "./Form.vue";
import SelectFormElement from "./SelectFormElement.vue";
import { useFreeboardStore } from "../stores/freeboard";
import { storeToRefs } from "pinia";

const freeboardStore = useFreeboardStore();

const { datasourceData } = storeToRefs(freeboardStore);

const form = ref(null);
const type = ref(undefined);

const fields = ref([]);

watch(type, (newValue) => {
  if (!newValue) {
    fields.value = [];
    return;
  }
  const data = [
    {
      name: "name",
      label: "Name",
      type: "text",
      required: true,
    },
    ...datasourceData.value[newValue].fields,
  ];

  fields.value = data;
});

const datasourceDataOptions = computed(() => {
  return Object.keys(datasourceData.value).map((key) => ({
    value: key,
    label: datasourceData.value[key].label,
  }));
});

const { header, onClose, onOk, settings } = defineProps({
  header: String,
  onClose: Function,
  onOk: Function,
  settings: Object,
});

const onDialogBoxOk = () => {
  onOk({ ...form.value.getValue(), type: type.value });
};

const hasErrors = computed(() => {
  return !!form.value?.hasErrors();
});
</script>

<template>
  <DialogBox
    :header="header"
    ok="Save"
    :okDisabled="hasErrors"
    cancel="Cancel"
    @close="onClose"
    @ok="() => onDialogBoxOk()"
  >
    <div class="form-row">
      <div class="form-label">
        <label class="control-label">Type</label>
      </div>
      <div class="form-value">
        <SelectFormElement v-model="type" :options="datasourceDataOptions" />
      </div>
    </div>
    <Form ref="form" :settings="settings" :fields="fields" v-if="type" />
  </DialogBox>
</template>
