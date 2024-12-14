<script setup lang="js">
import { ref } from "vue";

const props = defineProps(["modelValue", "secret", "disbaled"]);
const emit = defineEmits(["update:modelValue"]);

const errors = ref([]);
const input = ref(null);

const onInput = (value) => {
  emit("update:modelValue", value);
};

defineExpose({
  errors,
});
</script>

<template>
  <input
    class="input-form-element"
    ref="input"
    :type="props.secret ? 'password' : 'text'"
    :value="props.modelValue"
    :disabled="props.disbaled"
    @input="onInput($event.target.value)"
    @focusout="onInput($event.target.value)"
  />
</template>

<style lang="css" scoped>
@import url("../assets/css/components/input-form-element.css");
</style>
