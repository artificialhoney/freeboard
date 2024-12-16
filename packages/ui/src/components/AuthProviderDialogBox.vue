<script setup lang="js">
import { computed, ref, watch } from "vue";
import DialogBox from "./DialogBox.vue";
import Form from "./Form.vue";
import SelectFormElement from "./SelectFormElement.vue";
import { useFreeboardStore } from "../stores/freeboard";
import { storeToRefs } from "pinia";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

const freeboardStore = useFreeboardStore();

const { authPlugins } = storeToRefs(freeboardStore);

const { header, onClose, onOk, settings, type } = defineProps({
  header: String,
  onClose: Function,
  onOk: Function,
  settings: Object,
  type: String,
});

const form = ref(null);
const typeRef = ref(type);

const fields = ref([]);

watch(
  typeRef,
  (newValue) => {
    if (!newValue) {
      fields.value = [];
      return;
    }
    const data = [
      {
        name: "name",
        label: t("form.labelName"),
        type: "text",
        required: true,
      },
      ...freeboardStore.getAuthPluginFields(newValue),
    ];

    fields.value = data;
  },
  { immediate: true },
);

const authPluginsOptions = computed(() => {
  return Object.keys(authPlugins.value).map((key) => ({
    value: key,
    label: authPlugins.value[key].label,
  }));
});

const dialog = ref(null);

const onDialogBoxOk = () => {
  if (form.value.hasErrors()) {
    return;
  }
  onOk({ settings: form.value.getValue(), type: typeRef.value });
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
    @ok="onDialogBoxOk"
    class="auth-provider-dialog-box"
  >
    <div class="auth-provider-dialog-box__form__row">
      <div class="auth-provider-dialog-box__form__row__label">
        <label>{{ $t("authProviderDialogBox.labelType") }}</label>
      </div>
      <div class="auth-provider-dialog-box__form__row__value">
        <SelectFormElement
          v-model="typeRef"
          :options="authPluginsOptions"
          :placeholder="$t('authProviderDialogBox.placeholderType')"
        />
      </div>
    </div>
    <Form ref="form" :settings="settings" :fields="fields" v-if="typeRef" />
  </DialogBox>
</template>

<style lang="css" scoped>
@import url("../assets/css/components/auth-provider-dialog-box.css");
</style>
