<script setup lang="js">
import { ref } from "vue";

const props = defineProps(["modelValue", "options", "placeholder", "disabled"]);
const emit = defineEmits(["update:modelValue"]);

const errors = ref([]);

const onInput = (value) => {
  emit("update:modelValue", value);
};

defineExpose({
  errors,
});
</script>
<template>
  <div class="styled-select">
    <select @change="onInput($event.target.value)" :disabled="props.disabled">
      <option value="" :selected="modelValue === ''" v-if="placeholder">
        {{ placeholder }}
      </option>
      <option
        :value="option.value"
        v-for="option in options"
        :selected="modelValue === option.value"
      >
        {{ option.label }}
      </option>
    </select>
    <i class="icon-white"><v-icon name="hi-solid-chevron-down"></v-icon></i>
  </div>
</template>
