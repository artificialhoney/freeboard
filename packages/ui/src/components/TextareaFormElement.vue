<script setup lang="js">
import { getCurrentInstance, ref } from "vue";
import { useFreeboardStore } from "../stores/freeboard";
import CodeEditor from "./CodeEditor.vue";

const freeboardStore = useFreeboardStore();

const props = defineProps(["modelValue", "disabled"]);
const emit = defineEmits(["update:modelValue"]);

const errors = ref([]);
const textarea = ref(null);

const onChange = (value) => {
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
      :disabled="props.disabled"
      @change="onChange($event.target.value)"
      class="calculated-value-input"
      >{{ props.modelValue }}</textarea
    >
    <ul class="board-toolbar datasource-input-suffix">
      <li @click="() => openCodeEditor()">
        <i class="icon-white"><v-icon name="hi-variable"></v-icon></i
        ><label>CODE</label>
      </li>
    </ul>
  </div>
</template>
