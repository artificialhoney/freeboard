<script setup lang="js">
import { getCurrentInstance, ref } from "vue";
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
  freeboardStore.createComponent(CodeEditor, instance.appContext, {
    value: textarea.value.value,
    onClose: (value) => {
      textarea.value.value = value;
      onChange(value);
    },
  });
};

const instance = getCurrentInstance();

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
      <li @click="() => openCodeEditor()">
        <i class="icon-white"><v-icon name="hi-variable"></v-icon></i
        ><label>CODE</label>
      </li>
    </ul>
  </div>
</template>
