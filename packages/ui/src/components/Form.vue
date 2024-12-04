<script setup lang="js">
import { ref, shallowRef, watch } from "vue";
import InputFormElement from "./InputFormElement.vue";
import {
  validateInteger,
  validateNumber,
  validateRequired,
} from "../validators";
import SwitchFormElement from "./SwitchFormElement.vue";
import SelectFormElement from "./SelectFormElement.vue";

const { fields, settings } = defineProps({
  fields: Array,
  settings: Object,
});

const model = ref({});
const components = ref({});

watch(
  () => settings,
  (newValue) => {
    const m = {};
    if (!newValue) {
      const f = fields.filter((f) => f.default != null);
      f.forEach((f) => {
        m[f.name] = f.default;
      });
    } else {
      Object.keys(newValue).forEach((key) => {
        m[key] = ref(newValue[key]);
      });
    }
    model.value = m;
  },
  { immediate: true },
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
const switchFormElementRef = shallowRef(SwitchFormElement);
const selectFormElementRef = shallowRef(SelectFormElement);

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
  } else if (field.type === "boolean") {
    type = switchFormElementRef.value;
  } else if (field.type === "option") {
    type = selectFormElementRef.value;
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
        :options="field.options"
      ></component>
      <div
        class="validation-error"
        v-for="error in components[field.name]?.errors"
      >
        {{ error }}
      </div>
      <div class="input-suffix" v-if="field.suffix">{{ field.suffix }}</div>
      <div class="setting-description" v-if="field.description">
        {{ field.description }}
      </div>
    </div>
  </div>
</template>
