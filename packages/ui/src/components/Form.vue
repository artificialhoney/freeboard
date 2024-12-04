<script setup lang="js">
import { ref, shallowRef, watch } from "vue";
import InputFormElement from "./InputFormElement.vue";
import {
  validateInteger,
  validateNumber,
  validateRequired,
} from "../validators";

const { fields, settings } = defineProps({
  fields: Array,
  settings: Object,
});

const model = ref({});
const components = ref({});

watch(
  () => settings,
  (newValue) => {
    model = {};
    Object.keys(newValue).forEach((key) => {
      model.value[key] = newValue[key];
    });
  },
);

const getValue = () => {
  const value = {};
  Object.keys(model.value).forEach((key) => {
    value[key] = model.value[key];
  });
  return value;
};

const storeComponentRef = (name, el) => {
  components.value[name] = el;
};

const hasErrors = () => {
  let value = false;
  Object.keys(components.value).forEach((key) => {
    if (components.value[key].errors) {
      value = true;
    }
  });
  return value;
};

const inputFormElementRef = shallowRef(InputFormElement);

const fieldToFormElement = (field) => {
  const validators = [];
  let type = null;
  if (field.type === "number") {
    if (field.required) {
      validators.push(validateRequired, validateNumber);
    } else {
      validators.push(validateNumber);
    }
    type = inputFormElementRef.value;
  } else if (field.type === "text") {
    if (field.required) {
      validators.push(validateRequired);
    }
    type = inputFormElementRef.value;
  } else if (field.type === "integer") {
    if (field.required) {
      validators.push(validateRequired, validateInteger);
    } else {
      validators.push(validateInteger);
    }
    type = inputFormElementRef.value;
  }
  return { ...field, type, validators };
};

defineExpose({
  getValue,
  hasErrors,
});
</script>

<template>
  <div class="form-row" v-for="field in fields.map(fieldToFormElement)">
    <div class="form-label">
      <label class="control-label">{{ field.label }}</label>
    </div>
    <div class="form-value">
      <component
        :ref="(el) => storeComponentRef(field.name, el)"
        :is="field.type"
        v-model="model[field.name]"
        :validators="field.validators"
      ></component>
      <div
        class="validation-error"
        v-for="error in components[field.name]?.errors"
      >
        {{ error }}
      </div>
    </div>
  </div>
</template>
