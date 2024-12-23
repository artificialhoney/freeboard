<script setup lang="js">
import { VueMonacoEditor } from "@guolao/vue-monaco-editor";
import { onMounted, reactive, ref, shallowRef } from "vue";

const props = defineProps(["modelValue", "language"]);
const emit = defineEmits(["update:modelValue"]);

const errors = ref([]);

const MONACO_EDITOR_OPTIONS = {
  automaticLayout: true,
  formatOnType: true,
  formatOnPaste: true,
};

const p = reactive({...props})
const editor = shallowRef();
const handleMount = (editorInstance) => {
  editor.value = editorInstance;
}

const onChange = () => {
  emit("update:modelValue", code.value);
};

const code = ref(p.modelValue)

defineExpose({
  errors,
});
</script>

<template>
  <vue-monaco-editor
    class="code-editor-form-element"
    v-model:value="code"
    theme="vs-dark"
    :options="MONACO_EDITOR_OPTIONS"
    :language="typeof props.language === 'Function' ? props.language() : props.language"
    @change="onChange"
    @mount="handleMount"
  />
</template>

<style lang="css" scoped>
@import url("../assets/css/components/code-editor-form-element.css");
</style>
