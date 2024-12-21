<script setup lang="js">
import { VueMonacoEditor } from "@guolao/vue-monaco-editor";
import { onMounted, ref, shallowRef, watch } from "vue";
import { useFreeboardStore } from "../stores/freeboard";
import { storeToRefs } from "pinia";

const props = defineProps(["modelValue", "validators", "language"]);
const emit = defineEmits(["update:modelValue"]);

const freeboardStore = useFreeboardStore();
const { dashboard } = storeToRefs(freeboardStore);

const errors = ref([]);

const MONACO_EDITOR_OPTIONS = {
  automaticLayout: true,
  formatOnType: true,
  formatOnPaste: true,
};

const code = ref(props.modelValue);
const editor = shallowRef();
const handleMount = (editorInstance) => {
  editor.value = editorInstance;
  code.value = props.modelValue;
}

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
    class="code-editor-form-element"
    v-model:value="code"
    :theme="`vs-${dashboard.settings.theme === 'dark' ? 'dark' : 'light'}`"
    :options="MONACO_EDITOR_OPTIONS"
    :language="typeof props.language === 'Function' ? props.language() : props.language"
    @mount="handleMount"
  />
</template>

<style lang="css" scoped>
@import url("../assets/css/components/code-editor-form-element.css");
</style>
