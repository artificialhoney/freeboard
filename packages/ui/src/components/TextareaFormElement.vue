<script setup lang="js">
import { ref } from "vue";
import { useFreeboardStore } from "../stores/freeboard";
import CodeEditor from "./CodeEditor.vue";

const freeboardStore = useFreeboardStore();

const props = defineProps(["modelValue", "validators"]);
const emit = defineEmits(["update:modelValue"]);

const errors = ref([]);
const textarea = ref(null);

const onChange = (value) => {
  const e = [];
  props.validators?.forEach((validator) => {
    const result = validator(value);
    if (result.error) {
      e.push(result.error);
    }
  });
  errors.value = e;
  emit("update:modelValue", value);
};

const openCodeEditor = () => {
  freeboardStore.createComponent(CodeEditor, {
    value: textarea.value.value,
    onClose: (value) => {
      textarea.value.value = value;
      onChange(value);
    },
  });
};

defineExpose({
  errors,
});
</script>
<template>
  <div class="calculated-value">
    <textarea
      ref="textarea"
      @change="onChange($event.target.value)"
      class="calculated-value-input"
      >{{ modelValue }}</textarea
    >
    <ul class="board-toolbar datasource-input-suffix">
      <li @click="textarea.value = 'datasources['">
        <i class="icon-plus icon-white"></i><label>DATASOURCE</label>
      </li>
      <li @click="() => openCodeEditor()">
        <i class="icon-fullscreen icon-white"></i><label>.JS EDITOR</label>
      </li>
    </ul>
  </div>
</template>
