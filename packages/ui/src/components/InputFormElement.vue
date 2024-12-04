<script setup lang="js">
import { ref } from "vue";

const props = defineProps(["modelValue", "validators"]);
const emit = defineEmits(["update:modelValue"]);

const errors = ref([]);
const input = ref(null);

const validate = (value) => {
  const e = [];
  props.validators.forEach((validator) => {
    const result = validator(value);
    if (result.error) {
      e.push(result.error);
    }
  });
  errors.value = e;
};

const onInput = (value) => {
  validate(value);
  emit("update:modelValue", value);
};

defineExpose({
  errors,
});
</script>

<template>
  <input
    ref="input"
    type="text"
    :value="props.modelValue"
    @input="onInput($event.target.value)"
    @focusout="validate($event.target.value)"
  />
</template>
