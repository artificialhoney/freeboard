<script setup lang="js">
import { onMounted, ref } from "vue";

const props = defineProps(["modelValue", "options", "placeholder", "disabled", "placeholderDisabled"]);
const emit = defineEmits(["update:modelValue"]);

const errors = ref([]);

const onInput = (value) => {
  emit("update:modelValue", value);
};

onMounted(() => {
  if (!props.modelValue && props.options?.length) {
    onInput(props.options[0].value)
  }
})

defineExpose({
  errors,
});
</script>
<template>
  <div class="select-form-element">
    <select
      @change="onInput($event.target.value)"
      :disabled="props.disabled"
      class="select-form-element__select"
    >
      <option value="" :selected="modelValue === ''" v-if="placeholder" :disabled="props.placeholderDisabled">
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
    <i class="select-form-element__icon"
      ><v-icon name="hi-solid-chevron-down"></v-icon
    ></i>
  </div>
</template>

<style lang="css" scoped>
@import url("../assets/css/components/select-form-element.css");
</style>
