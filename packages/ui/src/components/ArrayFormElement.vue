<script setup lang="js">
import { ref, watch } from "vue";
import Form from "./Form.vue";
import TextButton from "./TextButton.vue";
import ActionButton from "./ActionButton.vue";

const props = defineProps(["modelValue", "options"]);
const emit = defineEmits(["update:modelValue"]);

const errors = ref([]);
const value = ref([]);

watch(
  () => props.modelValue,
  (v) => {
    if (!v) {
      return
    }
    value.value = v && [...v]
  },
 {immediate: true});

const onSettingChange = (index, v) => {
  value.value[index] = v;
  onChange(value.value);
};

const onSettingRemove = (index) => {
  value.value.splice(index, 1);
  onChange(value.value);
};

const onSettingAdd = () => {
  const val = {};
  props.options.forEach((o) => {
    val[o.name] = "";
  });
  value.value.push(val);
  onChange(value.value);
};

const onChange = (value) => {
  emit("update:modelValue", value);
};

defineExpose({
  errors,
});
</script>
<template>
  <div class="array-form-element">
    <table class="array-form-element__table">
      <thead class="array-form-element__table__head">
        <tr v-if="value.length" class="array-form-element__table__head__row">
          <th class="array-form-element__table__head__row__cell">
            <span
              v-for="setting in options"
              >{{ setting.label }}</span
            >
          </th>
          <th>&nbsp;</th>
        </tr>
      </thead>
      <tbody class="array-form-element__table__body">
        <tr
          v-for="(val, index) in value"
          class="array-form-element__table__body__row"
        >
          <td class="array-form-element__table__body__row__cell">
            <Form
              :settings="val"
              :fields="options"
              :hideLabels="true"
              :skipTranslate="true"
              @change="(v) => onSettingChange(index, v)"
            />
          </td>
          <td class="array-form-element__table__body__row__cell">
            <ul
              class="array-form-element__table__body__row__cell__board-toolbar"
            >
              <li
                class="array-form-element__table__body__row__cell__board-toolbar__item"
              >
                <i
                  class="array-form-element__table__body__row__cell__board-toolbar__item__icon"
                  @click="onSettingRemove(index)"
                >
                  <v-icon name="hi-trash"></v-icon>
                </i>
              </li>
            </ul>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="array-form-element__operations">
      <ActionButton @click="onSettingAdd()">{{
        $t("arrayFormElement.buttonAdd")
      }}</ActionButton>
    </div>
  </div>
</template>

<style lang="css" scoped>
@import url("../assets/css/components/array-form-element.css");
</style>
