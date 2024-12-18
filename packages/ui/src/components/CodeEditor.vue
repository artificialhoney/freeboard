<script setup lang="js">
import { VueMonacoEditor } from "@guolao/vue-monaco-editor";
import { ref, shallowRef } from "vue";
import TextButton from "./TextButton.vue";
import { storeToRefs } from "pinia";
import { useFreeboardStore } from "../stores/freeboard";
import { useI18n } from "vue-i18n";

const { t } = useI18n();
const freeboardStore = useFreeboardStore();
const { dashboard } = storeToRefs(freeboardStore);

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
const desc = t("codeEditor.descriptionHeader");
</script>
<template>
  <div class="code-editor">
    <div class="code-editor__header" v-html="desc"></div>
    <div class="code-editor__content">
      <vue-monaco-editor
        v-model:value="code"
        :theme="`vs-${dashboard.settings.theme === 'dark' ? 'dark' : 'light'}`"
        :options="MONACO_EDITOR_OPTIONS"
        language="javascript"
        @mount="handleMount"
      />
    </div>
    <div class="code-editor__footer">
      <TextButton @click="onClose(code)">{{
        $t("codeEditor.buttonClose")
      }}</TextButton>
    </div>
  </div>
</template>

<style lang="css" scoped>
@import url("../assets/css/components/code-editor.css");
</style>
