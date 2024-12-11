<script setup lang="js">
import { ref } from "vue";

const props = defineProps([
  "modelValue",
  "validators",
  "options",
  "placeholder",
]);
const emit = defineEmits(["update:modelValue"]);

const errors = ref([]);

const onChange = (value) => {
  const e = [];
  props.validators?.forEach((validator) => {
    const result = validator(value);
    if (result.error) {
      e.push(result.error);
    }
  });
  errors.value = e;
  emit("update:modelValue", value);
};

defineExpose({
  errors,
});
</script>
<template>
  <div class="styled-select">
    <select @change="onChange($event.target.value)">
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
