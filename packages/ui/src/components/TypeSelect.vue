<template>
  <div class="type-select">
    <div class="type-select__form__row">
      <div class="type-select__form__row__label">
        <label>{{ $t("typeSelect.labelType") }}</label>
      </div>
      <div class="type-select__form__row__value">
        <SelectFormElement
          v-model="select"
          :options="props.options"
          :placeholder="$t('typeSelect.placeholderType')"
          :placeholderDisabled="true"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="js">

import { ref, watch } from 'vue';
import SelectFormElement from './SelectFormElement.vue';
const props = defineProps(["modelValue", "options"]);
const emit = defineEmits(["update:modelValue"]);

const select = ref(props.modelValue);

watch(select, (v) => emit("update:modelValue", v))

const onChange = (value) => {
  emit("update:modelValue", value);
};
</script>

<style lang="css" scoped>
@import url("../assets/css/components/type-select.css");
</style>
