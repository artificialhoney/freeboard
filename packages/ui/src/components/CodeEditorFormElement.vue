<script setup lang="js">
import { VueMonacoEditor } from "@guolao/vue-monaco-editor";
import { ref, shallowRef, watch } from "vue";

const props = defineProps(["modelValue", "validators", "language"]);
const emit = defineEmits(["update:modelValue"]);

const errors = ref([]);

const MONACO_EDITOR_OPTIONS = {
  automaticLayout: true,
  formatOnType: true,
  formatOnPaste: true,
};

const code = ref(props.modelValue);
const editor = shallowRef();
const handleMount = (editorInstance) => (editor.value = editorInstance);

watch(code, (value) => onChange(value));

const onChange = (value) => {
  emit("update:modelValue", value);
};

defineExpose({
  errors,
});
</script>

<template>
  <vue-monaco-editor
    class="monaco-editor"
    v-model:value="code"
    theme="vs-dark"
    :options="MONACO_EDITOR_OPTIONS"
    :language="props.language"
    @mount="handleMount"
  />
</template>
