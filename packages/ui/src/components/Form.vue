<script setup lang="js">
import { onMounted, onUpdated, ref, shallowRef, watch } from "vue";
import InputFormElement from "./InputFormElement.vue";
import {
  validateInteger,
  validateNumber,
  validateRequired,
} from "../validators";
import SwitchFormElement from "./SwitchFormElement.vue";
import SelectFormElement from "./SelectFormElement.vue";
import TextareaFormElement from "./TextareaFormElement.vue";
import ArrayFormElement from "./ArrayFormElement.vue";
import CodeEditorFormElement from "./CodeEditorFormElement.vue";

const { fields, hideLabels, settings } = defineProps({
  fields: Array,
  settings: Object,
  hideLabels: Boolean,
});

const model = ref({});
const components = ref({});

const applySettings = (s) => {
  const m = {};
  fields.forEach((f) => {
    m[f.name] = (s && s[f.name]) || f.default;
  });
  model.value = m;
};

watch(
  () => settings,
  () => applySettings(settings),
);
onMounted(() => applySettings(settings));

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
    if (components.value[key].errors.value) {
      value = true;
    }
  });
  return value;
};

const inputFormElementRef = shallowRef(InputFormElement);
const switchFormElementRef = shallowRef(SwitchFormElement);
const selectFormElementRef = shallowRef(SelectFormElement);
const textareaFormElementRef = shallowRef(TextareaFormElement);
const arrayFormElementRef = shallowRef(ArrayFormElement);
const codeEditorFormElementRef = shallowRef(CodeEditorFormElement);

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
  } else if (field.type === "calculated") {
    if (field.required) {
      validators.push(validateRequired);
    }
    type = textareaFormElementRef.value;
  } else if (field.type === "array") {
    if (field.required) {
      validators.push(validateRequired);
    }
    type = arrayFormElementRef.value;
  } else if (field.type === "password") {
    if (field.required) {
      validators.push(validateRequired);
    }
    type = inputFormElementRef.value;
  } else if (field.type === "code") {
    if (field.required) {
      validators.push(validateRequired);
    }
    type = codeEditorFormElementRef.value;
  }
  return { ...field, component: type, validators };
};

defineExpose({
  getValue,
  hasErrors,
});

const emit = defineEmits(["change"]);
</script>

<template>
  <form class="form" action="">
    <div class="form-row" v-for="field in fields.map(fieldToFormElement)">
      <div class="form-label" v-if="!hideLabels">
        <label class="control-label">{{ field.label }}</label>
      </div>
      <div class="form-value">
        <div class="input-container">
          <component
            :ref="(el) => storeComponentRef(field.name, el)"
            :is="field.component"
            v-model="model[field.name]"
            :validators="field.validators"
            :options="field.options || field.settings"
            :placeholder="field.placeholder"
            :secret="field.type === 'password'"
            :language="field.language"
            @update:modelValue="emit('change', getValue())"
          ></component>
        </div>
        <div
          class="validation-error"
          v-for="error in components[field.name]?.errors"
        >
          {{ error }}
        </div>
        <div class="setting-description" v-if="field.description">
          {{ field.description }}
        </div>
      </div>
      <div class="input-suffix" v-if="field.suffix">{{ field.suffix }}</div>
    </div>
  </form>
</template>
