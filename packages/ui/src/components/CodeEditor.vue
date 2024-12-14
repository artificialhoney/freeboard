<script setup lang="js">
import { VueMonacoEditor } from "@guolao/vue-monaco-editor";
import { ref, shallowRef } from "vue";
import TextButton from "./TextButton.vue";

const { value, onOk } = defineProps({
  value: String,
  onClose: Function,
});

const MONACO_EDITOR_OPTIONS = {
  automaticLayout: true,
  formatOnType: true,
  formatOnPaste: true,
};

const code = ref(value);
const editor = shallowRef();
const handleMount = (editorInstance) => (editor.value = editorInstance);
</script>
<template>
  <div class="code-editor">
    <div class="code-editor__header">
      This javascript will be re-evaluated any time a datasource referenced here
      is updated, and the value you
      <code><span>return</span></code> will be displayed in the widget. You can
      assume this javascript is wrapped in a function of the form
      <code><span>function</span>(<span>datasources</span>)</code>
      where datasources is a collection of javascript objects (keyed by their
      name) corresponding to the most current data in a datasource.
    </div>
    <div class="code-editor__content">
      <vue-monaco-editor
        v-model:value="code"
        theme="vs-dark"
        :options="MONACO_EDITOR_OPTIONS"
        language="javascript"
        @mount="handleMount"
      />
    </div>
    <div class="code-editor__footer">
      <TextButton @click="onClose(code)"> Close </TextButton>
    </div>
  </div>
</template>

<style lang="css" scoped>
@import url("../assets/css/components/code-editor.css");
</style>
