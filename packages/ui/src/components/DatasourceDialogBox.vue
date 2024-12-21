<script setup lang="js">
import { computed, ref, watch } from "vue";
import DialogBox from "./DialogBox.vue";
import Form from "./Form.vue";
import SelectFormElement from "./SelectFormElement.vue";
import { useFreeboardStore } from "../stores/freeboard";
import { storeToRefs } from "pinia";
import { merge } from "../merge";
import TabNavigator from "./TabNavigator.vue";

const freeboardStore = useFreeboardStore();

const { datasourcePlugins, dashboard } = storeToRefs(freeboardStore);

const { header, onClose, onOk, datasource } = defineProps({
  header: String,
  onClose: Function,
  onOk: Function,
  datasource: Object,
});

const tabNavigator = ref(null);

const components = ref({});

const storeComponentRef = (name, el) => {
  components.value[name] = el;
};

const typeRef = ref(datasource ? datasource.type : null);

const fields = ref([]);

watch(
  typeRef,
  (newValue) => {
    if (!newValue) {
      fields.value = [];
      return;
    }

    const datasourceFields = datasourcePlugins.value[newValue].fields(datasource, dashboard.value, {
      label: "form.labelGeneral",
      icon: "hi-solid-home",
      name: "general",
      settings: {
        title: datasource?.title,
        enabled: datasource?.enabled,
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

    fields.value = datasourceFields;
  },
  { immediate: true },
);

const datasourcePluginsOptions = computed(() => {
  return Object.keys(datasourcePlugins.value).map((key) => ({
    value: key,
    label: datasourcePlugins.value[key].label,
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
  onOk({ ...result, settings: s, type: typeRef.value  });
  dialog.value.closeModal();
};
</script>

<template>
  <DialogBox
    class="datasource-dialog-box"
    :header="header"
    :ok="$t('dialogBox.buttonOk')"
    :cancel="$t('dialogBox.buttonCancel')"
    ref="dialog"
    @close="onClose"
    @ok="() => onDialogBoxOk()"
  >
    <div class="datasource-dialog-box__form__row">
      <div class="datasource-dialog-box__form__row__label">
        <label>{{ $t("datasourceDialogBox.labelType") }}</label>
      </div>
      <div class="datasource-dialog-box__form__row__value">
        <SelectFormElement
          v-model="typeRef"
          :options="datasourcePluginsOptions"
          :placeholder="$t('datasourceDialogBox.placeholderType')"
        />
      </div>
    </div>
    <TabNavigator :fields="fields" v-if="typeRef" ref="tabNavigator">

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
@import url("../assets/css/components/datasource-dialog-box.css");
</style>
