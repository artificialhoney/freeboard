<script setup lang="js">
const props = defineProps(["modelValue", "secret", "disabled"]);
const emit = defineEmits(["update:modelValue"]);


const onInput = (value) => {
  emit("update:modelValue", value);
};

</script>

<template>
  <input
    class="input-form-element"
    :type="props.secret ? 'password' : 'text'"
    :value="props.modelValue"
    :disabled="props.disabled"
    @input="onInput($event.target.value)"
    @focusout="onInput($event.target.value)"
  />
</template>

<style lang="css" scoped>
@import url("../assets/css/components/input-form-element.css");
</style>
