<script setup lang="js">
import { ref } from "vue";

const props = defineProps(["modelValue", "validators"]);
const emit = defineEmits(["update:modelValue"]);

const errors = ref([]);

const id = `onoffswitch-${new Date().getTime()}`;

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
  <div class="onoffswitch">
    <input
      :id="id"
      type="checkbox"
      name="onoffswitch"
      class="onoffswitch-checkbox"
      :checked="modelValue === false ? false : true"
      :value="modelValue === false ? false : true"
      @change="onChange($event.target.checked)"
    />
    <label class="onoffswitch-label" :for="id">
      <div class="onoffswitch-inner">
        <span class="on">YES</span>
        <span class="off">NO</span>
      </div>
      <div class="onoffswitch-switch"></div>
    </label>
  </div>
</template>
