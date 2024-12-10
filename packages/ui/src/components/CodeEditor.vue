<script setup lang="js">
import { VueMonacoEditor } from "@guolao/vue-monaco-editor";
import { ref, shallowRef } from "vue";

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
  <div class="code-window">
    <div class="code-window-header cm-s-ambiance">
      This javascript will be re-evaluated any time a datasource referenced here
      is updated, and the value you
      <code><span class="cm-keyword">return</span></code> will be displayed in
      the widget. You can assume this javascript is wrapped in a function of the
      form
      <code
        ><span class="cm-keyword">function</span>(<span class="cm-def"
          >datasources</span
        >)</code
      >
      where datasources is a collection of javascript objects (keyed by their
      name) corresponding to the most current data in a datasource.
    </div>
    <div class="code-mirror-wrapper">
      <vue-monaco-editor
        v-model:value="code"
        theme="vs-dark"
        :options="MONACO_EDITOR_OPTIONS"
        language="javascript"
        @mount="handleMount"
      />
    </div>
    <div class="code-window-footer">
      <button
        type="button"
        class="dialog-cancel text-button"
        @click="onClose(code)"
      >
        Close
      </button>
    </div>
  </div>
</template>
