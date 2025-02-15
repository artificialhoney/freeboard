<script setup lang="js">
import {
  markRaw,
  onMounted,
  reactive,
  ref,
  toRef,
  watch,
} from "vue";
import InputFormElement from "./InputFormElement.vue";
import {
  validateInteger,
  validateNumber,
  validateRequired,
} from "../validators";
import SwitchFormElement from "./SwitchFormElement.vue";
import SelectFormElement from "./SelectFormElement.vue";
import ArrayFormElement from "./ArrayFormElement.vue";
import CodeEditorFormElement from "./CodeEditorFormElement.vue";
import { useI18n } from "vue-i18n";
import ListFormElement from "./ListFormElement.vue";

const { t } = useI18n();

const { hideLabels, skipTranslate, ...props } = defineProps({
  fields: Array,
  settings: Object,
  hideLabels: Boolean,
  skipTranslate: Boolean,
});

const p = reactive({ ...props });

const onUpdate = () => {
  emit("change", getValue());
};

const components = ref({});

const getValue = () => {
  const value = {};
  fields.value.forEach((field) => {
    value[field.name] = field.model;
  });
  return value;
};

const storeComponentRef = (name, el) => {
  components.value[name] = el;
};

const errors = ref({});

const hasErrors = () => {
  const e = {};
  Object.keys(components.value).forEach((key) => {
    const result = validateField(key);
    if (result) {
      e[key] = result;
    }
  });
  if (Object.keys(e).length) {
    errors.value = e;
    return e;
  } else {
    errors.value = {};
    return null;
  }
};

const validateField = (key) => {
  const e = [];
  const field =fields.value.find((f) => f.name === key);

  field?.validators.forEach((validator) => {
      const result = validator(field.model);

      if (result.error) {
        e.push(result.error);
      }
    });
  if (e.length) {
    return e;
  } else {
    return null;
  }
};

const inputFormElementRef = markRaw(InputFormElement);
const switchFormElementRef = markRaw(SwitchFormElement);
const selectFormElementRef = markRaw(SelectFormElement);
const arrayFormElementRef = markRaw(ArrayFormElement);
const codeEditorFormElementRef = markRaw(CodeEditorFormElement);
const listFormElementRef = markRaw(ListFormElement);

const resolveFieldOptions = async (field) => {
  const promises = [];
  if (typeof field.options === 'object') {
    promises.push(field.options);
  }

  return new Promise(async (resolve) => {
    await Promise.all(promises);
    resolve(field);
  })
}

const translateField = (field) => {
  if (skipTranslate) {
    return field;
  }
  if (field.label) {
    field.label = t(field.label);
  }

  if (field.description) {
    field.description = t(field.description);
  }

  if (field.suffix) {
    field.suffix = t(field.suffix);
  }

  if (field.placeholder) {
    field.placeholder = t(field.placeholder);
  }

  if (Array.isArray(field.settings)) {
    field.settings.forEach(translateField);
  }

  if (Array.isArray(field.options)) {
    field.options.forEach(translateField);
  }

  return field;
};

const fieldToFormElement = (field) => {
  const validators = [];
  let type = null;
  if (field.type === "number") {
    if (field.required) {
      validators.push(validateRequired, validateNumber);
    } else {
      validators.push(validateNumber);
    }
    type = inputFormElementRef;
  } else if (field.type === "text") {
    if (field.required) {
      validators.push(validateRequired);
    }
    type = inputFormElementRef;
  } else if (field.type === "integer") {
    if (field.required) {
      validators.push(validateRequired, validateInteger);
    } else {
      validators.push(validateInteger);
    }
    type = inputFormElementRef;
  } else if (field.type === "boolean") {
    type = switchFormElementRef;
  } else if (field.type === "option") {
    type = selectFormElementRef;
  } else if (field.type === "calculated") {
    if (field.required) {
      validators.push(validateRequired);
    }
    type = codeEditorFormElementRef;
  } else if (field.type === "array") {
    if (field.required) {
      validators.push(validateRequired);
    }
    type = arrayFormElementRef;
  } else if (field.type === "password") {
    if (field.required) {
      validators.push(validateRequired);
    }
    type = inputFormElementRef;
  } else if (field.type === "code") {
    if (field.required) {
      validators.push(validateRequired);
    }
    type = codeEditorFormElementRef;
  } else if (field.type === "list") {
    if (field.required) {
      validators.push(validateRequired);
    }
    type = listFormElementRef;
  }

  return { ...field, component: type, validators };
};

defineExpose({
  getValue,
  hasErrors,
});

const emit = defineEmits(["change"]);
const fields = ref(null);

const f = toRef(props, "fields");

watch(f, async () => {
  fields.value = await Promise.all(f.value.map(fieldToFormElement).map(translateField).map(resolveFieldOptions))
  fields.value.forEach((field) => {
    const value = field.model?.value || p.settings[field.name] || field.default;
    const r = ref(value)
    field.model = r;
    watch(r, onUpdate)
  })
}, {
  immediate: true
});
</script>

<template>
  <div class="form">
    <div class="form__row" v-for="field in fields">
      <div class="form__row__label" v-if="!hideLabels">
        <label>{{ field.label }}</label>
      </div>
      <div class="form__row__value">
        <div class="form__row__value__container">
          <component
            :ref="(el) => storeComponentRef(field.name, el)"
            :is="field.component"
            :disabled="field.disabled"
            v-model="field.model"
            :options="field.options || field.settings"
            :placeholder="field.placeholder"
            :secret="field.type === 'password'"
            :language="field.language"
          ></component>
        </div>
        <div
          class="form__row__value__error"
          v-for="error in errors[field.name]"
          v-if="errors[field.name]"
        >
          {{ error }}
        </div>
        <div class="form__row__value__description" v-if="field.description">
          {{ field.description }}
        </div>
      </div>
      <div class="form__row__suffix" v-if="field.suffix">
        {{ field.suffix }}
      </div>
    </div>
  </div>
</template>

<style lang="css" scoped>
@import url("../assets/css/components/form.css");
</style>
