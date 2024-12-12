<script setup lang="js">
import { onMounted, ref, watch } from "vue";

const props = defineProps(["modelValue", "disabled"]);
const emit = defineEmits(["update:modelValue"]);

const errors = ref([]);
const input = ref(null);

const id = `onoffswitch-${new Date().getTime()}`;

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
  <div class="onoffswitch">
    <input
      :id="id"
      ref="input"
      type="checkbox"
      name="onoffswitch"
      class="onoffswitch-checkbox"
      :disabled="props.disabled"
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
