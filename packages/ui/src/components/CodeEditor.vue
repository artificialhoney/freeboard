<script setup lang="js">
const props = defineProps(["modelValue", "remove"]);
const emit = defineEmits(["update:modelValue", "remove"]);
</script>
<template>
  <textarea
    class="calculated-value-input"
    :value="props.modelValue"
    @input="emit('update:modelValue', $event.target.value)"
  ></textarea>
  <ul class="board-toolbar datasource-input-suffix">
    <li
      class="remove-setting-row"
      v-if="props.remove"
      @click="() => emit('remove')"
    >
      <i class="icon-minus icon-white"></i>
      <label></label>
    </li>
    <li>
      <i class="icon-plus icon-white"></i>
      <label>DATASOURCE</label>
    </li>
    <li>
      <i class="icon-fullscreen icon-white"></i>
      <label>.JS EDITOR</label>
    </li>
  </ul>
</template>
