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
  <div class="textarea-form-element">
    <textarea
      ref="textarea"
      :disabled="props.disabled"
      @change="onChange($event.target.value)"
      class="textarea-form-element__textarea"
      >{{ props.modelValue }}</textarea
    >
    <ul class="textarea-form-element__board-toolbar">
      <li
        @click="() => openCodeEditor()"
        class="textarea-form-element__board-toolbar__item"
      >
        <i class="textarea-form-element__board-toolbar__item__icon"
          ><v-icon name="hi-variable"></v-icon></i
        ><label>CODE</label>
      </li>
    </ul>
  </div>
</template>

<style lang="css" scoped>
@import url("../assets/css/components/textarea-form-element.css");
</style>
