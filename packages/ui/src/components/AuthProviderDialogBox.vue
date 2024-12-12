<script setup lang="js">
import { computed, ref, watch } from "vue";
import DialogBox from "./DialogBox.vue";
import Form from "./Form.vue";
import SelectFormElement from "./SelectFormElement.vue";
import { useFreeboardStore } from "../stores/freeboard";
import { storeToRefs } from "pinia";

const freeboardStore = useFreeboardStore();

const { authPlugins } = storeToRefs(freeboardStore);

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
        label: "Name",
        type: "text",
        required: true,
      },
      ...freeboardStore.getAuthPluginFields(newValue),
    ];

    fields.value = data;
  },
  { immediate: true },
);

const authPluginsOptions = computed(() => {
  return Object.keys(authPlugins.value).map((key) => ({
    value: key,
    label: authPlugins.value[key].label,
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
    :header="header"
    ref="dialog"
    ok="Save"
    cancel="Cancel"
    @close="onClose"
    @ok="onDialogBoxOk"
  >
    <div class="form-row">
      <div class="form-label">
        <label class="control-label">Type</label>
      </div>
      <div class="form-value">
        <SelectFormElement
          v-model="typeRef"
          :options="authPluginsOptions"
          placeholder="Select an auth type..."
        />
      </div>
    </div>
    <Form ref="form" :settings="settings" :fields="fields" v-if="typeRef" />
  </DialogBox>
</template>
