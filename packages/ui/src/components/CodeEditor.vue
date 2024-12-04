<script setup lang="js">
import { basicSetup, EditorView } from "codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { onMounted, ref } from "vue";

const { value, onOk } = defineProps({
  value: String,
  onClose: Function,
});

const codemirror = ref(null);
let codemirrorEditor;

onMounted(() => {
  codemirrorEditor = new EditorView({
    doc: value,
    theme: "ambiance",
    extensions: [basicSetup, javascript()],
    parent: codemirror.value,
  });
});
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
    <div ref="codemirror" class="code-mirror-wrapper"></div>
    <div class="code-window-footer">
      <button
        id="dialog-cancel"
        class="text-button"
        @click="onClose(codemirrorEditor.state.doc.toString())"
      >
        Close
      </button>
    </div>
  </div>
</template>
