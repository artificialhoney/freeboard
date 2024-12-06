<script setup lang="js">
import { ref } from "vue";

const props = defineProps(["modelValue", "validators", "options"]);
const emit = defineEmits(["update:modelValue"]);

const errors = ref([]);
const value = ref(props.modelValue || []);

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

const onSettingChange = (val, setting, v) => {
  val[setting.name] = v;
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
          <td v-for="setting in options">
            <input
              class="table-row-value"
              type="text"
              :value="val[setting.name]"
              @change="onSettingChange(val, setting, $event.target.value)"
            />
          </td>
          <td class="table-row-operation">
            <ul class="board-toolbar">
              <li>
                <i
                  class="icon-trash icon-white"
                  @click="onSettingRemove(index)"
                ></i>
              </li>
            </ul>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <button
    class="table-operation text-button"
    @click="onSettingAdd()"
    type="button"
  >
    ADD
  </button>
</template>
