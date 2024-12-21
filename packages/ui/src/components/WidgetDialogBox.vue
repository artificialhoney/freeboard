<script setup lang="js">
import { computed, ref, watch } from "vue";
import DialogBox from "./DialogBox.vue";
import Form from "./Form.vue";
import SelectFormElement from "./SelectFormElement.vue";
import { useFreeboardStore } from "../stores/freeboard";
import { storeToRefs } from "pinia";
import TabNavigator from "./TabNavigator.vue";
import { merge } from "../merge";

const freeboardStore = useFreeboardStore();

const { widgetPlugins, dashboard } = storeToRefs(freeboardStore);

const { header, onClose, onOk, widget } = defineProps({
  header: String,
  onClose: Function,
  onOk: Function,
  widget: Object,
});

const typeRef = ref(null);

const fields = ref([]);
const components = ref({});

const storeComponentRef = (name, el) => {
  components.value[name] = el;
};


watch(
  typeRef,
  (newValue) => {
    if (!newValue) {
      fields.value = [];
      return;
    }
    const widgetFields = widgetPlugins.value[newValue].fields(widget, dashboard.value, {
      label: "form.labelGeneral",
      icon: "hi-solid-home",
      name: "general",
      settings: {
        title: widget?.title,
        enabled: widget?.enabled,
      },
      fields: [
        {
          name: "title",
          label: "form.labelTitle",
          type: "text",
          required: true,
        },
        {
          name: "enabled",
          label: "form.labelEnabled",
          type: "boolean",
        },
      ],
    })

    fields.value = widgetFields;
  },
  { immediate: true },
);

const widgetPluginsOptions = computed(() => {
  return Object.keys(widgetPlugins.value).map((key) => ({
    value: key,
    label: widgetPlugins.value[key].label,
  }));
});

const dialog = ref(null);

const onDialogBoxOk = () => {
  if (fields.value.some((f) => components.value[f.name].hasErrors())) {
    return;
  }
  const s = {};
  const result = {};
  fields.value.forEach((f) => {
    const v = components.value[f.name].getValue();
    Object.keys(v).forEach((k) => {
      if (["type", "title", "enabled"].includes(k)) {
        result[k] = v[k];
      } else {
        s[k] = v[k];
      }
    });
  });
  onOk({ ...result, settings: s });
  dialog.value.closeModal();
};
</script>

<template>
  <DialogBox
    :header="header"
    ref="dialog"
    :ok="$t('dialogBox.buttonOk')"
    :cancel="$t('dialogBox.buttonCancel')"
    @close="onClose"
    @ok="() => onDialogBoxOk()"
    class="widget-dialog-box"
  >
    <div class="widget-dialog-box__form__row">
      <div class="widget-dialog-box__form__row__label">
        <label>{{ $t("widgetDialogBox.labelType") }}</label>
      </div>
      <div class="widget-dialog-box__form__row__value">
        <SelectFormElement
          v-model="typeRef"
          :options="widgetPluginsOptions"
          :placeholder="$t('widgetDialogBox.placeholderType')"
        />
      </div>
    </div>
    <TabNavigator :fields="fields" v-if="typeRef">
      <template v-slot:[field.name] v-for="field in fields">
        <Form
          :ref="(el) => storeComponentRef(field.name, el)"
          :settings="field.settings"
          :fields="field.fields"
        />
      </template>
    </TabNavigator>
  </DialogBox>
</template>

<style lang="css" scoped>
@import url("../assets/css/components/widget-dialog-box.css");
</style>
