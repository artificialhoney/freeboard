<script setup lang="js">
import { onMounted, ref, watch } from "vue";

const props = defineProps(["modelValue", "disabled"]);
const emit = defineEmits(["update:modelValue"]);

const errors = ref([]);
const input = ref(null);

const id = `switch-${new Date().getTime()}`;

const onChange = (value) => {
  emit("update:modelValue", value);
};

watch(
  () => props.modelValue,
  (v) => {
    if (!v) {
      return;
    }

    input.value.checked = true;
  },
);

defineExpose({
  errors,
});
</script>
<template>
  <div class="switch-form-element">
    <input
      :id="id"
      ref="input"
      type="checkbox"
      name="switch"
      class="switch-form-element__checkbox"
      :disabled="props.disabled"
      @change="onChange($event.target.checked)"
    />
    <label class="switch-form-element__label" :for="id">
      <div class="switch-form-element__label__inner">
        <span class="switch-form-element__label__inner__on">YES</span>
        <span class="switch-form-element__label__inner__off">NO</span>
      </div>
      <div class="switch-form-element__label__switch"></div>
    </label>
  </div>
</template>

<style lang="css" scoped>
@import url("../assets/css/components/switch-form-element.css");
</style>
