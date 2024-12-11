<script setup lang="js">
import { onMounted, ref, watch } from "vue";
import Form from "./Form.vue";

const props = defineProps(["modelValue", "validators", "options"]);
const emit = defineEmits(["update:modelValue"]);

const errors = ref([]);
const value = ref([]);

watch(
  () => props.modelValue,
  (v) => (value.value = v && [...v]),
);

const onChange = (v) => {
  const e = [];
  props.validators?.forEach((validator) => {
    const result = validator(v);
    if (result.error) {
      e.push(result.error);
    }
  });
  errors.value = e;
  emit("update:modelValue", [...v]);
};

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

defineExpose({
  errors,
});
</script>
<template>
  <div class="form-table-value-subtable">
    <table class="table table-condensed sub-table">
      <thead>
        <tr v-if="value.length">
          <th v-for="setting in options">{{ setting.label }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(val, index) in value">
          <td>
            <Form
              :settings="val"
              :fields="options"
              :hideLabels="true"
              @change="(v) => onSettingChange(index, v)"
            />
          </td>
          <td class="table-row-operation">
            <ul class="board-toolbar">
              <li>
                <i class="icon-white" @click="onSettingRemove(index)">
                  <v-icon name="hi-trash"></v-icon>
                </i>
              </li>
            </ul>
          </td>
        </tr>
      </tbody>
    </table>
    <button
      class="table-operation text-button"
      @click="onSettingAdd()"
      type="button"
    >
      ADD
    </button>
  </div>
</template>
